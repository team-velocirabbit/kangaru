const electron = require('electron');
const url = require('url');
const path = require('path');
const { Etl } = require('../etl_test/index');
const sgEmail = require('@sendgrid/mail');
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);
const MongoClient = require('mongodb').MongoClient;

const {
 app,
 BrowserWindow,
 Menu,
 ipcMain
} = electron;

let mainWindow;

app.on('ready', function () {

 const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
 //create new window
 mainWindow = new BrowserWindow({
   'width': 1500,
   'height': 900,
   'minHeight': 800,
   'minWidth': 1100,
   'maxHeight': 900,
   'maxWidth': 1500,
 });
 //Load HTML into window
 mainWindow.loadURL(url.format({
   pathname: path.join(__dirname, 'index.html'),
   protocol: 'file:',
   slashes: true
 }));
 //Quit App when closed
//  mainWindow.on('closed', function(){
//    app.quit();
//  })
 //Build menu from template
 const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
 //Insert the menu
 Menu.setApplicationMenu(mainMenu);

});

const mainMenuTemplate = [{
 label: 'File',
 submenu: [{
     label: 'First_thing',
   },
   {
     label: 'Second'
   },
   {
     label: 'Quit',
     accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
     click() {
       app.quit();
     }
   }
 ]
},
{
 label: "Edit",
 submenu: [
     { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
     { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
     { type: "separator" },
     { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
     { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
     { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
     { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
 ]}];

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({})
}

mainMenuTemplate.push({
  label: 'Developer Tools',
  submenu: [
    {
      label: 'Toggle DevTools',
      accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
      click(item, focusedWindow){
        focusedWindow.toggleDevTools();
      }
    },
    {
      role: 'reload'
    }
  ]
});

// starts the etl process, listens to ipcRenderer located in jobs.js in startEtl()
ipcMain.on('etl', (event, arg) => {
  const {
    name,
    extractUri,
    extractCollection,
    loadUri,
    loadCollection,
    location,
    filePath,
    fileName,
    script,
    emailCheck,
    textCheck,
    email,
    phoneNumber,
  } = arg;
  
  const newScript = script.substring(script.indexOf('{') + 1, script.lastIndexOf('}'));
  const scriptFunc = new Function('data', newScript);

  let extractString;
  let extractName;
  let callback = [scriptFunc];
  let loadString;
  let loadName;

  if (extractUri && filePath) return window.alert('Cannot extract from both flat file and database. Try again.');
  if (extractUri) {
    if (!extractCollection) return window.alert('Collection name missing in "Extract".');
    extractString = extractUri;
    extractName = extractCollection;
  }
  if (filePath) {
    extractString = filePath;
    extractName = null;
  }
  if (!scriptFunc) {
    return window.alert('Invalid function given, please re-write function and make sure the format is valid (use given function as reference).');
  }
  if (loadUri && (location || fileName)) return window.alert('Cannot load to both flat file and database. Try again.');
  if (loadUri) {
    if (!loadCollection) return window.alert('Collection name missing in "Load".');
    loadString = loadUri;
    loadName = loadCollection;
  }
  if (location) {
    if (!fileName) return window.alert('File name missing. Please provide the name of the new file in "Load".');
    loadString = location;
    loadName = fileName;
  }
  
  let job = new Etl()
  try {
    job.simple(extractString, extractName, callback, loadString, loadName)
    job.combine();

    if (emailCheck) job.addEmailNotification({
      to: email,
      from: 'rxjs-etl@gmail.com',
      subject: 'Your job has been completed',
      text: 'Your job ' + name + ' has finished.',
      html: '<strong>Your job ' + name + ' has finished.</strong>',
    });

    if (textCheck) job.addTextNotification({
      to: phoneNumber,
      body: 'Your job ' + name + ' has finished.',
    });

    job.observable$.subscribe(
      null,
      (err) => sendError(name),
      () => {
        if (emailCheck) {
          sgEmail.setApiKey(process.env.SENDGRID_API_KEY);
          sgEmail.send(job.email);
        }
        if (textCheck) {
          client.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: job.text.to,
            body: job.text.body,
          });
        }
        sendDone(name);
      },
    );
  } catch (err) {
    sendError(name);
  }
});

function sendError(name) {
  mainWindow.webContents.send('error', name);
}

function sendDone(name) {
  mainWindow.webContents.send('done', name);
}

// listens to  ipcRenderer in jobs.js in startEtl()
ipcMain.on('start', (event, arg) => {
  event.sender.send('q', arg);
});
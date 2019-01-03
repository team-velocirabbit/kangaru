const electron = require('electron');
const url = require('url');
const path = require('path');
const etl = require('etl-test');


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
   'height': 1000,
   'minHeight': 900,
   'minWidth': 1100
   // titleBarStyle: 'customButtonsOnHover', frame: false
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

  ipcMain.on('etl', (event, arg) => {
    const {
      name,
      extractUri,
      loadUri,
      filePath,
      fileName,
      script
    } = arg;
    
    const newScript = script.substring(script.indexOf('{') + 1, script.lastIndexOf('}'));
    const scriptFunc = new Function('data', newScript);
    let job;

    if (extractUri.length > 0) {
      if (loadUri.length > 0) {
        job = new etl()
        job.simple(extractUri, scriptFunc, loadUri, 'test')
        job.combine()
      }
      else {
        job = new etl()
        job.simple(extractUri, scriptFunc, fileName, 'test')
        job.combine()
      }
    }
    if (filePath.length > 0) {
      if (loadUri.length > 0) {
        job = new etl()
        job.simple(filePath, scriptFunc, loadUri, 'test')
        job.combine()
      }
      else {
        job = new etl()
        job.simple(filePath, scriptFunc, fileName, 'test')
        job.combine()
      }

      job.observable$.subscribe(
        null, 
        null,
        () => event.sender.send('done', name)
      );
    }
  });

  ipcMain.on('notify', (event, arg) => event.sender.send('notify', 'success'));

  ipcMain.on('start', (event, arg) => {
    event.sender.send('queue', arg);
  });
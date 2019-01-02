import React, { Component } from 'react';
import Extract from './extract';
import Transform from '../components/transform';
import Load from './load';
import Options from '../components/options';
import '../main.css';

const remote = require('electron').remote;
const { dialog } = remote;

require('dotenv').config();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const sgMail = require('@sendgrid/mail');
const etl = require('etl-test');

const combineNames = (data) => {
  const nd = {};
  nd.id = data.id * 1;
  nd.full_name = data['first_name'] + ' ' + data['last_name'];
  nd.email_address = data.email_address;
  nd.password = data.password;
  nd.phone = data.phone.replace(/[^0-9]/g, '');
  nd.street_address = data.street_address;
  nd.city = data.city;
  nd.postal_code = data.postal_code;
  nd.country = data.country;
  nd['__line'] = (data.id * 1) + 1;
  return nd;
};

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailCheck: false,
      email: '',
      textCheck: false,
      phoneNumber: '',
      username: '',
      password: '',
      host: '',
      port: null,
      database: '',
      extractUri: '',
      loadUri: '',
      filePath: '',
      location: '',
      formatDropdownValue: '',
      fileName: '',
      format: '',
      dependencies: '',
      code: '// type your code...',
      script: '',

    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleNotifications = this.handleNotifications.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleHostChange = this.handleHostChange.bind(this);
    this.handlePortChange = this.handlePortChange.bind(this);
    this.handleDatabaseChange = this.handleDatabaseChange.bind(this);
    this.handleExtractUriChange = this.handleExtractUriChange.bind(this);
    this.handleLoadUriChange = this.handleLoadUriChange.bind(this);
    this.handleFilenameChange = this.handleFilenameChange.bind(this);
    this.handleFileTypeChange = this.handleFileTypeChange.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.handleTransformClick = this.handleTransformClick.bind(this);
    this.handleDependencyChange = this.handleDependencyChange.bind(this);
    // this.handleFormatDropdownChange = this.handleFormatDropdownChange.bind(this);
    this.browseFiles = this.browseFiles.bind(this);
    this.browseDirectories = this.browseDirectories.bind(this);
    this.startEtl = this.startEtl.bind(this);
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
    console.log('email is ', this.state.email)
  }

  handlePhoneChange(e) {
    this.setState({
      phoneNumber: e.target.value,
    });
  }

  handleSelection(e) {

console.log('the value of checkbox is ', e.target.value)
console.log('emailcheck in state ', this.state.emailCheck)
    if (e.target.value === 'email') {
      if (this.state.emailCheck === false) {
        this.setState({
          emailCheck: true,
        });
      };
      if (this.state.emailCheck === true) {
        this.setState({
          emailCheck: false,
        });
      }
    } else if (e.target.value === 'text') {
        console.log ('textCheck is ', this.state.textCheck)
        if (this.state.textCheck === false) {
          this.setState({
            textCheck: true,
          });
        };
        if (this.state.textCheck === true) {
          this.setState({
            textCheck: false,
          });
        }
    }
  }

  handleNotifications(e) {
    console.log('youre now about to send an email');

    if (this.state.emailCheck) {
      console.log('sending email')
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);     
      const msg = {
        to: 'josieglore@gmail.com',
        from: 'kachler@mac.com',
        subject: 'Your Kangaru job has finished',
        text: 'Your Kangaru job has finished',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      sgMail.send(msg);
    }
    if (this.state.textCheck) {
      console.log('sending text')
      console.log('phone number is ', process.env.CELL_PHONE_NUMBER)
      console.log('text coming from ', process.env.TWILIO_PHONE_NUMBER)
      client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.CELL_PHONE_NUMBER,
        // to: this.state.phoneNumber,
        body: 'Your Kangaru job has finished.',
      });
     };
    }

    handleUsernameChange(e) {
      this.setState({
        username: e.target.value,
      });
    }

    handlePasswordChange(e) {
      this.setState({
        password: e.target.value,
      });
    }
  
    handleHostChange(e) {
      this.setState({
        host: e.target.value,
      });
    }
  
    handlePortChange(e) {
      console.log('port is ', e.target.value);
      this.setState({
        port: e.target.value,
      });
    }
  
    handleDatabaseChange(e) {
      this.setState({
        database: e.target.value,
      });
    }
  
    handleExtractUriChange(e) {
      this.setState({
        extractUri: e.target.value,
      })
    }

    handleLoadUriChange(e) {
      this.setState({
        loadUri: e.target.value,
      })
    }

    handleFilenameChange(e) {
      this.setState({
        fileName: e.target.value,
      });
      console.log('filename is ', this.state.fileName);
    }

    handleFileTypeChange(e) {
      // const newValue = e.value
      this.setState({
        format: e.value,
        formatDropdownValue: e.value,
      });
      console.log('e value is ', e.value)
      console.log('newValue is ', newValue)
      console.log('format is ', this.state.format)
    }

    onCodeChange(newValue) {
      console.log('onCodeChange', newValue);
      this.setState({code: newValue
      });
    }

    handleTransformClick(){
      const newCode = this.state.code
      console.log('handleClick');
      this.setState({
      script: newCode});
    }

    handleDependencyChange(e){
      console.log(e.target.value);
      this.setState({
          dependencies: e.target.value
        });
    }

    browseFiles() {
      dialog.showOpenDialog({ 
        properties: ['openFile'] 
      },
      (file) => {
        this.setState({
          filePath: file[0],
        });
      });
    }

    browseDirectories() {
      dialog.showOpenDialog({ 
        properties: ['openDirectory'] 
      },
      (file) => {
        this.setState({
          location: file[0],
        });
      });
    }

    startEtl() {
      const { extractUri, loadUri, filePath, fileName, script } = this.state;
      const scriptFunc = new Function('data', script.substring(script.indexOf('{') + 1, script.lastIndexOf('}')));

      console.log('extractUri is ', extractUri)
      console.log('loadUri is ', loadUri)
      console.log('filePath is ', filePath)
      console.log('fileName is ', fileName)
      console.log('inside startEtl');
      console.log('scriptFunc is ', scriptFunc);
      if (extractUri.length > 0) {
        if (loadUri.length > 0) {
          new etl()
          .simple(extractUri, scriptFunc, loadUri, 'my_database')
          .combine()
          .start()
        }
        else {
          new etl()
          .simple(extractUri, scriptFunc, fileName, 'my_database')
          .combine()
          .start()
        }
      }
      if (filePath.length > 0) {
        if (loadUri.length > 0) {
          new etl()
          .simple(filePath, scriptFunc, loadUri, 'my_database')
          .combine()
          .start()
        }
        else {
          new etl()
          .simple(filePath, scriptFunc, fileName, 'my_database')
          .combine()
          .start()
        }
      }
      // send notifications
      this.handleNotifications();
    }

  render() {
    const { 
      emailCheck, 
      textCheck, 
      email, 
      phoneNumber,
      username,
      password,
      port,
      host,
      database,
      extractUri,
      loadUri,
      filePath,
      location,
      fileName,
      format,
      dependencies,
      code,
      script } = this.state;
    return (
      <div>
        <div className='jobs-container'>
          <Extract 
            username = {username}
            password = {password}
            port = {port}
            host = {host}
            database = {database}
            extractUri = {extractUri}
            filePath = {filePath}
            handleUsernameChange = {this.handleUsernameChange}
            handlePasswordChange = {this.handlePasswordChange}
            handlePortChange = {this.handlePortChange}
            handleHostChange = {this.handleHostChange}
            handleDatabaseChange = {this.handleDatabaseChange}
            handleExtractUriChange = {this.handleExtractUriChange}
            browseFiles = {this.browseFiles}
          />
          <Transform 
            dependencies = {dependencies}
            code = {code}
            script = {script}
            onCodeChange = {this.onCodeChange}
            handleTransformClick = {this.handleTransformClick}
            handleDependencyChange = {this.handleDependencyChange}
          />
          <Load 
             username = {username}
             password = {password}
             port = {port}
             host = {host}
             database = {database}
             loadUri = {loadUri}
             location = {location}
             fileName = {fileName}
             format = {format}
             handleUsernameChange = {this.handleUsernameChange}
             handlePasswordChange = {this.handlePasswordChange}
             handlePortChange = {this.handlePortChange}
             handleHostChange = {this.handleHostChange}
             handleDatabaseChange = {this.handleDatabaseChange}
             handleLoadUriChange = {this.handleLoadUriChange}
             handleFilenameChange = {this.handleFilenameChange}
             handleFileTypeChange = {this.handleFileTypeChange}
             browseDirectories = {this.browseDirectories}
            //  handleFormatDropdownChange = {this.handleFormatDropdownChange}
          />
        </div>
        <div>
          <Options 
            emailCheck = {emailCheck}
            textCheck = {textCheck}
            email = {email}
            phoneNumber = {phoneNumber}
            extractUri = {extractUri}
            loadUri = {loadUri}
            filePath = {filePath}
            fileName = {fileName}
            startEtl = {this.startEtl}
            handleSelection = {this.handleSelection}
            handleEmailChange = {this.handleEmailChange}
            handlePhoneChange = {this.handlePhoneChange}
            handleNotifications = {this.handleNotifications}
          />
        </div>
      </div>
    );
  };
};

export default Jobs;
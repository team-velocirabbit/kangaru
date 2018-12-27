import React, { Component } from 'react';
import Extract from './extract';
import Transform from '../components/transform';
import Load from './load';
import Options from '../components/Options';
import '../main.css';

const remote = require('electron').remote;
const { dialog } = remote;

require('dotenv').config();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const sgMail = require('@sendgrid/mail');


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
      uri: '',
      filePath: '',
      location: '',
      fileName: '',
      format: '',
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
    this.handleUriChange = this.handleUriChange.bind(this);
    this.handleFilenameChange = this.handleFilenameChange.bind(this);
    this.handleFileTypeChange = this.handleFileTypeChange.bind(this);
    this.browseFiles = this.browseFiles.bind(this);
    this.browseDirectories = this.browseDirectories.bind(this);
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
    if (this.state.emailCheck) {
      console.log('sending email')
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);     
      const msg = {
        to: 'kachler@mac.com',
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
  
    handleUriChange(e) {
      this.setState({
        uri: e.target.value,
      })
    }

    handleFilenameChange(e) {
      this.setState({
        fileName: e.target.value,
      });
      console.log('filename is ', this.state.fileName);
    }

    handleFileTypeChange(e) {
      const newValue = `${e.value}`
      this.setState({
        format: newValue,
      });
      console.log('e value is ', e.value)
      console.log('newValue is ', newValue)
      console.log('format is ', this.state.format)
    }

    browseFiles() {
      dialog.showOpenDialog({ 
        properties: ['openFile'] 
      },
      (file) => {
      //   console.log('file is ', file[0])
        this.setState({
          filePath: file[0],
        });
      //   console.log('filePath is ', this.state.filePath)
      });
    }

    browseDirectories() {
      dialog.showOpenDialog({ 
        properties: ['openDirectory'] 
      },
      (file) => {
      //   console.log('file is ', file[0])
        this.setState({
          location: file[0],
        });
      //   console.log('filePath is ', this.state.filePath)
      });
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
      uri,
      filePath,
      location,
      fileName,
      format } = this.state;
    return (
      <div>
        <div className='jobs-container'>
          <Extract 
            username = {username}
            password = {password}
            port = {port}
            host = {host}
            database = {database}
            uri = {uri}
            filePath = {filePath}
            handleUsernameChange = {this.handleUsernameChange}
            handlePasswordChange = {this.handlePasswordChange}
            handlePortChange = {this.handlePortChange}
            handleHostChange = {this.handleHostChange}
            handleDatabaseChange = {this.handleDatabaseChange}
            handleUriChange = {this.handleUriChange}
            browseFiles = {this.browseFiles}
          />
          <Transform />
          <Load 
             username = {username}
             password = {password}
             port = {port}
             host = {host}
             database = {database}
             uri = {uri}
             location = {location}
             fileName = {fileName}
             format = {format}
             handleUsernameChange = {this.handleUsernameChange}
             handlePasswordChange = {this.handlePasswordChange}
             handlePortChange = {this.handlePortChange}
             handleHostChange = {this.handleHostChange}
             handleDatabaseChange = {this.handleDatabaseChange}
             handleUriChange = {this.handleUriChange}
             handleFilenameChange = {this.handleFilenameChange}
             handleFileTypeChange = {this.handleFileTypeChange}
             browseDirectories = {this.browseDirectories}
          />
        </div>
        <div>
          <Options 
            emailCheck = {emailCheck}
            textCheck = {textCheck}
            email = {email}
            phoneNumber = {phoneNumber}
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
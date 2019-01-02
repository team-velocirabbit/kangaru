import React, { Component } from 'react';
import Extract from './extract';
import Transform from '../components/transform';
import Load from './load';
import Options from '../components/options';
import '../main.css';

const sgMail = require('@sendgrid/mail');
const etl = require('etl-test');
const remote = require('electron').remote;
const { dialog } = remote;

require('dotenv').config();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

class Jobs extends Component {
  constructor(props) {
    super(props);
    const { state } = this.props;
    this.state = {      
      emailCheck: this.props.state.emailCheck ? this.props.state.emailCheck : false,
      email: this.props.state.email ? this.props.state.email : '',
      textCheck: this.props.state.textCheck ? this.props.state.textCheck : false,
      phoneNumber: this.props.state.phoneNumber ? this.props.state.phoneNumber : '',
      username: this.props.state.username ? this.props.state.username : '',
      password: this.props.state.password ? this.props.state.password : '',
      host: this.props.state.host ? this.props.state.host : '',
      port: this.props.state.port ? this.props.state.port : null,
      database: this.props.state.database ? this.props.state.database : '',
      extractUri: this.props.state.extractUri ? this.props.state.extractUri : '',
      loadUri: this.props.state.loadUri ? this.props.state.loadUri : '',
      filePath: this.props.state.filePath ? this.props.state.filePath : '',
      location: this.props.state.location ? this.props.state.location : '',
      fileName: this.props.state.fileName ? this.props.state.fileName : '',
      format: this.props.state.format ? this.props.state.format : '',
      dependencies: this.props.state.dependencies ? this.props.state.dependencies : '',
      code: this.props.state.code ? this.props.state.code : 'const transform = (data) => { \n//write your code here \n}',
      script: this.props.state.script ? this.props.state.script : '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleNotifications = this.handleNotifications.bind(this);
    this.handleExtractUriChange = this.handleExtractUriChange.bind(this);
    this.handleLoadUriChange = this.handleLoadUriChange.bind(this);
    this.handleFileTypeChange = this.handleFileTypeChange.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.handleTransformClick = this.handleTransformClick.bind(this);
    this.browseFiles = this.browseFiles.bind(this);
    this.browseDirectories = this.browseDirectories.bind(this);
    this.startEtl = this.startEtl.bind(this);
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
    console.log('email is ', this.state.email)
    console.log('e is ', e.target)
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

    handleInputChange(e) {
      let obj;
      if (e.target.id === 'email') obj = { email: e.target.value };
      if (e.target.id === 'text') obj = { phoneNumber: e.target.value };
      if (e.target.id === 'username') obj = { username: e.target.value };
      if (e.target.id === 'password') obj = { password: e.target.value };
      if (e.target.id === 'port') obj = { port: e.target.value };
      if (e.target.id === 'host') obj = { host: e.target.value };
      if (e.target.id === 'database') obj = { database: e.target.value };
      if (e.target.id === 'filename') obj = { fileName: e.target.value };
      if (e.target.id === 'npmDependencies') obj = { dependencies: e.target.value };
      console.log('database is ', e.target.value);

      this.setState(obj);
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

    handleFileTypeChange(e) {
      console.log('filetype is ', e.target.id)
      this.setState({
        format: e.value,
        formatDropdownValue: e.value,
      });
    }

    onCodeChange(newValue) {
      console.log('onCodeChange', newValue);
      this.setState({code: newValue
      });
    }

    handleTransformClick() {
      const newCode = this.state.code
      console.log('new code is ', newCode);
      this.setState({ script: newCode });
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
      const newScript = script.substring(script.indexOf('{') + 1, script.lastIndexOf('}'));
      const scriptFunc = new Function('data', newScript);
           
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
            handleInputChange={this.handleInputChange}
            handleExtractUriChange = {this.handleExtractUriChange}
            browseFiles = {this.browseFiles}
          />
          <Transform 
            dependencies = {dependencies}
            code = {code}
            script = {script}
            onCodeChange = {this.onCodeChange}
            handleTransformClick = {this.handleTransformClick}
            handleInputChange = {this.handleInputChange}
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
             handleInputChange = {this.handleInputChange}
             handleLoadUriChange = {this.handleLoadUriChange}
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
            extractUri = {extractUri}
            loadUri = {loadUri}
            filePath = {filePath}
            fileName = {fileName}
            startEtl = {this.startEtl}
            handleSelection = {this.handleSelection}
            handleInputChange = {this.handleInputChange}
            handleNotifications = {this.handleNotifications}
          />
        </div>
      </div>
    );
  };
};

export default Jobs;

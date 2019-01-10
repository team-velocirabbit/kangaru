import React, { Component } from 'react';
import Extract from './extract';
import Transform from '../components/transform';
import Load from './load';
import Options from '../components/options';
import '../main.css';


import { ipcRenderer } from 'electron';


const sgMail = require('@sendgrid/mail');
const etl = require('rx-etl');
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
      started: this.props.state.started ? this.props.state.started : false,
      loadCollection: this.props.state.loadCollection ? this.props.state.loadCollection : '',
      extractCollection: this.props.state.extractCollection ? this.props.state.extractCollection : '',    
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
      script: this.props.state.script ? this.props.state.script : 'const transform = (data) => { \n//write your code here \n}',
      extractImport: this.props.state.extractImport ? this.props.state.extractImport : false,
      extractConnect: this.props.state.extractConnect ? this.props.state.extractConnect : false,
      extractDropdownValue: this.props.state.extractDropdownValue ? this.props.state.extractDropdownValue : '',
      loadExport: this.props.state.loadExport ? this.props.state.loadExport : false,
      loadConnect: this.props.state.loadConnect ? this.props.state.loadConnect : false,
      loadDropdownValue: this.props.state.loadDropdownValue ? this.props.state.loadDropdownValue : '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleExtractUriChange = this.handleExtractUriChange.bind(this);
    this.handleLoadUriChange = this.handleLoadUriChange.bind(this);
    this.handleExtractCollectionChange = this.handleExtractCollectionChange.bind(this);
    this.handleLoadCollectionChange = this.handleLoadCollectionChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleFileTypeChange = this.handleFileTypeChange.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.browseFiles = this.browseFiles.bind(this);
    this.browseDirectories = this.browseDirectories.bind(this);
    this.startEtl = this.startEtl.bind(this);
    this.handleExtractDropdownChange = this.handleExtractDropdownChange.bind(this);
    this.handleLoadDropdownChange = this.handleLoadDropdownChange.bind(this);
  }

  handleStart() {
    this.setState({
      started: true,
    })
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

  handleInputChange(e) {
    let obj;
    if (e.target.id === 'email') obj = { email: e.target.value };
    if (e.target.id === 'text') obj = { phoneNumber: e.target.value };
    if (e.target.id === 'username') obj = { username: e.target.value };
    if (e.target.id === 'password') obj = { password: e.target.value };
    if (e.target.id === 'port') obj = { port: e.target.value };
    if (e.target.id === 'host') obj = { host: e.target.value };
    if (e.target.id === 'database') obj = { database: e.target.value };
    if (e.target.id === 'fileName') obj = { fileName: e.target.value };
    if (e.target.id === 'npmDependencies') obj = { dependencies: e.target.value };
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

  handleExtractCollectionChange(e) {
    this.setState({
      extractCollection: e.target.value,
    })
  }

  handleLoadCollectionChange(e) {
    this.setState({
      loadCollection: e.target.value,
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
    this.setState({
      script: newValue
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
    const startObject = {
      name: this.props.name,
      start: 'n/a',
      end: 'n/a',
      status: 'in progress...'
    }

    const { extractUri, loadUri, extractCollection, loadCollection, 
      location, filePath, fileName, script, emailCheck, textCheck, email, phoneNumber } = this.state;
    
    if (extractUri === '' && extractCollection === '' && loadUri === ''
      && filePath === '' && fileName === '' && script === '' && location === '') {
      return window.alert('Cannot start job. Please make sure all necessary fields have been provided.');
    }

    if (script === '') {
      return window.alert('Cannot start job. Please make sure transform script has been written.'  
        + 'For simple migration with no manipulation, just return data from function.');
    }

    if ((extractUri === '' || extractCollection === '') && (filePath === '')) {
      return window.alert('Cannot start job. Please make sure extract is provided with necessary information.');
    }

    if ((loadUri === '') && (location === '' || fileName === '')) {
      return window.alert('Cannot start job. Please make sure load is provided with necessary information.');
    }
    const etlObject = {
      name: this.props.name,
      extractUri,
      extractCollection,
      loadUri,
      loadCollection,
      location,
      filePath,
      fileName,
      script,
      textCheck,
      emailCheck,
      email,
      phoneNumber
    }

    // check phone number and email given if selected on checkbox
    if ((textCheck && !phoneNumber) || (phoneNumber && !textCheck)) {
      return window.alert('Please provide phone number or check the phone number box.');
    }
    if ((emailCheck && !email) || (!emailCheck && email)) {
      return window.alert('Please provide email or check the email box.');
    }
    ipcRenderer.send('start', startObject);
    ipcRenderer.send('etl', etlObject);  
  }

  handleExtractDropdownChange(e) {
    if (e.value === 'Import') {
      this.setState({
        extractConnect: false,
        extractImport: true,
        extractDropdownValue: 'Import',
      });
    } else if (e.value === 'Connect') {
      this.setState({
        extractImport: false,
        extractConnect: true,
        extractDropdownValue: 'Connect',
      });
    }
  }

  handleLoadDropdownChange(e) {
    if (e.value === 'Export') {
      this.setState({
        loadConnect: false,
        loadExport: true,
        loadDropdownValue: 'Export',
      });
    } else if (e.value === 'Connect') {
      this.setState({
        loadExport: false,
        loadConnect: true,
        loadDropdownValue: 'Connect',
      });
    }
  }

  render() {
    const { 
      started,
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
      extractCollection,
      loadCollection,
      filePath,
      location,
      fileName,
      format,
      dependencies,
      script,
      extractConnect,
      extractImport,
      extractDropdownValue,
      loadConnect,
      loadExport,
      loadDropdownValue } = this.state;

    return (
      <div>
        <div className='jobs-container'>
          <Extract 
            username={username}
            password={password}
            port={port}
            host={host}
            database={database}
            extractUri={extractUri}
            extractCollection={extractCollection}
            filePath={filePath}
            extractConnect={extractConnect}
            extractImport={extractImport} 
            extractDropdownValue={extractDropdownValue}
            handleInputChange={this.handleInputChange}
            handleExtractUriChange={this.handleExtractUriChange}
            handleExtractCollectionChange={this.handleExtractCollectionChange}
            browseFiles={this.browseFiles}
            handleExtractDropdownChange={this.handleExtractDropdownChange}
          />
          <Transform 
            dependencies = {dependencies}
            script = {script}
            onCodeChange = {this.onCodeChange}
            handleInputChange = {this.handleInputChange}
          />
          <Load 
             username={username}
             password={password}
             port={port}
             host={host}
             database={database}
             loadUri={loadUri}
             loadCollection={loadCollection}
             location={location}
             fileName={fileName}
             format={format}
             loadConnect={loadConnect}
             loadExport={loadExport}
             loadDropdownValue={loadDropdownValue}
             handleInputChange={this.handleInputChange}
             handleLoadUriChange={this.handleLoadUriChange}
             handleLoadCollectionChange={this.handleLoadCollectionChange}
             handleFileTypeChange={this.handleFileTypeChange}
             browseDirectories={this.browseDirectories}
             handleLoadDropdownChange={this.handleLoadDropdownChange}
          />
        </div>
        <div>
          <Options 
            started={started}
            emailCheck={emailCheck}
            textCheck={textCheck}
            email={email}
            phoneNumber={phoneNumber}
            extractUri={extractUri}
            loadUri={loadUri}
            filePath={filePath}
            fileName={fileName}
            startEtl={this.startEtl}
            handleStart={this.handleStart}
            handleSelection={this.handleSelection}
            handleInputChange={this.handleInputChange}
          />
        </div>
      </div>
    );
  };
};

export default Jobs;

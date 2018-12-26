import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import LoadExport from '../components/LoadExport';
import Connect from '../components/Connect';
import 'react-dropdown/style.css';
const remote = require('electron').remote;
const { dialog } = remote;

const DROPDOWN_OPTIONS = [
  'Export', 'Connect'
];

class Load extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadExport: false,
      loadConnect: false,
      username: '',
      password: '',
      host: '',
      port: null,
      database: '',
      fileName: '',
      location: '',
      format: '',
      dropdownValue: '',
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleHostChange = this.handleHostChange.bind(this);
    this.handlePortChange = this.handlePortChange.bind(this);
    this.handleDatabaseChange = this.handleDatabaseChange.bind(this);
    this.handleFilenameChange = this.handleFilenameChange.bind(this);
    this.browseFiles = this.browseFiles.bind(this);
    this.handleFileTypeChange = this.handleFileTypeChange.bind(this);
  }

  handleDropdownChange(e) {
    if (e.value === 'Export') {
      this.setState({
        loadConnect: false,
        loadExport: true,
        dropdownValue: 'Export',
      });
    } else if (e.value === 'Connect') {
      this.setState({
        loadExport: false,
        loadConnect: true,
        dropdownValue: 'Connect',
      });
    }
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

  handleFilenameChange(e) {
    this.setState({
      fileName: e.target.value,
    });
    console.log('filename is ', this.state.fileName);
  }

  browseFiles() {
    dialog.showOpenDialog({ 
      properties: ['openDirectory'], 
    },
    (file) => {
    //   console.log('file is ', file[0])
      this.setState({
        location: file[0],
      });
    //   console.log('filePath is ', this.state.filePath)
    });
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

  render() {
    const { loadExport, loadConnect, fileName, location, format, dropdownValue } = this.state;
    const exportComp = loadExport ? 
      <LoadExport
        fileName = {fileName}
        location = {location}
        handleFilenameChange = {this.handleFilenameChange}
        handleFileTypeChange = {this.handleFileTypeChange}
        browseFiles = {this.browseFiles}
        format = {format}
      />
      : null
    const connectComp = loadConnect ?
      <Connect 
        handleUsernameChange = {this.handleUsernameChange}
        handlePasswordChange = {this.handlePasswordChange}
        handleHostChange = {this.handleHostChange}
        handlePortChange = {this.handlePortChange}
        handleDatabaseChange = {this.handleDatabaseChange}
      />
      : null
    return (
      <div>
        <h1>Load</h1>
        <Dropdown
          options={DROPDOWN_OPTIONS} 
          onChange={this.handleDropdownChange} 
          placeholder="Select loading method"
          value={dropdownValue}
        />
        {exportComp}
        {connectComp}
      </div>      
    );
  }
}

export default Load;
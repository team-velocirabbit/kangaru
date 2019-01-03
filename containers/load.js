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
    
    };
    // this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  
    
  render() {
    // const { loadExport, loadConnect, dropdownValue } = this.state;
    const { 
      username, 
      password, 
      port, 
      host, 
      database, 
      loadUri, 
      location, 
      fileName, 
      format, 
      loadExport,
      loadConnect,
      loadDropdownValue,
      handleInputChange,
      handleLoadUriChange, 
      handleFileTypeChange, 
      browseDirectories, 
      handleLoadDropdownChange,
   } = this.props;
    const exportComp = loadExport ? 
      <LoadExport
        fileName = {fileName}
        location = {location}
        format = {format}
        loadDropdownValue = {loadDropdownValue}
        handleInputChange = {handleInputChange}
        handleFileTypeChange = {handleFileTypeChange}
        browseDirectories = {browseDirectories}      
      />
      : null
    const connectComp = loadConnect ?
      <Connect 
        username = {username}
        password = {password}
        port = {port}
        host = {host}
        database = {database}
        uri = {loadUri}
        loadDropdownValue = {loadDropdownValue}
        handleInputChange = {handleInputChange}
        handleUriChange = {handleLoadUriChange}
      />
      : null
    return (
      <div className="section">
        <h1>Load</h1>
        <Dropdown
          options={DROPDOWN_OPTIONS} 
          onChange={handleLoadDropdownChange} 
          placeholder="Select loading method"
          value={loadDropdownValue}
        />
        {exportComp}
        {connectComp}
      </div>      
    );
  }
}

export default Load;
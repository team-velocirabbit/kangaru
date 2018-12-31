import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import Connect from '../components/Connect';
import ExtractImport from '../components/ExtractImport';
import 'react-dropdown/style.css';
// const remote = require('electron').remote;
// const { dialog } = remote;

const DROPDOWN_OPTIONS = [
  'Import', 'Connect'
];
class Extract extends Component {     
  constructor(props) {
    super(props);
    this.state = {
      extractImport: false,
      extractConnect: false,
      dropdownValue: '',
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    // this.handleFilePathChange = this.handleFilePathChange.bind(this)
}

  handleDropdownChange(e) {
    if (e.value === 'Import') {
      this.setState({
        extractConnect: false,
        extractImport: true,
        dropdownValue: 'Import',
      });
    } else if (e.value === 'Connect') {
      this.setState({
        extractImport: false,
        extractConnect: true,
        dropdownValue: 'Connect',
      });
    }
    console.log('extractImport is ', this.state.extractImport)
    console.log('extractConnect is ', this.state.extractConnect)
  }
    
    // const { extractImport, extractConnect } = tprops;

  render() {
    const { extractImport, extractConnect, dropdownValue } = this.state;
    const { username, password, port, host, database, extractUri, filePath, handleInputChange, handleExtractUriChange, browseFiles } = this.props;
    const importComp = extractImport ? 
      <ExtractImport
          browseFiles = {browseFiles}
          filePath = {filePath}
          dropdownValue = {dropdownValue}
      />
      : null
    const connectComp = extractConnect ? 
      <Connect 
        username = {username}
        password = {password}
        port = {port}
        host = {host}
        database = {database}
        extractUri = {extractUri}
        handleInputChange = {handleInputChange}
        handleUriChange = {handleExtractUriChange}
        dropdownValue = {dropdownValue}
      />
      : null
    return (      
      <div className="section">
        <h1>Extract</h1>
        <Dropdown
          options={DROPDOWN_OPTIONS} 
          onChange={this.handleDropdownChange} 
          placeholder="Select extraction method"
          value={dropdownValue}
        />
        {importComp}
        {connectComp}
      </div>
    );
  }
}

export default Extract;

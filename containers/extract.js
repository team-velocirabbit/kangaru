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
      // extractDropdownValue: '',
    };
    // this.handleDropdownChange = this.handleDropdownChange.bind(this);
    // this.handleFilePathChange = this.handleFilePathChange.bind(this)
}

  handleDropdownChange(e) {
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
    console.log('extractImport is ', this.state.extractImport)
    console.log('extractConnect is ', this.state.extractConnect)
  }
    
    // const { extractImport, extractConnect } = tprops;

  render() {
    // const { extractImport, extractConnect, dropdownValue } = this.state;
    const { username, password, port, host, 
      database, extractUri, extractCollection, filePath, handleInputChange, 
      handleExtractUriChange, browseFiles, extractConnect, extractImport, 
      extractDropdownValue, handleExtractCollectionChange, handleExtractDropdownChange } = this.props;
    const importComp = extractImport ? 
      <ExtractImport
          browseFiles={browseFiles}
          filePath={filePath}
          extractDropdownValue={extractDropdownValue}
      />
      : null
    const connectComp = extractConnect ? 
      <Connect 
        username={username}
        password={password}
        port={port}
        host={host}
        database={database}
        uri={extractUri}
        collection={extractCollection}
        handleInputChange={handleInputChange}
        handleCollectionChange={handleExtractCollectionChange}
        handleUriChange={handleExtractUriChange}
        extractDropdownValue={extractDropdownValue}
      />
      : null
    return (      
      <div className="section">
        <h1>Extract</h1>
        <Dropdown
          options={DROPDOWN_OPTIONS} 
          onChange={handleExtractDropdownChange} 
          placeholder="Select extraction method"
          value={extractDropdownValue}
        />
        {importComp}
        {connectComp}
      </div>
    );
  }
}

export default Extract;

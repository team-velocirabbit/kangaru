import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const ExtractImport = (props) => {
  const DROPDOWN_OPTIONS = [
    { value: 'csv', label: 'CSV' },
    { value: 'json', label: 'JSON' },
    { value: 'xml', label: 'XML' }
  ];
  const { 
    browseDirectories, 
    fileName, 
    handleInputChange,
    // handleFilenameChange, 
    handleFileTypeChange,
    location, 
    format,
    // handleFormatChange,
  } = props;
  return (
    <div>
      <br/>
      <div>
        File Format: 
        <Dropdown
          options={DROPDOWN_OPTIONS} 
          value={format}
          onChange={handleFileTypeChange} 
          placeholder="Select file format"
        />
      </div>
      <div>Filename: 
        <input 
          id='filename'
          type='text'
          onChange = {handleInputChange} 
          placeholder = 'What will your file be called?' 
          value={fileName}
        />
      </div>
      <div>Location: 
        <input
          type='text'
          value={location}
        />
        <button className="btn waves-effect waves-light grey darken-4" onClick={() => browseDirectories()}>Browse</button>
      </div>
    </div>   
  )
}

export default ExtractImport;

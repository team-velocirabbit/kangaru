import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const LoadExport = (props) => {
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
      <div className="input-field col s12">
        <input
        id="fileName"
        className="validate col s12"
        type='text'
        value={fileName}
        onChange={handleInputChange}
        />
        <label className="active" for="fileName">New file name</label>
      </div>
      <div className="input-field col s12">
        <input
        id="location"
        className="validate col s12"
        type='text'
        value={location}
        />
        <label className="active" for="location">Location of file (file path)</label>
      </div>
      <button className="btn waves-effect waves-light grey darken-4" onClick={() => browseDirectories()}>Browse</button>
    </div>   
  )
}

export default LoadExport;

import React from 'react';

const ExtractImport = (props) => {
  const { browseFiles, fileName, handleFilenameChange, location } = props;
  return (
    <div>
      <h2>Export</h2>
      <div>Filename: 
        <input 
          type='text'
          onChange = {handleFilenameChange} 
          placeholder = 'What will your file be called?' 
          value={fileName}
        />
      </div>
      <div>Location: 
        <input
          type='text'
          value={location}
        />
        <button onClick={() => browseFiles()}>Browse</button>
      </div>
    </div>   
  )
}

export default ExtractImport;
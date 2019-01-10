import React from 'react';

const ExtractImport = (props) => {
  const { browseFiles, filePath } = props;
  return (
    <div>
      <br/>
      {/* <h2>Import</h2> */}
      <div>
        <div className="input-field col s12">
          <input
          id="filePath"
          className="validate col s12"
          type='text'
          value={filePath}
          />
          <label className="active" for="filePath">File Path</label>
        </div>
        <button className="btn waves-effect waves-light grey darken-4" onClick={() => browseFiles()}>Browse</button>
      </div>    
    </div>
    
  )
}

export default ExtractImport;
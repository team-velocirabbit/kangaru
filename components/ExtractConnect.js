import React from 'react';

const ExtractConnect = (props) => {
  const { 
    // username, 
    // password, 
    // host, 
    // port, 
    // database, 
    handleUsernameChange, 
    handlePasswordChange, 
    handleHostChange, 
    handlePortChange, 
    handleDatabaseChange 
  } = props;
  return (
    <div>
      <h2>Connect</h2>
      <div>Username: <input type="text" onChange={handleUsernameChange}/></div>
      <div>Password: <input type="text" onChange={handlePasswordChange}/></div>
      <div>Host: <input type="text" onChange={handleHostChange}/></div>
      <div>Port: <input type="text" onChange={handlePortChange}/></div>
      <div>Database: <input type="text" onChange={handleDatabaseChange}/></div>
      <button>Submit</button>
    </div>
  )
}

export default ExtractConnect;
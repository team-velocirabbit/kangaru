import React from 'react';

const Connect = (props) => {
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
    handleDatabaseChange,
    handleUriChange,
  } = props;
  return (
    <div>
      <br/>
      <h3>Please enter your database credentials</h3>
      <div>Username: <input type="text" onChange={handleUsernameChange}/></div>
      <div>Password: <input type="password" onChange={handlePasswordChange}/></div>
      <div>Host: <input type="text" onChange={handleHostChange}/></div>
      <div>Port: <input type="text" onChange={handlePortChange}/></div>
      <div>Database: <input type="text" onChange={handleDatabaseChange}/></div>
      <br/>
      <div>Or enter your database URI here! <input type="text" onChange={handleUriChange}/></div>
      <button>Submit</button>
    </div>
  )
}

export default Connect;
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

        <div className="input-field col s12">
          <input
          id="username"
          className="validate col s12"
          type='text'
          onChange={handleUsernameChange}
          />
          <label for="username">Username</label>
        </div>

        <div className="input-field col s12">
          <input
          id="password"
          className="validate col s12"
          type='password'
          onChange={handlePasswordChange}
          />
          <label for="password">Password</label>
        </div>

        <div className="input-field col s12">
          <input
          id="port"
          className="validate col s12"
          type='password'
          onChange={handlePortChange}
          />
          <label for="port">Port</label>
        </div>

        <div className="input-field col s12">
          <input
          id="database"
          className="validate col s12"
          type='text'
          onChange={handleDatabaseChange}
          />
          <label for="database">Database</label>
        </div>
        <br/>
        
         <div className="input-field col s12">
          <input
          id="altDatabase"
          className="validate col s12"
          type='text'
          onChange={handleUriChange}
          />
          <label for="altDatabase">OR enter database URI here</label>
        </div>
      {/* <div>Username: <input type="text" onChange={handleUsernameChange}/></div> */}
      {/* <div>Password: <input type="password" onChange={handlePasswordChange}/></div> */}
      {/* <div>Host: <input type="text" onChange={handleHostChange}/></div> */}
      {/* <div>Port: <input type="text" onChange={handlePortChange}/></div> */}
      {/* <div>Database: <input type="text" onChange={handleDatabaseChange}/></div> */}
      <br/>
      {/* <div>Or enter your database URI here! <input type="text" onChange={handleUriChange}/></div> */}
      {/* <button className="btn waves-effect waves-light green darken-1">Submit</button> */}
    </div>
  )
}

export default Connect;
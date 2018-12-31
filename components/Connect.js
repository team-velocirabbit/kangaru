import React from 'react';

const Connect = (props) => {
  const { 
    // handleUsernameChange, 
    // handlePasswordChange, 
    // handleHostChange, 
    // handlePortChange, 
    // handleDatabaseChange,
    handleInputChange,
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
          onChange={handleInputChange}
          />
          <label for="username">Username</label>
        </div>

        <div className="input-field col s12">
          <input
          id="password"
          className="validate col s12"
          type='password'
          onChange={handleInputChange}
          />
          <label for="password">Password</label>
        </div>

        <div className="input-field col s12">
          <input
          id="host"
          className="validate col s12"
          type="text"
          onChange={handleInputChange}
          />
          <label for="host">Host</label>
        </div>

        <div className="input-field col s12">
          <input
          id="port"
          className="validate col s12"
          type='text'
          onChange={handleInputChange}
          />
          <label for="port">Port</label>
        </div>

        <div className="input-field col s12">
          <input
          id="database"
          className="validate col s12"
          type='text'
          onChange={handleInputChange}
          />
          <label for="database">Database</label>
        </div>
        <br/>

         <div className="input-field col s12">
          <input
          id="uri"
          className="validate col s12"
          type='text'
          onChange={handleUriChange}
          />
          <label for="uri">OR enter database URI here</label>
        </div>
    </div>
  )
}

export default Connect;

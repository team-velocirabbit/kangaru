import React from 'react';

const Options = (props) => {
  const {
    emailCheck,
    textCheck,
    email,
    phoneNumber,
    uri, 
    filePath,
    fileName,
    handleSelection,
    handleEmailChange,
    handlePhoneChange,
    handleNotifications,
    startEtl
  } = props;
    return (
      <div className="options">
          <p className="optionAlign">Notify Me Upon Completion: &nbsp;</p>


          <div className="row inputField">
            <label className="checkbox">
              <input type="checkbox" value="email" defaultChecked={emailCheck} className="filled-in" onChange={handleSelection}/>
              <span></span>
            </label>
            {/* <input
              type='checkbox'
              className="filled-in" checked="checked"
              value='email'
              defaultChecked={emailCheck}
              onChange={handleSelection}
              />    */}
            <div className="input-field col s12">
              <input
              id="email"
              className="validate col s12"
              type='text'
              onChange={handleEmailChange}
              />
              <label for="email">Email Address</label>
            </div>
          </div>

            
        

            {/* <p>Text &nbsp;</p>
            <input
            type='checkbox'
            className="filled-in" checked="checked"
            value='text'
            defaultChecked={textCheck}
            onChange={handleSelection}
            /> */}

          <div className="row inputField">
            <label className="checkbox">
              <input type="checkbox" value="text" defaultChecked={textCheck} className="filled-in" onChange={handleSelection}/>
              <span></span>
            </label>
            <div className="input-field col s12">
              <input
              id="text"
              className="validate"
              type='text'
              onChange={handlePhoneChange}
              />
              <label for="text">Phone Number</label>
            </div>
          </div>

            {/* <input
            className="validate"
            type='text'
            placeholder='Receive text notifications about this job'
            onChange={handlePhoneChange}
            /> */}
          
            <button className="btn waves-effect waves-light green darken-1 optionAlign" onClick={() => startEtl()}>Start</button>
      </div>
    );
};

export default Options;
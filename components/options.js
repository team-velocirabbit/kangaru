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
      <div>
        <h2>Options</h2>
        <span>
          Upon Completion: 
            <input
            type='checkbox'
            value='email'
            defaultChecked={emailCheck}
            onChange={handleSelection}
            />
            Email 
            <input
            type='text'
            placeholder='Receive email notifications about this job'
            onChange={handleEmailChange}
            />
            Text
            <input
            type='checkbox'
            value='text'
            defaultChecked={textCheck}
            onChange={handleSelection}
            />
            <input
            type='text'
            placeholder='Receive text notifications about this job'
            onChange={handlePhoneChange}
            />
            <button onClick={() => startEtl()}>Start</button>
        </span>
      </div>
    );
};

export default Options;
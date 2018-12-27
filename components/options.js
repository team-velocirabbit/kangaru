import React from 'react';

const Options = (props) => {
  const {
    emailCheck,
    textCheck,
    email,
    phoneNumber,
    handleSelection,
    handleEmailChange,
    handlePhoneChange,
    handleNotifications
  } = props;
    return (
      <div>
        <h2>Options</h2>
        <span>
          Upon Completion: 
            <input
            type='checkbox'
            value='email'
            defaultChecked='false'
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
            <button onClick={handleNotifications}>Start</button>
        </span>
      </div>
    );
};

export default Options;
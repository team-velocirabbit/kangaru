import React, { Component } from 'react';
import Extract from './extract';
import Transform from '../components/transform';
import Load from './load';
import Options from '../components/Options';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailCheck: false,
      email: '',
      textCheck: false,
      phoneNumber: '',
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePhoneChange(e) {
    this.setState({
      phoneNumber: e.target.value,
    });
  }

  handleSelection(e) {
    console.log('e value is ', e.target.value);
  }

  render() {
    const { emailCheck, textCheck, email, phoneNumber } = this.state;
    return (
      <div>
        <h1>Jobs Container</h1>
        <Extract />
        <Transform />
        <Load />
        <Options 
          emailCheck = {emailCheck}
          textCheck = {textCheck}
          email = {email}
          phoneNumber = {phoneNumber}
          handleSelection = {this.handleSelection}
        />
      </div>
    );
  };
};

export default Jobs;
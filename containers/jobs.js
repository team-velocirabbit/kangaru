import React, { Component } from 'react';
import Extract from './extract';
import Transform from '../components/transform';
import Load from './load';
import Options from '../components/Options';
import '../main.css';

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
    console.log('email is ', this.state.email)
  }

  handlePhoneChange(e) {
    this.setState({
      phoneNumber: e.target.value,
    });
  }

  handleSelection(e) {
    if (e.target.value === 'email') {
      if (this.state.emailCheck === false) {
        this.setState({
          emailCheck: true,
        });
      };
      if (this.state.emailCheck === true) {
        this.setState({
          emailCheck: false,
        });
      }
    } else if (e.target.value === 'text') {
        if (this.state.textCheck === false) {
          this.setState({
            textCheck: true,
          });
        };
        if (this.state.textCheck === true) {
          this.setState({
            textCheck: false,
          });
        }
    }
    console.log('textState is ', this.state.textCheck)
    console.log('emailState is ', this.state.emailCheck)
  }

  render() {
    const { emailCheck, textCheck, email, phoneNumber } = this.state;
    return (
      <div>
        <div className='jobs-container'>
          <Extract />
          <Transform />
          <Load />
        </div>
        <div>
          <Options 
            emailCheck = {emailCheck}
            textCheck = {textCheck}
            email = {email}
            phoneNumber = {phoneNumber}
            handleSelection = {this.handleSelection}
            handleEmailChange = {this.handleEmailChange}
            handlePhoneChange = {this.handlePhoneChange}
          />
        </div>
      </div>
    );
  };
};

export default Jobs;
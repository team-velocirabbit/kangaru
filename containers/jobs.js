import React, { Component } from 'react';
import Extract from './extract';
import Transform from '../components/transform';
import Load from './load';
import Options from '../components/Options';
import '../main.css';

require('dotenv').config();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const sgMail = require('@sendgrid/mail');


class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailCheck: false,
      email: '',
      textCheck: true,
      phoneNumber: '',
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleNotifications = this.handleNotifications.bind(this);
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
    // } else if (e.target.value === 'text') {
    //     if (this.state.textCheck === false) {
    //       this.setState({
    //         textCheck: true,
    //       });
    //     };
    //     if (this.state.textCheck === true) {
    //       this.setState({
    //         textCheck: false,
    //       });
    //     }
    }
    console.log('textState is ', this.state.textCheck)
    console.log('emailState is ', this.state.emailCheck)
  }

  handleNotifications(e) {
    if (this.state.textCheck) {
      console.log('sending email')
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);     
      const msg = {
        to: 'kachler@mac.com',
        from: 'kachler@mac.com',
        subject: 'Your Kangaru job has finished',
        text: 'Your Kangaru job has finished',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      sgMail.send(msg);
      // console.log('sending text')
      // console.log('phone number is ', this.state.phoneNumber)
      // console.log('text coming from ', process.env.TWILIO_PHONE_NUMBER)
      // client.messages.create({
      //   from: process.env.TWILIO_PHONE_NUMBER,
      //   to: process.env.CELL_PHONE_NUMBER,
      //   // to: this.state.phoneNumber,
      //   body: 'Your Kangaru job has finished.',
      };
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
            handleNotifications = {this.handleNotifications}
          />
        </div>
      </div>
    );
  };
};

export default Jobs;
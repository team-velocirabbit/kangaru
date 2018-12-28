import React, { Component } from 'react';
import Jobs from './containers/jobs';
import Queue from './components/queue';
import ReactDOM from 'react-dom';
import './index.html';
import './main.css';

class App extends Component {
  render(){
        return (
            <div className="mainContainer">
                <span id="brand">
                   <img id="kangarooLogo" src="https://bit.ly/2BJJehs" alt="kangaru logo"/>
                   <p id='logo'>Kangaru</p>
                </span>
                <div className="jobsContainer">
                    <Jobs />
                </div>  
                <div className="queue">
                    <Queue />
                </div>  
            </div> 
        );
    };
};

ReactDOM.render(<App/>, document.getElementById('app'));
import React, {Component} from 'react';
import Jobs from './containers/jobs';
import Queue from './components/queue';
import ReactDOM from 'react-dom';
import './index.html';
import './main.css';
import * as monaco from 'monaco-editor';

monaco.editor.create(document.getElementById('app'), {
    value: [
      'function x() {',
      '\tconsole.log("Hello world!");',
      '}'
    ].join('\n'),
    language: 'javascript'
  });

class App extends Component {
  render(){
        return (
            <div className="mainContainer">
                <img id="kangarooLogo" src="https://www.naukrinama.com/stressbuster/wp-content/uploads/2018/08/ilustracion-del-canguro-de-dibujos-animados_29937-1176.jpg" alt="kangaru logo"/>
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
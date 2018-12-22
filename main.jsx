import React, {Component} from 'react';
import Jobs from './containers/jobs';
import ReactDOM from 'react-dom';


class App extends Component {
    render(){
        return(
            <div>
                <h1>Hello World!</h1>
                <Jobs />
            </div>
        );
    };
};

ReactDOM.render(<App/>, document.getElementById('app'));

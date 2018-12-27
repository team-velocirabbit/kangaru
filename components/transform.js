import React, {Component} from 'react';
import * as monaco from 'monaco-editor';
import Editor from './Editor';
import MonacoEditor from 'react-monaco-editor';

class Transform extends Component {
    constructor(props){
        super(props);
        this.state = {
            dependencies: ''
        };
        this.handleDependencyChange = this.handleDependencyChange.bind(this);
    }

    handleDependencyChange(e){
        console.log(e.target.value);
        this.setState({
            dependencies: e.target.value
          });
    }
    render(){
        const props = this.props;
        return(
            <div>
                <h1>Transform</h1>
                <label htmlFor="npmDependencies">NPM Dependencies</label>
                <br/>
                <input type="text" id="npmDependencies" name="NPM Dependencies" onChange={this.handleDependencyChange} placeholder="Enter your dependencies..."></input>
                <br/>
                <Editor  />
            </div>
        );
    };
};

export default Transform;
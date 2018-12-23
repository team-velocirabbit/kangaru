import React, {Component} from 'react';

class Transform extends Component {
    render(){
        return(
            <div>
                <label for="npmDependencies">NPM Dependencies</label>
                <br/>
                <input type="text" id="npmDependencies" name="NPM Dependencies" placeholder="Enter your dependencies..."></input>
                <br/>
            </div>
        );
    };
};

export default Transform;
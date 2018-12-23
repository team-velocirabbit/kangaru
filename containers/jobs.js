import React, {Component} from 'react';
import Load from '../components/load'
import Transform from '../components/transform'
class Jobs extends Component {
    render(){
        return(
            <div>
                <h1>Jobs Container</h1>
                <Transform />
                <Load />
            </div>
        );
    };
};

export default Jobs;
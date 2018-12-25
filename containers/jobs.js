import React, {Component} from 'react';
import Extract from './extract';
import Transform from '../components/transform';
import Load from '../components/load';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return(
        <div>
            <h1>Jobs Container</h1>
            <Extract />
            <Transform />
            <Load />
        </div>
    );
  };
};

export default Jobs;
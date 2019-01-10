import React, { Component } from 'react';

class DefaultTab extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div id='default' style={{ height: '15rem', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
				<h3 id='defaultText' style={{ marginTop: '10rem', textAlign: 'center', color: 'lightgrey', fontSize: '2rem' }}> + Add a new job </h3>
			</div>
		);
	};
};

export default DefaultTab;
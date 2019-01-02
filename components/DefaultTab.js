import React, { Component } from 'react';

class DefaultTab extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div id='default' style={{ height: '5rem', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
				<h3 id='defaultText' style={{ marginTop: '5rem', textAlign: 'center', color: 'lightgrey', fontSize: '1.5rem' }}> + Add a new job </h3>
			</div>
		);
	};
};

export default DefaultTab;
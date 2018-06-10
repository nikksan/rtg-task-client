import React from 'react';
import { Alert } from 'react-bootstrap';

export default class Alerts extends React.Component {
	render(){
		const { error, success} = this.props.alerts;
		
		return (
			<div>
				{ error && <Alert bsStyle="danger">{error}</Alert>	}
				{ success && <Alert bsStyle="success">{success}</Alert> }
			</div>
		);
	}
}

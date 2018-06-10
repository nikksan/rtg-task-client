import React from 'react';
import { Redirect } from 'react-router'
import OpeningsService from '../../../services/api/opening'
import Navigation from '../Nav'
import Alerts from '../Alerts';
import { Grid, FieldGroup, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

export default class DashboardOpeningsFormPage extends React.Component {
	state = {
		opening: {
			id: null,
			title: '',
			description: ''
		},
		alerts: {
			error: '',
			success: ''
		},
		redirectToOpenings: false
	}

	async componentWillMount(){
		const { params } = this.props.match;
		
		if(params.id){
			try{
				const opening = await OpeningsService.get(params.id);
				this.setState({opening});
			}catch(e){
				// this.setError(e.message)
				this.setState({redirectToOpenings: true});
			}
		}
	}


	render(){
		const { opening, alerts, redirectToOpenings } = this.state;

		if(redirectToOpenings){
			return <Redirect to="/admin/openings"/>
		}

		return(
			<div>
				<Navigation/>
				<Grid bsClass="container">
					{ this.renderOpeningForm(opening) }
					{ this.renderFormAlerts(alerts) }
				</Grid>
			</div>
		);
	}

	renderOpeningForm(opening){
		return (
			<form onSubmit={this.onSubmit}>
				<FormGroup>
					<ControlLabel>Title</ControlLabel>
					<FormControl
						name="title"
			            type="text"
			            value={opening.title}
			            placeholder="Enter title"
			            onChange={this.onChange}
			          />
				</FormGroup>
				<FormGroup>
			      <ControlLabel>Content</ControlLabel>
			      <FormControl 
			      	name="description"
			      	value={opening.description}
			      	componentClass="textarea" 
			      	placeholder="Enter description" 
			      	onChange={this.onChange}
			      />
			    </FormGroup>
			    <Button type="submit">Save</Button>
		    </form>
		);
	}

	onChange = e => {
		let { opening } = this.state;
		opening[e.currentTarget.name] = e.currentTarget.value;
		this.setState({opening});
	}

	onSubmit = async e => {
		e.preventDefault();
		
		// way too lazy for client side validation ..
		const { opening } = this.state;

		try{
			let openingObj = {title: opening.title, description: opening.description};
			if(opening.id){
				await OpeningsService.update(opening.id, openingObj);
			}else{
				await OpeningsService.create(openingObj);
			}
			this.setSuccess('Congratz! Opening was saved!');
		}catch(e){
			this.setError(e.message);
		}
	}

	renderFormAlerts(alerts){
		return <Alerts alerts={alerts}/>
	}

	setError(message){
		this.setState({alerts: {error: message, success: ''}})
	}

	setSuccess(message){
		this.setState({alerts: {error: '', success: message}})
	}
}
import React from 'react';
import { Redirect } from 'react-router'
import PageService from '../../../services/api/page'
import Navigation from '../Nav'
import Alerts from '../Alerts';
import { Grid, FieldGroup, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

export default class DashboardPagesFormPage extends React.Component {
	state = {
		page: {
			id: null,
			slug: '',
			title: '',
			content: ''
		},
		alerts: {
			error: '',
			success: ''
		},
		redirectToPages: false
	}

	async componentWillMount(){
		const { params } = this.props.match;
		
		if(params.id){
			try{
				const page = await PageService.get(params.id);
				this.setState({page});
			}catch(e){
				// this.setError(e.message)
				this.setState({redirectToPages: true});
			}
		}
	}


	render(){
		const { page, alerts, redirectToPages } = this.state;

		if(redirectToPages){
			return <Redirect to="/admin/pages"/>
		}

		return(
			<div>
				<Navigation/>
				<Grid bsClass="container">
					{ this.renderPageForm(page) }
					{ this.renderFormAlerts(alerts) }
				</Grid>
			</div>
		);
	}

	renderPageForm(page){
		return (
			<form onSubmit={this.onSubmit}>
				<FormGroup>
					<ControlLabel>Title</ControlLabel>
					<FormControl
						name="title"
			            type="text"
			            value={page.title}
			            placeholder="Enter title"
			            onChange={this.onChange}
			          />
				</FormGroup>
				<FormGroup>
					<ControlLabel>Slug</ControlLabel>
					<FormControl
						name="slug"
			            type="text"
			            value={page.slug}
			            placeholder="Enter slug"
			            onChange={this.onChange}
			          />
				</FormGroup>
				<FormGroup>
			      <ControlLabel>Content</ControlLabel>
			      <FormControl 
			      	name="content"
			      	value={page.content}
			      	componentClass="textarea" 
			      	placeholder="Enter content" 
			      	onChange={this.onChange}
			      />
			    </FormGroup>
			    <Button type="submit">Save</Button>
		    </form>
		);
	}

	onChange = e => {
		let { page } = this.state;
		page[e.currentTarget.name] = e.currentTarget.value;
		this.setState({page});
	}

	onSubmit = async e => {
		e.preventDefault();
		
		// way too lazy for client side validation ..
		const { page } = this.state;

		try{
			let pageObj = {title: page.title, slug: page.slug, content: page.content};
			if(page.id){
				await PageService.update(page.id, pageObj);
			}else{
				await PageService.create(pageObj);
			}
			this.setSuccess('Congratz! Page was saved!');
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
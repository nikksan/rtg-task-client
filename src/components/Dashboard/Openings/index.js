import React from 'react';
import { Redirect } from 'react-router'
import Navigation from '../Nav'
import { Grid, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import OpeningsService from '../../../services/api/opening'

export default class DashboardOpeningsPage extends React.Component {
	state = {
		openings: [],
		redirect: false
	}

	componentWillMount(){
		this.getOpenings();
	}

	async getOpenings(){
		try{
			const openings = await OpeningsService.list();
			this.setState({openings})	
		}catch(e){
			console.log(e.message);
		}
	}

	render(){
		const { openings, redirect } = this.state;

		if(redirect){
			return <Redirect to={redirect}/>
		}

		return(
			<div>
				<Navigation/>
				<Grid bsClass="container">
					<Button onClick={this.onCreateNewOpeningClick}>Create new opening</Button>
					{ this.renderOpeningsList(openings) }
				</Grid>
			</div>
		)
	}

	renderOpeningsList(openings){
		return (
			<ListGroup>
				{ openings.map( this.renderOpening) }
			</ListGroup>
		)
	}

	renderOpening = opening => {
		return (
			<ListGroupItem key={opening.id}>
				{opening.title}
				<Button onClick={() => this.onEditOpeningClick(opening)}>Edit</Button>
				<Button onClick={() => this.onDeleteOpeningClick(opening)}>Delete</Button>
			</ListGroupItem>
		)
	}

	onEditOpeningClick = opening => {
		this.setState({redirect: '/admin/openings/' + opening.id})
	}
	
	onDeleteOpeningClick = async opening => {
		if(!window.confirm('Are you sure?')){
			return;
		}
		
		try{
			await OpeningsService.delete(opening.id)
			this.getOpenings();
		}catch(e){
			console.log(e.message);
		}
	}

	onCreateNewOpeningClick = () => {
		this.setState({redirect: '/admin/openings/new'})
	}
}
import React from 'react';
import { Redirect } from 'react-router'
import Navigation from '../Nav'
import { Grid, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import PageService from '../../../services/api/page'

export default class DashboardPagesPage extends React.Component {
	state = {
		pages: [],
		redirect: false
	}

	componentWillMount(){
		this.getPages();
	}

	async getPages(){
		try{
			const pages = await PageService.list();
			this.setState({pages: pages})	
		}catch(e){
			console.log(e.message);
		}
	}

	render(){
		const { pages, redirect } = this.state;

		if(redirect){
			return <Redirect to={redirect}/>
		}

		return(
			<div>
				<Navigation/>
				<Grid bsClass="container">
					<Button onClick={this.onCreateNewPageClick}>Create new page</Button>
					{ this.renderPagesList(pages) }
				</Grid>
			</div>
		)
	}

	renderPagesList(pages){
		return (
			<ListGroup>
				{ pages.map( this.renderPage) }
			</ListGroup>
		)
	}

	renderPage = page => {
		return (
			<ListGroupItem key={page.id}>
				{page.title}
				<Button onClick={() => this.onEditPageClick(page)}>Edit</Button>
				<Button onClick={() => this.onDeletePageClick(page)}>Delete</Button>
			</ListGroupItem>
		)
	}

	onCreateNewPageClick = () => {
		this.setState({redirect: '/admin/pages/new'})
	}
	
	onEditPageClick = page => {
		this.setState({redirect: '/admin/pages/' + page.id})
	}

	onDeletePageClick = async page => {
		if(!window.confirm('Are you sure?')){
			return;
		}
		
		try{
			await PageService.delete(page.id)
			this.getPages();
		}catch(e){
			console.log(e.message);
		}
	}

}
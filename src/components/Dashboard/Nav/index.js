import React from 'react';

import { Link, Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Header, Brand, Nav, NavItem, Button } from 'react-bootstrap';

import Cookies from 'universal-cookie';

export default class Navigation extends React.Component {
	state = {
		redirectToLogin: false
	}
	
	render(){
		const { redirectToLogin } = this.state;

		if(redirectToLogin){
			return <Redirect to='/login'></Redirect>
		}

		return (
			<Navbar>
			  <Navbar.Header>
			    <Navbar.Brand>
			      <LinkContainer to="/admin">
			       	<NavItem>Dashboard</NavItem>
			    </LinkContainer>
			    </Navbar.Brand>
			  </Navbar.Header>
			  <Nav>
			    <LinkContainer to="/admin/pages">
			       	<NavItem>Pages</NavItem>
			    </LinkContainer>
			    <LinkContainer to="/admin/employees">
			       	<NavItem>Employees</NavItem>
			    </LinkContainer>
			    <LinkContainer to="/admin/openings">
			       	<NavItem>Openings</NavItem>
			    </LinkContainer>
				<NavItem>
			    	<Button onClick={this.onClick}>Logout</Button>
			    </NavItem>
			  </Nav>
			</Navbar>
		);
	}

	onClick = () => {
		const cookies = new Cookies();
		cookies.remove('jwt');
		this.setState({redirectToLogin: true})
	}
}
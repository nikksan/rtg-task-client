import React from 'react';
import { Redirect } from 'react-router'
import Navigation from '../Nav'
import { Grid, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import EmployeesService from '../../../services/api/employee'

export default class DashboardEmployeesPage extends React.Component {
	state = {
		employees: [],
		redirect: false
	}

	componentWillMount(){
		this.getEmployees();
	}

	async getEmployees(){
		try{
			const employees = await EmployeesService.list();
			this.setState({employees})	
		}catch(e){
			console.log(e.message);
		}
	}

	render(){
		const { employees, redirect } = this.state;

		if(redirect){
			return <Redirect to={redirect}/>
		}

		return(
			<div>
				<Navigation/>
				<Grid bsClass="container">
					<Button onClick={this.onCreateNewEmployeeClick}>Create new employee</Button>
					{ this.renderEmployeesList(employees) }
				</Grid>
			</div>
		)
	}

	renderEmployeesList(employees){
		return (
			<ListGroup>
				{ employees.map( this.renderEmployee) }
			</ListGroup>
		)
	}

	renderEmployee = employee => {
		return (
			<ListGroupItem key={employee.id}>
				{employee.name}
				<Button onClick={() => this.onEditEmployeeClick(employee)}>Edit</Button>
				<Button onClick={() => this.onDeleteEmployeeClick(employee)}>Delete</Button>
			</ListGroupItem>
		)
	}

	onCreateNewEmployeeClick = () => {
		this.setState({redirect: '/admin/employees/new'})
	}

	onEditEmployeeClick = employee => {
		this.setState({redirect: '/admin/employees/' + employee.id})
	}
	
	onDeleteEmployeeClick = async employee => {
		if(!window.confirm('Are you sure?')){
			return;
		}
		
		try{
			await EmployeesService.delete(employee.id)
			this.getEmployees();
		}catch(e){
			console.log(e.message);
		}
	}

}
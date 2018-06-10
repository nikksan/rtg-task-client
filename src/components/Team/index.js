import React, { Component } from 'react';
import Header from '../Header'
import EmployeeService from '../../services/api/employee';

class TeamPage extends React.Component {
  state = {
  	employees: []
  }

  async componentWillMount(){
  	try{
  		const employees = await EmployeeService.list();
	  	this.setState({ employees });
  	}catch(e){
  		alert(e.message);
  	}
  }
  
  render(){
  	const { employees } = this.state;

  	return (
  		<div>
  			<Header/>
  			<h2>Team</h2>
  			{ this.renderBigEmployees(employees.filter(e => e.big)) }
  			{ this.renderSmallEmployees(employees.filter(e => !e.big)) }
  		</div>
  	)
  }

  renderBigEmployees(employees){
  	return <div>
  		{ employees.map(employee => this.renderBigEmployee(employee) ) }
  	</div>
  }

  renderSmallEmployees(employees){
  	return <div>
  		{ employees.map(employee => this.renderSmallEmployee(employee) ) }
  	</div>
  }

  renderBigEmployee(employee){
  	return (
      <div key={employee.id}>
        { employee.name }
        <img src={employee.picture}/>
      </div>
    );
  }

  renderSmallEmployee(employee){
  	return (
       <div key={employee.id}>
        { employee.name }
        <img src={employee.picture}/>
      </div>
    );
  }
}

export default TeamPage;
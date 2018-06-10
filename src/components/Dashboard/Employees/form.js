import React from 'react';
import { Redirect } from 'react-router'
import EmployeesService from '../../../services/api/employee'
import UploadService from '../../../services/api/upload';
import Navigation from '../Nav'
import Alerts from '../Alerts';
import { Grid, FieldGroup, FormGroup, ControlLabel, FormControl, Button, Checkbox } from 'react-bootstrap'
import ImageUpload from '../../ImageUpload';


export default class DashboardEmployeesFormPage extends React.Component {
	state = {
		employee: {
			id: null,
			name: '',
			picture: '',
			big: false
		},
		alerts: {
			error: '',
			success: ''
		},
		preview: '',
		file: null,
		redirectToEmployees: false
	}

	async componentWillMount(){
		const { params } = this.props.match;
		
		if(params.id){
			try{
				const employee = await EmployeesService.get(params.id);
				this.setState({employee: employee, preview: employee.picture});
			}catch(e){
				// this.setError(e.message)
				this.setState({redirectToEmployees: true});
			}
		}
	}


	render(){
		const { employee, alerts, redirectToEmployees } = this.state;

		if(redirectToEmployees){
			return <Redirect to="/admin/employees"/>
		}

		return(
			<div>
				<Navigation/>
				<Grid bsClass="container">
					{ this.renderEmployeeForm(employee) }
					{ this.renderFormAlerts(alerts) }
				</Grid>
			</div>
		);
	}

	renderEmployeeForm(employee){
		const { preview } = this.state;

		return (
			<form onSubmit={this.onSubmit}>
				<FormGroup>
					<ControlLabel>Title</ControlLabel>
					<FormControl
						name="name"
					    type="text"
					    value={employee.name}
					    placeholder="Enter title"
					    onChange={this.onInputChange}
					/>
					<ControlLabel>Big</ControlLabel>
					 <Checkbox
			          name="big"
			          checked={employee.big}
			          onChange={this.onCheckboxChange} />
			    	<ImageUpload
			    		onFileChanged={this.onFileChanged}
			    		preview={preview}
			    	/>
			    </FormGroup>

			    <Button type="submit">Save</Button>
		    </form>
		);
	}

	onFileChanged = file => {
		if(!file){
			return;
		}

		this.setState({file: file});

		// Preview the file
		let reader = new FileReader();
		reader.onloadend = () => {
	    	this.setState({ preview: reader.result });
	    }
		reader.readAsDataURL(file)    	
    }

	onInputChange = e => {
		let { employee } = this.state;
		employee[e.currentTarget.name] = e.currentTarget.value;
		this.setState({employee});
	}

	onCheckboxChange = e => {
		let { employee } = this.state;
		employee[e.currentTarget.name] = e.currentTarget.checked;
		this.setState({employee});
	}

	onSubmit = async e => {
		e.preventDefault();
		// way too lazy for client side validation ..
		let { employee, file } = this.state;

		try{
			// Save the image if any..
			if(file){
				let data = await UploadService.image(file)
				employee.picture = data.image;
			}

			let employeeObj = {
				name: employee.name,
				picture: employee.picture,
				big: employee.big
			}

			if(employee.id){
				await EmployeesService.update(employee.id, employeeObj);
			}else{
				await EmployeesService.create(employeeObj);
			}
			this.setSuccess('Congratz! Employee was saved!');
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
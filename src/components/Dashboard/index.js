import React from 'react';
import Navigation from './Nav'
import { Grid } from 'react-bootstrap'

export default class DashboardPage extends React.Component {

	render(){
		return(
			<div>
				<Navigation/>
				<Grid bsClass="container">
					Dashboard(Nothing to do here..)
				</Grid>
			</div>
		)
	}

}
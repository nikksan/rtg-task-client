import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Public pages
import HomePage from './components/Home/index.js';
import TeamPage from './components/Team/index.js';
import CareersPage from './components/Careers/index.js';
import LoginPage from './components/Login';

// Protected pages
import DashboardPage from './components/Dashboard';
import DashboardPagesPage from './components/Dashboard/Pages'
import DashboardPagesFormPage from './components/Dashboard/Pages/form'
import DashboardOpeningsPage from './components/Dashboard/Openings'
import DashboardOpeningsFormPage from './components/Dashboard/Openings/form'
import DashboardEmployeesPage from './components/Dashboard/Employees'
import DashboardEmployeesFormPage from './components/Dashboard/Employees/form'

// Private Route
import PrivateRoute from './helpers/PrivateRoute';

export default () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={HomePage}></Route>
				<Route path="/team" exact component={TeamPage}></Route>
				<Route path="/careers" exact component={CareersPage}></Route>
				<Route path="/login" exact component={LoginPage}></Route>

				<PrivateRoute path="/admin" exact component={DashboardPage}></PrivateRoute>
				
				<PrivateRoute path="/admin/pages" exact component={DashboardPagesPage}></PrivateRoute>
				<PrivateRoute path="/admin/pages/new" exact component={DashboardPagesFormPage}></PrivateRoute>
				<PrivateRoute path="/admin/pages/:id" exact component={DashboardPagesFormPage}></PrivateRoute>

				<PrivateRoute path="/admin/openings" exact component={DashboardOpeningsPage}></PrivateRoute>
				<PrivateRoute path="/admin/openings/new" exact component={DashboardOpeningsFormPage}></PrivateRoute>
				<PrivateRoute path="/admin/openings/:id" exact component={DashboardOpeningsFormPage}></PrivateRoute>

				<PrivateRoute path="/admin/employees" exact component={DashboardEmployeesPage}></PrivateRoute>
				<PrivateRoute path="/admin/employees/new" exact component={DashboardEmployeesFormPage}></PrivateRoute>
				<PrivateRoute path="/admin/employees/:id" exact component={DashboardEmployeesFormPage}></PrivateRoute>
			</Switch> 
		</BrowserRouter>
	);
}



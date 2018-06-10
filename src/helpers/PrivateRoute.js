import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthService from '../services/api/auth';

export default class PrivateRoute extends React.Component {
    state = {
      isAuthenticated: null
    }

    async componentDidMount(){
      try{
      	const data = await AuthService.auth();
        this.setState({isAuthenticated: true});
      }catch(e){
      	this.setState({isAuthenticated: false});
      }
    }

    render() {
    	const { isAuthenticated, user } = this.state;

      if(isAuthenticated === null){
        return null;
      }

      
    	return isAuthenticated ? 
          <Route path={this.props.path} component={this.props.component}/> :
          <Redirect to={{pathname: '/login', state: { from: this.props.location }}} /> 
    }
}
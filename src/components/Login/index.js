import React, { Component } from 'react';
import { Redirect } from 'react-router';

import Cookies from 'universal-cookie';
import AuthService from '../../services/api/auth';
import { 
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Alert
} from 'react-bootstrap';

import CenteredView from '../../helpers/CenteredView';

export default class LoginPage extends React.Component {
  state = {
    redirectToDashboard: false,
    error: '',
    credentials: {
      username: '',
      password: ''
    }
  }

  onSubmit = async e => {
    e.preventDefault();

    this.setState({error: ''});

    const { credentials } = this.state;

    if(!credentials.username){
      return this.setState({error: 'Username is required!'})
    }

    if(!credentials.password){
      return this.setState({error: 'Password is required!'})
    }

    try{
      const result = await AuthService.login(credentials);
      const cookies = new Cookies();
      cookies.set('jwt', result.token, { path: '/' });
      this.setState({ redirectToDashboard: true })
    }catch(e){
      this.setState({error: e.message})
    }
  }

  
  onChange = e => {
    let { credentials } = this.state;
    credentials[e.currentTarget.name] = e.currentTarget.value;
    
    this.setState({
      credentials: credentials
    })
  }
  

  render(){
    const { error, redirectToDashboard } = this.state;

    if(redirectToDashboard){
      return <Redirect to="/admin"/>;
    }

    return (
      <CenteredView>
        <form onSubmit={this.onSubmit}>
          <FormGroup>
             <ControlLabel>Username</ControlLabel>
             <FormControl 
                type="text"
                name="username"
                placeholder="enter username" 
                onChange={this.onChange}
              />
          </FormGroup>
          <FormGroup>
             <ControlLabel>Password</ControlLabel>
             <FormControl 
                type="password"
                name="password"
                placeholder="enter password" 
                onChange={this.onChange}
              />
          </FormGroup>
          <Button type="submit">Login</Button>
          { error && <Alert bsStyle="danger">{error}</Alert> }
        </form>
      </CenteredView>  
    )
  }

}

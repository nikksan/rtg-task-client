import React, { Component } from 'react';
import Header from '../Header'
import PageService from '../../services/api/page';
import AuthService from '../../services/api/auth';

const PAGE_ID = 1;

class HomePage extends React.Component {
  state = {
  	content: '',
  	title: ''
  }

  async componentWillMount(){
  	try{
  		const page = await PageService.get( PAGE_ID );
	  	this.setState(page);
  	}catch(e){
  		alert(e.message);
  	}
  }
  
  render(){
  	const { content, title } = this.state;
    
  	return (
    		<section>
    			<Header/>
    			<h2>{title}</h2>
    			{content}
          <img src="images/globe.png"/>
    		</section>
  	)
  }
}

export default HomePage;
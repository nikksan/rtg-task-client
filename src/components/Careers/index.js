import React, { Component } from 'react';
import Header from '../Header'
import OpeningService from '../../services/api/opening';

class CareersPage extends React.Component {
  state = {
  	openings: [],
    description: ''
  }

  async componentWillMount(){
  	try{
  		const openings = await OpeningService.list();
	  	this.setState({
	  		openings: openings
	  	});
  	}catch(e){
  		alert(e.message);
  	}
  }

  render(){
  	const { openings, description } = this.state;

  	return (
  		<div>
  			<Header/>
  			<h2>Careers</h2>
  			{ this.renderOpenings(openings) }
  			{ this.renderDescription(description) }
  		</div>
  	);
  }

  renderOpenings(openings){
  	return (
  		<div>{ openings.map(o => this.renderOpening(o)) }</div>
  	);
  }

  renderOpening(opening){
  	return (
  		<div 
  			key={opening.id}
  			className={opening.selected ? 'selected' : ''} 
  			onClick={() => this.onOpeningClick(opening)} 
  		>{opening.title}</div>
  	);
  }

  onOpeningClick(opening){
  	const openings = this.state.openings.map( o => {
  		o.selected = (o === opening);
  		return o;
  	});

  	this.setState({ openings, description: opening.description });
  }

  renderDescription(description){
    return (
  		<div>{description}</div>
  	)
  }
}

export default CareersPage;
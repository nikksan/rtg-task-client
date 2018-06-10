import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render(){
  	return (
	  	<nav className="fixed-top navbar">
	      <Link className="header-link home" to={'/'}>ACME Ltd.</Link>
	  	  <Link className="header-link" to={'/team'}>Team</Link>
	  	  <Link className="header-link" to={'/careers'}>Careers</Link>
	    </nav>
  	)
  }
}

export default Header;
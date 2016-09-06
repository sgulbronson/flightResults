import React, { Component } from 'react';
import { Navbar} from 'react-bootstrap'

export class Header extends Component {
  render() {
    return (
	   <Navbar>
	    <Navbar.Header>
	      <Navbar.Brand>
	        <a href="#">Flight Results</a>
	      </Navbar.Brand>
	    </Navbar.Header>
	  </Navbar>
    );
  }
}
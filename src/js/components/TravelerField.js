import React, { Component } from 'react';
import { Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

export class TravelerField extends Component {
	constructor(){
		super();
	}

  render() {
    return (
    	<FormGroup controlId={this.props.id}>
        <Col componentClass={ControlLabel} sm={6}>
            {this.props.title}
        </Col>
        <Col sm={6}>
            <FormControl ref="inp" type="number" value={this.props.count} min="0" onChange={this.props.update}/>
        </Col>
    	</FormGroup>
    );
  }
}

TravelerField.PropTypes = {
	id: React.PropTypes.String,
	count: React.PropTypes.number,
	title: React.PropTypes.String,
	update: React.PropTypes.func.isRequired
}

TravelerField.DefaultProps = {
	id: '',
	count: 0,
	title: ''
} 
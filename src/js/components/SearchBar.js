import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { Navbar, Form, Col, FormGroup, FormControl, ControlLabel, Button, DropdownButton, ButtonToolbar, Overlay, Popover } from 'react-bootstrap'
var DatePicker = require("react-bootstrap-date-picker");
import { TravelerDropdown } from './TravelerDropdown.js'
import { fetchFlights } from '../actions'

export class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state ={
      origin: '',
      destination: '',
      dateOut: new Date().toISOString(),
      dateIn: new Date().toISOString(),
      adultCount: 1,
      infantInLapCount: 0,
      infantInSeatCount: 0,
      childCount: 0,
      seniorCount: 0,
      show: false,
    }
    console.log(this.props);
    this.update = this.update.bind(this);
  }

  handleClick(e){
      this.setState({ target: e.target, show: !this.state.show });
      console.log(this.state);
  };

  update(e){
    this.setState({
      adultCount: ReactDOM.findDOMNode(this.refs.travelerDropdown.refs.adultCount.refs.inp).value,
      infantInLapCount: ReactDOM.findDOMNode(this.refs.travelerDropdown.refs.infantInLapCount.refs.inp).value,
      infantInSeatCount: ReactDOM.findDOMNode(this.refs.travelerDropdown.refs.infantInSeatCount.refs.inp).value,
      childCount: ReactDOM.findDOMNode(this.refs.travelerDropdown.refs.childCount.refs.inp).value,
      seniorCount: ReactDOM.findDOMNode(this.refs.travelerDropdown.refs.seniorCount.refs.inp).value,
    });
    console.log(this.state)
  }

  setOriginAndDest(){
    this.setState({
      origin: ReactDOM.findDOMNode(this.refs.origin).value,
      destination: ReactDOM.findDOMNode(this.refs.destination).value
    })
  }

  handleChangeDeparture(date) {
    this.setState({
      dateOut: date
    });
    console.log(this.state);
  }

  handleChangeReturn(date) {
    this.setState({
      dateIn: date
    });
    console.log(this.state);
  }
 handleSubmitAgain() {
  console.log("Here");
    fetchFlights({
      origin: this.state.origin,
      destination: this.state.destination,
      dateOut: this.state.dateOut,
      dateIn: this.state.dateIn,
      adultCount: this.state.adultCount,
      infantInLapCount: this.state.infantInLapCount,
      infantInSeatCount: this.state.infantInSeatCount,
      childCount: this.state.childCount,
      seniorCount: this.state.seniorCount
    })
  }

  render() {
    return (
      <Form horizontal>
        <Col sm={6}>
            <FormGroup controlId="origin">
                <Col componentClass={ControlLabel} sm={3}>
                    Origin
                </Col>
                <Col sm={9}>
                    <FormControl ref="origin" type="text" placeholder="Airport Code" onChange={this.setOriginAndDest.bind(this)}/>
                </Col>
            </FormGroup>
        </Col>
        <Col sm={6}>
            <FormGroup controlId="destination">
                <Col componentClass={ControlLabel} sm={3}>
                    Destination
                </Col>
                <Col sm={9}>
                    <FormControl ref="destination" type="text" placeholder="Airport Code" onChange={this.setOriginAndDest.bind(this)}/>
                </Col>
            </FormGroup>
        </Col>
        <Col sm={6}>
            <FormGroup controlId="dateOut">
                <Col componentClass={ControlLabel} sm={3}>
                    Departure Date
                </Col>
                <Col sm={9}>
                    <DatePicker value={this.state.dateOut} onChange={this.handleChangeDeparture.bind(this)} />
                </Col>
            </FormGroup>
        </Col>
        <Col sm={6}>
            <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={3}>
                    Return Date
                </Col>
                <Col sm={9}>
                    <DatePicker value={this.state.dateIn} onChange={this.handleChangeReturn.bind(this)} />
                </Col>
            </FormGroup>
        </Col>
        <Col sm={6}>
          <Col sm={3}></Col>
          <Col sm={9}>
          <TravelerDropdown
            ref="travelerDropdown"
            update={this.update} 
            adultCount={this.state.adultCount}
            infantInLapCount={this.state.infantInLapCount}
            infantInSeatCount={this.state.infantInSeatCount}
            childCount={this.state.childCount}
            seniorCount={this.state.seniorCount} />
          </Col>
        </Col>
        <Col sm={6}>
        <FormGroup>
            <Col sm={3}></Col>
            <Col sm={9}>
                <Button block type="submit" onSubmit={this.handleSubmitAgain()}>
                    Find Flights
                </Button>
            </Col>
        </FormGroup>
        </Col>
      </Form>
    )
  }
}

SearchBar.PropTypes = {
  fetchFlights: React.PropTypes.any,
  //dispatch: React.PropTypes.any
}
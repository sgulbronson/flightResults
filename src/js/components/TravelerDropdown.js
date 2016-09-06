import React, { Component } from 'react';
import { TravelerField } from './TravelerField.js'
import { Button, ButtonToolbar, Overlay, Popover } from 'react-bootstrap'


export class TravelerDropdown extends Component {
	constructor(props){
    super(props);
    this.state ={
      show: false
    }
    console.log(this.props.update);
    this.handleClick = e => {
      this.setState({ target: e.target, show: !this.state.show });
    };

    this.handleClick = this.handleClick.bind(this);

  }

  render() {
    return (
    	<ButtonToolbar>
    		<Button block onClick={this.handleClick}>Travelers</Button>
    		<Overlay show={this.state.show} target={this.state.target} placement="bottom" container={this} containerPadding={20}>
        	<Popover id="popover-contained" title="Travelers">
        		<TravelerField ref="adultCount" id="adultCount" title="Adults" count={this.props.adultCount} update={this.props.update} />
        		<TravelerField ref="childCount" id="childCount" title="Children" count={this.props.childCount} update={this.props.update} />
        		<TravelerField ref="seniorCount" id="seniorCount" title="Seniors" count={this.props.seniorCount} update={this.props.update} />
        		<TravelerField ref="infantInSeatCount" id="infantInSeatCount" title="Infants in Seat" count={this.props.infantInSeatCount} update={this.props.update} />
        		<TravelerField ref="infantInLapCount" id="infantInLapCount" title="Infants in Lap" count={this.props.infantInLapCount} update={this.props.update} />
        	</Popover>
    		</Overlay>
			</ButtonToolbar>
    );
  }
}

TravelerDropdown.PropTypes = {
	    show: React.PropTypes.Bool,
      adultCount: React.PropTypes.Number,
      infantInLapCount: React.PropTypes.Number,
      infantInSeatCount: React.PropTypes.Number,
      childCount: React.PropTypes.Number,
      seniorCount: React.PropTypes.Number,
      update: React.PropTypes.func.isRequired
}

TravelerDropdown.DefaultProps = {
      show: false,
      adultCount: 1,
      infantInLapCount: 0,
      infantInSeatCount: 0,
      childCount: 0,
      seniorCount: 0,
} 
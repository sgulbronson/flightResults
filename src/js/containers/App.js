import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchFlights } from '../actions'
import { Header } from '../components/Header.js'
import { Footer } from '../components/Footer.js'
import { SearchBar } from '../components/SearchBar.js'

 export default class App extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    this.state ={
      selectedOutboundFlight: {},
      selectedInboundFlight: {},
    }
  }

  render() {
    return (
      <div>
      <Header />
      <SearchBar fetchFlights={fetchFlights}/>
      <Footer />
      </div>
    )
  }
}

App.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isInvalid: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  outboundFlights: PropTypes.array,
  inboundFlights: PropTypes.array,
}

App.defaultProps = {
  isFetching: false,
  isInvalid: false,
  lastUpdated: 0,
  outboundFlights: [],
  inboundFlights: []
}
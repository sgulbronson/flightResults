import fetch from 'isomorphic-fetch'

export const SELECT_OUTBOUND_FLIGHT = 'SELECT_OUTBOUND_FLIGHT'
export const SELECT_INBOUND_FLIGHT = 'SELECT_INBOUND_FLIGHT'
export const REMOVE_OUTBOUND_FLIGHT = 'REMOVE_OUTBOUND_FLIGHT'
export const REMOVE_INBOUND_FLIGHT = 'REMOVE_INBOUND_FLIGHT'
export const INVALIDATE_FLIGHTS = 'INVALIDATE_FLIGHTS'
export const REQUEST_FLIGHTS = 'REQUEST_FLIGHTS'
export const RECEIVE_FLIGHTS = 'RECEIVE_FLIGHTS'
export const REMOVE_FLIGHT = 'REMOVE_FLIGHT'


export function selectOutboundFlight(flightId) {
  return {
    type: SELECT_OUTBOUND_FLIGHT,
    flightId: flightId
  }
}

export function selectInboundFlight(flightId) {
  return {
    type: SELECT_INBOUND_FLIGHT,
    flightId: flightId
  }
}


export function removeOutboundFlight(flightId) {
  return {
    type: REMOVE_OUTBOUND_FLIGHT,
    flightId: flightId
  }
}

export function removeInboundFlight(flightId) {
  return {
    type: REMOVE_INBOUND_FLIGHT,
    flightId: flightId
  }
}

export function invalidateFlights() {
  return {
    type: INVALIDATE_FLIGHTS
  }
}

export function requestFlights() {
  return {
    type: REQUEST_FLIGHTS
  }
}

export function receiveFlights(json) {
  return {
    type: RECEIVE_FLIGHTS,
    flights: json.data,
    receivedAt: Date.now()
  }
}

export function fetchFlights(req) {
  console.log("IN the action!")
  return dispatch => {
    dispatch(requestFlights())

    return fetch(`$http://localhost:3000/api/flightsearch/?
      origin=${req.origin}&
      destination=${req.destination}&
      dateOut=${req.dateOut}&
      dateIn=${req.dateIn}&
      adultCount=${req.adultCount}&
      infantInLapCount=${req.infantInLapCount}&
      infantInSeatCount=${req.infantInSeatCount}&
      childCount=${req.childCount}&
      seniorCount=${req.seniorCount}`)
      .then(response => response.json())
      .then(json => dispatch(receiveFlights(json)))
  }
}
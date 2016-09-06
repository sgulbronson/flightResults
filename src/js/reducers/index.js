import { combineReducers } from 'redux'
import {
  SELECT_OUTBOUND_FLIGHT, SELECT_INBOUND_FLIGHT,
  REMOVE_OUTBOUND_FLIGHT, REMOVE_INBOUND_FLIGHT,
  INVALIDATE_FLIGHTS, REQUEST_FLIGHTS, RECEIVE_FLIGHTS
} from './../actions'


const initialState = {
  // information for loading/display
  isFetching: false,
  isInvalid: false,
  lastUpdated: 0,
  selectedOutboundFlight: {},
  selectedInboundFlight: {},

  // request information
  origin: '',
  destination: '',
  dateOut: '',
  dateIn: '',
  adultCount: 0,
  infantInLapCount: 0,
  infantInSeatCount: 0,
  childCount: 0,
  seniorCount: 0,

  // flight results
  outboundFlights: [],
  inboundFlights: []
}

function search(state = initialState, action) {
  switch (action.type) {
    case SELECT_OUTBOUND_FLIGHT:
      return Object.assign({}, state, {
        selectedOutboundFlight: _.find(state.outboundFlights, function(obj) { return obj.id == action.flightId }),
        inboundFlights: _.find(state.outboundFlights, function(obj) { return obj.id == action.flightId }).inbound
      })

    case SELECT_INBOUND_FLIGHT:
      return Object.assign({}, state, {
        selectedInboundFlight: _.find(state.inboundFlights, function(obj) { return obj.id == action.flightId })
      })

    case REMOVE_OUTBOUND_FLIGHT:
      return Object.assign({}, state, {
        selectedOutboundFlight: {},
        inboundFlights: []
      })

    case REMOVE_INBOUND_FLIGHT:
      return Object.assign({}, state, {
        selectedInboundFlight: {}
      })

    case INVALIDATE_FLIGHTS:
      return Object.assign({}, state, {
        isInvalid: true
      })

    case REQUEST_FLIGHTS:
      return Object.assign({}, state, {
        isInvalid: false,
        isFetching: true
      })

    case RECEIVE_FLIGHTS:
      return Object.assign({}, state, {
        isInvalid: false,
        isFetching: true,
        outboundFlights: action.flights,
        inboundFlights: [],
        lastUpdated: action.receivedAt,
        selectedOutboundFlight: {},
        selectedInboundFlight: {}
      })

    default:
      return state
  }
}
// setup for when there are additional reducers
const rootReducer = combineReducers({
  search
})

export default rootReducer
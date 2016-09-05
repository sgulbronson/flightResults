var formatFlights = module.exports = {
  createHashObj: function(arrayOfObj) {
    var hashObj = {};
    arrayOfObj.forEach(function(obj) {
      hashObj[obj.code] = obj.name;
    })
    return hashObj;
  },

  createPassengerObj: function(pricingArray) {
    var passengerObj = {};
    pricingArray.forEach(function(pricingObj) {
      for (var prop in pricingObj.passengers) {
        if (prop !== "kind") {
          passengerObj[prop] = pricingObj.passengers[prop];
        }
      }
    })
    return passengerObj;
  },

  calcPricePerSeat: function(passengerObj, totalPrice) {
    var totalSeats = 0;
    for (var prop in passengerObj) {
      if (prop !== "infantInLapCount") {
        totalSeats += passengerObj[prop];
      }
    }
    return totalPrice / totalSeats
  },

  formatSegments: function(arrayOfSegments, dict) {
    var resArray = []
    arrayOfSegments.forEach(function(segment) {
      segment.leg.forEach(function(leg) {
        segmentObj = {
          carrier: segment.flight.carrier,
          carrierName: dict.carrier[segment.flight.carrier],
          number: segment.flight.number,
          cabin: segment.cabin,
          connectionDuration: leg.connectionDuration,
          aircraft: dict.aircraft[leg.aircraft],
          arrivalTime: leg.arrivalTime,
          departureTime: leg.departureTime,
          destination: leg.destination,
          destinationName: dict.city[leg.destination],
          destinationAirport: dict.airport[leg.destination],
          duration: leg.duration,
          id: leg.id,
          origin: leg.origin,
          originName: dict.city[leg.origin],
          originAirport: dict.airport[leg.origin],
        };
        resArray.push(segmentObj);
      })
    })
    return resArray;
  },

  formatTrip: function(tripOption, tripType, dict) {
    var passengers = formatFlights.createPassengerObj(tripOption.pricing);
    var total = formatFlights.calcPricePerSeat(passengers, parseFloat(tripOption.saleTotal.substring(3)));
    
    var newTrip = {
      pricePerSeat: total,
      ItineraryId: tripOption.id,
      indSaleFareTotal: tripOption.pricing[0].saleFareTotal,
      indSaleTaxTotal: tripOption.pricing[0].saleTaxTotal,
      saleTotal: tripOption.saleTotal,
      passengers: passengers,
      tripType: tripType
    }

    newTrip.segments = (tripType === "outbound") ? 
      formatFlights.formatSegments(tripOption.slice[0].segment, dict) : 
      formatFlights.formatSegments(tripOption.slice[1].segment, dict)
    return newTrip;
  },

  formatResults: function(resultObject){
    // Split result object into data and list of trip options
    var data = resultObject.trips.data;
    var trips = resultObject.trips.tripOption;

    // For all data, create an object for easy lookup of keys
    var dict = {
      aircraft: formatFlights.createHashObj(data.aircraft),
      airport: formatFlights.createHashObj(data.airport),
      carrier: formatFlights.createHashObj(data.carrier),
      city: formatFlights.createHashObj(data.city)
    }

    // Setup object to be returned
    var tripsMapped = {};

    // Map all trip options to tripsMapped 
    trips.map(function(trip) {
      // note: slice is a property in the return object
      var isRoundTrip = trip.slice.length > 1;

      // Map to unique identifiers in order to deduplicate results
      var segment = trip.slice[0].segment.reduce(
        function(acc, curr) {
          return acc + curr.leg.reduce(
            function(acc2, curr2) {
              return acc2 + curr2.id;
            }, "")
        }, "");

      // format trips with outbound and corresponding inbound flights listed
      if (tripsMapped[segment] === undefined) {
        tripsMapped[segment] = { outbound: formatFlights.formatTrip(trip, "outbound", dict) }
      }
      if (isRoundTrip){
        if(!tripsMapped[segment].inbound){
          tripsMapped[segment].inbound = [formatFlights.formatTrip(trip, "inbound", dict)]
        } else {
          tripsMapped[segment].inbound.push(formatFlights.formatTrip(trip, "inbound", dict))
        }
      } 
    })
    return tripsMapped;
  },

  formatRequest: function(requestObj, solutions, refundable){
    var formattedRequest = {
      "request": {
        "slice": [],
        "passengers": {
          "adultCount": (requestObj.adultCount) ? parseInt(requestObj.adultCount) : 0,
          "infantInLapCount": (requestObj.infantInLapCount) ? parseInt(requestObj.infantInLapCount) : 0,
          "infantInSeatCount": (requestObj.infantInSeatCount) ? parseInt(requestObj.infantInSeatCount) : 0,
          "childCount": (requestObj.childCount) ? parseInt(requestObj.childCount) : 0,
          "seniorCount": (requestObj.seniorCount) ? parseInt(requestObj.seniorCount) : 0,
        },
        "solutions": solutions,
        "refundable": refundable
      }
    };

    // Add outbound flight
    formattedRequest.request.slice.push({
      "origin": requestObj.origin,
      "destination": requestObj.destination,
      "date": requestObj.dateOut
    })

    // Add inbound flight
    if(requestObj.dateIn != undefined){
      formattedRequest.request.slice.push({
        "origin": requestObj.destination,
        "destination": requestObj.origin,
        "date": requestObj.dateIn
      })
    }
    return formattedRequest;
  }
}
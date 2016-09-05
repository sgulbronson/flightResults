var request = require('request')
var formatResults = require('./helpers').formatResults
var formatRequest = require('./helpers').formatRequest
var QPXExpressApiKey = require('./../../apikeys').QPXExpressApiKey

/************************************************************/
//  QPX EXPRESS API QUERY
/************************************************************/

module.exports = {

  getFlightResults: function(jsonReq, callback) {

    var url ='https://www.googleapis.com/qpxExpress/v1/trips/search/?key=' + QPXExpressApiKey

    formattedJsonReq = formatRequest(jsonReq, 20, false);
    
    request({uri: url, method: 'POST', json: true, body: formattedJsonReq}, function (error, response, body) {
      if (error) {
        callback(error, null);
      } else {
        var res = formatResults(body)
        callback(null, res);
      }
    });
  }
}

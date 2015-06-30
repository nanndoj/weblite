var exports = module.exports = {}; 

/**
* Allowed HTTP Methods by protocol
*/
var allowedMethods = {
	"HTTP/1.0" : ["GET","HEAD","POST"],
	"HTTP/1.1" : ["GET","POST", "PUT", "DELETE", "OPTIONS"];
}

/**
 * This method is responsible for checking the http protocol and accepted methods.
 *
 * @param  {String} requestString containing a valid request string
 * @return {String}
 */
exports.checkProtocol = function(requetString, responseCallback) {

	// Get the first ocurrence of a new line character
	var requestDescriptor = requestString.substring(0, requestString.indexOf("\n"));

	// Split the request descriptor into string into single parts
	// Abd check if it is valid
	var descriptorParts = requestDescriptor.split(" ");

	// Check if the request descriptor is valid
	if(!descriptorParts.length === 3) {
	  // TODO: Throw error 400 (Bad Request)
	  return;
	}

	var protocol = descriptorParts[2]; // HTTP/1.0 or HTTP/1.1
	var allowedList = allowedMethods[protocol];
	// Check if the method is allowed
	var isAllowed = false;
	for(var i = 0; i < allowedList.length; i++) {
		if(allowedList[i] === descriptorParts[0]) {
			isAllowed = true;
		}
	}

	// Check if the request descriptor is valid
	if(!isAllowed) {
	  // TODO: Throw error 405 (Method not allowed)
	  return;
	}

	handleMethod(method, requestString, responseCallback);
};

var handleMethod = function(method, requestString, responseCallback) {
	switch(method) {
	    case 'GET':
	        handleGET(requestString, responseCallback);
	        break;
	    case 'POST':
	        break;
	    default:
	        return null;
	}
}

var handleGET = function(requestString, responseCallback) {
	responseCallback('HTTP/1.1 200 OK\nContent-Type: text/xml; charset=utf-8\nContent-Length: length\n\n<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><EnlightenResponse xmlns="http://clearforest.com/"><EnlightenResult>string</EnlightenResult></EnlightenResponse></soap:Body></soap:Envelope>');
}
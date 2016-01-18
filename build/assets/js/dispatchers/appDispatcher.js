var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

/**
* @method handleServerAction
* @this AppDispatcher
* @param {object} action
* @description Build a payload with the 'VIEW_ACTION' source and the provided action, and dispatch it.
*/
AppDispatcher.handleServerAction = function(action) {
	var payload = {
		source: 'SERVER_ACTION',
		action: action
	};
	this.dispatch(payload);
};

/**
* @method handleViewAction
* @this AppDispatcher
* @param {object} action
* @description Build a payload with the 'VIEW_ACTION' source and the provided action, and dispatch it.
*/
AppDispatcher.handleViewAction = function(action) {
	var payload = {
		source: 'VIEW_ACTION',
		action: action
	};
	this.dispatch(payload);
};

module.exports = AppDispatcher;

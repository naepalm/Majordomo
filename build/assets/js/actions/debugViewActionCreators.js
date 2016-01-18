var AppDispatcher = require("../dispatchers/appDispatcher");
var Commands = require("../commands/commands");
var Speech = require("../utils/speech");
var DebugStore = require("../stores/debugStore");

var debugViewActions = {
	setSSInfo: function(ssInfo) {
	    AppDispatcher.handleViewAction({
	      type: "SET_SS_INFO",
	      ssInfo: ssInfo
	    });
	}
};

module.exports = debugViewActions;

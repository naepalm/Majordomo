var AppDispatcher = require("../dispatchers/appDispatcher");

var speechServerActions = {
	spoke: function(phrase) {
		AppDispatcher.handleServerAction({
	      type: "AVATAR_SPOKE",
	      phrase: phrase
	    });
	}
};

module.exports = speechServerActions;

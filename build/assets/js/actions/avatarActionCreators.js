var AppDispatcher = require("../dispatchers/appDispatcher");

var AvatarActions = {
	setAvatar: function(avatar) {
	    AppDispatcher.handleViewAction({
	      type: "SET_AVATAR",
	      avatar: avatar 
	    });
	}
};

module.exports = AvatarActions;

var AppDispatcher = require("../dispatchers/appDispatcher");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var CHANGE_EVENT = "change";

var _ss = {};

var DebugStore = assign({}, EventEmitter.prototype, {
	emitChange: function() {
        setTimeout(function() {
			this.emit(CHANGE_EVENT);
		}.bind(this), 1);
	},
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	getAvatar: function() {
		return _avatar;
	},
	dispatchToken: AppDispatcher.register(function(payload) {
		var action = payload.action;
		switch(action.type) {
			case "SET_SS_INFO":
				if (action.avatar) {
					_avatar = action.avatar;
					DebugStore.emitChange();
				}
				break;
			default:
				// do nothing
		}
	})
});

module.exports = DebugStore;

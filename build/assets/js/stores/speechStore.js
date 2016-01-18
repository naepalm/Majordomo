var AppDispatcher = require("../dispatchers/appDispatcher");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var CHANGE_EVENT = "change";

var _lastCommand = {phrase:"", key:""};
var _lastStatement = "";
var _lastWildcard = "";
var _voice = false;

var SpeechStore = assign({}, EventEmitter.prototype, {
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
	getLastCommand: function() {
		return _lastCommand;
	},
	getLastStatement: function() {
		return _lastStatement;
	},
	getLastWildcard: function() {
		return _lastWildcard;
	},
	getVoice: function() {
		return _voice;
	},
	dispatchToken: AppDispatcher.register(function(payload) {
		var action = payload.action;
		switch(action.type) {
			case "AVATAR_SPOKE":
				if (action.phrase) {
					_lastStatement = action.phrase;
					SpeechStore.emitChange();
				}
				break;
			case "CLEAR_COMMAND":
				_lastCommand  = {phrase:"", key:""};
				_lastWildcard = "";
				// Deliberately do not call emitChange;
				break;
			case "COMMAND_RECEIVED":
				if (action.command) {
					_lastCommand = action.command;
					if (action.wildcard) {
						_lastWildcard = action.wildcard;
					}
					SpeechStore.emitChange();
				}
				break;
			case "SET_VOICE":
				if (action.voice) {
					_voice = action.voice;
					SpeechStore.emitChange();
				}
				break;
			default:
				// do nothing
		}
	})
});

module.exports = SpeechStore;

var AppDispatcher = require("../dispatchers/appDispatcher");
var Commands = require("../commands/commands");
var Speech = require("../utils/speech");
var AvatarStore = require("../stores/avatarStore");

var speechViewActions = {
	/**
	* @method clearCommand
	* @description Triggers the CLEAR_COMMAND action on the store, to clear out any command from its memory.
	*/
	clearCommand: function() {
		AppDispatcher.handleViewAction({
			type: "CLEAR_COMMAND"
		});
	},
	registerAllCommands: function() {
		var commands = Commands;
		var avatar = AvatarStore.getAvatar();
		if (commands && commands.length) {
			commands.forEach(function(command) {
				var phrase = command.phrase;
				if (avatar) {
					phrase = phrase.split("AVATAR_NAME").join(avatar.name);
				}
				Speech.addCommand(phrase, function(wildcard) {
					AppDispatcher.handleViewAction({
						type: "COMMAND_RECEIVED",
						command: command,
						wildcard: wildcard
					});
				});
			});
		}
	},
	spoke: function(phrase) {
		AppDispatcher.handleViewAction({
	      type: "AVATAR_SPOKE",
	      phrase: phrase
	    });
	},
	setVoice: function(voice) {
	    AppDispatcher.handleViewAction({
	      type: "SET_VOICE",
	      voice: voice
	    });
	}
};

module.exports = speechViewActions;

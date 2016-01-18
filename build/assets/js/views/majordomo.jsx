var React = require("react");
// Configs
var AvatarConfig = require("../configs/avatarConfig");
// Actions
var AvatarActions = require("../actions/avatarActionCreators");
var SpeechActions = require("../actions/speechViewActionCreators");
// Stores
var AvatarStore = require("../stores/avatarStore");
var SpeechStore = require("../stores/speechStore");
// Models
var Avatar = require("../models/avatar");
// Utils
var Obedience = require("../utils/obedience");
var Speech = require("../utils/speech");
// Other Components

var Majordomo = React.createClass({
	getInitialState: function() {
		return {
			avatar: false,
			lastCommand: {phrase: ""},
			lastStatement: "",
			lastWildcard: ""
		}
	},
	componentDidMount: function() {
		SpeechStore.addChangeListener(this.onSpeechStoreChange);
		Speech.init(this.createDefaultAvatar);
	},
	componentDidUpdate: function(prevProps, prevState) {
		if (prevState.avatar == false) {
			SpeechActions.setVoice(this.state.avatar.voice);
			Speech.speak("I'm listening");
		}
	},
	createDefaultAvatar: function(voices) {
		var avatar = new Avatar({});
		if (AvatarConfig) {
			avatar.name = AvatarConfig.name;
			avatar.voice.voice = voices[AvatarConfig.voiceIndex];
			avatar.voice.pitch = AvatarConfig.pitch;
		}
		this.setState({avatar: avatar});
		AvatarActions.setAvatar(avatar);
		SpeechActions.registerAllCommands();
	},
	onSpeechStoreChange: function() {
		var lastCommand = SpeechStore.getLastCommand();
		var lastStatement = SpeechStore.getLastStatement();
		var lastWildcard = SpeechStore.getLastWildcard();
		SpeechActions.clearCommand();
		var stateToChange = {
			lastStatement: lastStatement
		};
		if (lastCommand.key !== "") {
			Obedience.routeCommand(lastCommand.key, lastWildcard);
			stateToChange = {
				lastStatement: lastStatement,
				lastCommand: lastCommand,
				lastWildcard: lastWildcard
			};
		}
		this.setState(stateToChange);
    },
	render: function() {
		return (
			<div id="majordomo" className="container">
        		<h1>Majordomo</h1>
				<div>Last Command Heard: {this.state.lastCommand.phrase}</div>
				<div>{this.state.avatar.name} Last Said: {this.state.lastStatement}</div>
				<div>Wildcard: {this.state.lastWildcard}</div>
      		</div>
		);
	}
});

var container = document.querySelector("#react-container");
if (container != null) {
	React.render(<Majordomo />, container);
}

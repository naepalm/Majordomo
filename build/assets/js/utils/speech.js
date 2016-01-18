// Stores
var SpeechStore = require("../stores/speechStore");
// Actions
var SpeechServerActions = require("../actions/speechServerActionCreators");

var Speech = {
    addCommand: function(commandPhrase, callback) {
        var commands = [
            {
                phrase: commandPhrase,
                callback: function(wildcard) {
                    callback(wildcard);
                }
            }
        ];
        annyang.addCommandsWithDynamicText(commands);
    },
    /**
    * @method init
    * @description Helps sidestep issues with Chrome failing to load voice array on first call.
    */
    init: function(callback, shouldShowLog) {
        if (Speech.isSupported()) {
            var _voices = window.speechSynthesis.getVoices();
            window.speechSynthesis.onvoiceschanged = function() {
              _voices = window.speechSynthesis.getVoices();
              window.speechSynthesis.onvoiceschanged = null;
              annyang.start();
              if (shouldShowLog) {
                  Speech.logPhrases();
              }
              if (callback) {
                  callback(_voices);
              }
            };
        }
    },
    /**
    * @method isSupported
    * @returns {bool}
    */
    isSupported: function() {
        var isSupported = false;
        if ("speechSynthesis" in window) {
            isSupported = true;
		}
        return isSupported;
    },
    logPhrases: function() {
        annyang.addCallback('resultNoMatch', function(phrases) {
            if (phrases && phrases.length) {
                phrases.forEach(function(phrase) {
                    console.info("I think you said: " + phrase);
                });
            }
        });
        annyang.addCallback('resultsMatch', function(phrase) {
            console.info('You gave me the command: ' + phrase);
        })
    },
    speak: function(phrase, voice, shouldOverrideLanguage) {
        if (!voice) {
            voice = SpeechStore.getVoice().voice;
        }
        if (typeof phrase == "string") {
            annyang.pause();
            speechSynthesis.cancel();
            var msg = new SpeechSynthesisUtterance(phrase);
            msg.onend = function() {
                annyang.resume();
            };
            if (voice) {
                msg.voice = voice;
            }
            var voiceSettings = SpeechStore.getVoice();
            msg.volume = voiceSettings.volume;
            msg.rate = voiceSettings.rate;
            msg.pitch = voiceSettings.pitch;
            if (shouldOverrideLanguage) {
                msg.lang = voiceSettings.lang;
            }
            window.speechSynthesis.speak(msg);
            SpeechServerActions.spoke(phrase);
        }
    }
};

module.exports = Speech;

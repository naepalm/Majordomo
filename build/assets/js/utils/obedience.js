var Games = require("../modules/games");
var Speech = require("./speech");
var TimeAndDate = require("../modules/timeAndDate");
var Obedience = {
    /**
    * @method routeCommand
    * @param {string} key
    * @param {string} wildcard
    * @description Hub for the Obedience functionality. Examines the key against a list, and acts on it if possible.
    */
    routeCommand: function(key, wildcard) {
        switch (key) {
            case "DRAW_A_CARD":
                Games.drawACard();
                break;
            case "SAY_HELLO_BACK":
                Speech.speak("Hello Janae!");
                break;
            case "TELL_THE_DAY":
                TimeAndDate.sayDay();
                break;
            case "TELL_THE_TIME":
                TimeAndDate.sayTimeOfDay();
                break;
            default:
                phrase = key.split("_").join(" ");
                phrase = phrase.toLowerCase();
                Speech.speak(phrase);
                break;
        }
    }
};

module.exports = Obedience;

var Speech = require("../utils/speech");

var TimeAndDate = {
    sayTimeOfDay: function() {
        var phrase = "The time is ";
        var date = new Date();
        var hours = date.getHours();
        var timeOfDay = " in the morning";
        if (hours > 11) {
            timeOfDay = " in the afternoon";
        }
        if (hours > 16) {
            timeOfDay = " in the evening";
        }
        if (hours > 12) { hours = hours - 12;};
        phrase += hours + " ";
        var minutes = date.getMinutes();
        if (minutes < 10) {
            phrase +="oh ";
        }
        phrase += minutes + " " + timeOfDay;
        Speech.speak(phrase);
    },
    sayDay: function() {
        var phrase = "Today is";
        var date = new Date();
        switch (date.getDay()) {
            case 0:
                phrase += " Sunday";
                break;
            case 1:
                phrase += " Monday";
                break;
            case 2:
                phrase += " Tuesday";
                break;
            case 3:
                phrase += " Wednesday";
                break;
            case 4:
                phrase += " Thursday";
                break;
            case 5:
                phrase += " Friday";
                break;
            case 6:
                phrase += " Saturday";
                break;
        }
        switch(date.getMonth()) {
            case 0:
                phrase +=" January";
                break;
            case 1:
                phrase +=" February";
                break;
            case 2:
                phrase += " March";
                break;
            case 3:
                phrase += " April";
                break;
            case 4:
                phrase += " May";
                break;
            case 5:
                phrase += " June";
                break;
            case 6:
                phrase += " July";
                break;
            case 7:
                phrase += " August";
                break;
            case 8:
                phrase += " September";
                break;
            case 9:
                phrase += " October";
                break;
            case 10:
                phrase += " November";
                break;
            case 11:
                phrase += " December";
                break;
        }
        var day = date.getDate();
        phrase += " " + day;
        switch(Math.floor(day / (Math.pow(10, 0)) % 10)) {
            case 1:
                addOn = "st";
                break;
            case 2:
                addOn = "nd";
                break;
            case 3:
                addOn = "rd";
                break;
            default:
                addOn = "th";
                break;
        }
        if (day > 10 && day < 14) {
            addOn = "th";
        }
        phrase += addOn;
        Speech.speak(phrase);
    }
};

module.exports = TimeAndDate;

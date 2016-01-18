var Voice = require("./voice");

var Avatar = function(data) {
  var self = this;
  self.imageUrl = "";
  self.name = "";
  self.voice = new Voice();
  if (data !== undefined) {
    if (data.imageUrl !== undefined) {
      self.imageUrl = data.imageUrl;
    }
    if (data.name !== undefined) {
      self.name = data.name;
    }
    if (data.voice !== undefined) {
      self.voice = data.voice;
    }
  }
};

module.exports = Avatar;

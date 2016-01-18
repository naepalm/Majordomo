var Voice = function(data) {
  var self = this;
  self.voice = false;
  self.volume = 1;
  self.rate = 1;
  self.pitch = 1;
  self.lang = "en-US";
  if (data !== undefined) {
    if (data.voice !== undefined) {
      self.voice = data.voice;
    }
    if (data.volume !== undefined) {
      self.volume = data.volume;
    }
    if (data.rate !== undefined) {
      self.rate = data.rate;
    }
    if (data.pitch !== undefined) {
      self.pitch = data.pitch;
    }
    if (data.lang !== undefined) {
      self.lang = data.lang;
    }
  }
};

module.exports = Voice;

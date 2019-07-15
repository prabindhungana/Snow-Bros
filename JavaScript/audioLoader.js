function AudioLoader() {
  that = this;
  this.audios = {};
  this.numberOfAudios = 0;
  this.numberOfLoadedAudios = 0;

  this.init = function() {
    this.loadAudio("gamestart", "./Audios/gamestart.mp3");
    this.loadAudio("gameover", "./Audios/end.mp3");
    this.loadAudio("startlevel", "./Audios/game.mp3");
    this.numberOfAudios = Object.keys(this.audios).length;
  };

  this.loadAudio = function(audioName, path) {
    var audio = new Audio();
    audio.src = path;
    audio.addEventListener("canplay", calculateLoadedAudio);
    this.audios[audioName] = audio;
    function calculateLoadedAudio() {
      that.numberOfLoadedAudios++;
    }
  };

  this.hasAllAudiosLoaded = function() {
    if (this.numberOfLoadedAudios == this.numberOfAudios) return true;
    else return false;
  };
}

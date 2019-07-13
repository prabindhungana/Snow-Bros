function ImageLoader() {
    this.images = {};
    this.numberOfImages = 0;
    this.numberOfLoadedImages = 0;

    this.init();

  this.init = function() {
    this.loadImage('background', './Images/bg.png');
    this.loadImage('tiles', './Images/background.png')
    this.numberOfImages = Object.keys(this.images).length;
  }

  loadImage(identifier, source) {
    var that = this;
    var image = new Image();
    image.src = source;
    image.onload = function()
    {
      that.numberOfLoadedImages++;
    }
    this.images[identifier] = image;
  }

  // hasAllImagesLoaded() {
  //   return this.numberOfLoadedImages == this.numberOfImages ? true : false;
  // }
}

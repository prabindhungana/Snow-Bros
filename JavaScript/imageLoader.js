function ImageLoader() {
    this.images = {};
    this.numberOfImages = 0;
    this.numberOfLoadedImages = 0;


    this.init = function() {
    this.loadImage('background', './Images/bg.png');
    this.loadImage('tiles','./Images/background.png');
    this.loadImage('health','./Images/Heart.png');
    this.numberOfImages = Object.keys(this.images).length;
  }

  this.loadImage = function(imageName, path) {
    var that = this;
    var image = new Image();
    image.src = path;
    image.onload = function()
    {
      that.numberOfLoadedImages++;
    }
    this.images[imageName] = image;
  }

  this.hasAllImagesLoaded = function() {
    if(this.numberOfLoadedImages == this.numberOfImages)
        return true;
    else
        return false;
  }
}

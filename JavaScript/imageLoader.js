function ImageLoader() {
  that1 = this;
  this.images = {};
  this.numberOfImages = 0;
  this.numberOfLoadedImages = 0;

  this.init = function() {
    this.loadImage("background", "./Images/bg.png");
    this.loadImage("tiles", "./Images/background.png");
    this.loadImage("health", "./Images/Heart.png");
    this.loadImage("character", "./Images/sbd1.png");
    this.loadImage("rightbullet", "./Images/bulletone_right2.png");
    this.loadImage("leftbullet", "./Images/bulletone_left2.png");
    this.loadImage("enemychar", "./Images/sb2.gif")
    this.numberOfImages = Object.keys(this.images).length;
  };

  this.loadImage = function(imageName, path) {
    var image = new Image();
    image.src = path;
    image.onload = function() {
      that1.numberOfLoadedImages++;
    };
    this.images[imageName] = image;
  };

  this.hasAllImagesLoaded = function() {
    if (this.numberOfLoadedImages == this.numberOfImages) return true;
    else return false;
  };
}

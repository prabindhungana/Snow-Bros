function Viewport  {
    this.x;
    this.y ;
    this.width ;
    this.height ;
    this.setfunction= function(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
   this.update = function (){
    
   this.y--;
   }
   
   var minX = Math.floor(viewport.x / 48);
     var maxX = Math.ceil((viewport.x + viewport.width) / 48);
     var minY = Math.floor(viewport.y / 48);
    var maxY = Math.ceil((viewport.y + viewport.height) / 48);





    
   for (var i = minY; i < maxY; i++) {
   
      for (var j = minX; j < maxX; j++) {
   
        var value = tileset[i * 18 + j];
   
        tileX = 48 * j - viewport.x;
        tileY = 48 * i - viewport.y;
   
        ctx.drawImage(img, value * 16, 0, 16, 16, tileX, tileY, 48, 48);
   }
}
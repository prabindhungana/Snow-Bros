function SnowBros()
{
this.tileW = 50;
this.tileH = 50;
this.mapW = 20;
this.mapH = 12;

this.tiles = new Image();
this.tiles.src = './Images/background.png';

this.background = new Image();
this.background.src = './Images/bg.png';


this.gameMap = [
    4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
    4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
    4, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 3,
    4, 0, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 0, 3,
    4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
    1, 2, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 1, 2,
    4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
    4, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 3,
    4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
    1, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 2, 0, 0, 0, 2, 1, 2, 1, 2,
    4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
    1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2
];

window.onload = function()
{
    game.insertBackground();
    game.createMap();
}
this.insertBackground = function()
{
    ctx.drawImage(this.background,0,0,1920,1200,0,0,canvas.width,canvas.height);
}

this.createMap = function() {
    for (var y = 0; y < this.mapH; y++) {
        for (var x = 0; x < this.mapW; x++) {
            switch (this.gameMap[((y * this.mapW) + x)]) {
                case 1:
                    ctx.drawImage(this.tiles, 0, 0, 27, 48, x * this.tileW, y * this.tileH, this.tileW, this.tileH);
                    break;
                case 2:
                    ctx.drawImage(this.tiles, 26, 0, 27, 48, x * this.tileW, y * this.tileH, this.tileW, this.tileH);
                    break;
                case 3:
                    ctx.drawImage(this.tiles, 81, 0, 27, 48, x * this.tileW, y * this.tileH, this.tileW, this.tileH);
                    break;
                case 4:
                    ctx.drawImage(this.tiles, 54, 0, 27, 48, x * this.tileW, y * this.tileH, this.tileW, this.tileH);
                    break;
            }
        }
    }
}
}
function SnowBros()
{

audioLoader.audios['gamestart'].pause();
audioLoader.audios['gamestart'].currentTime = 0;

audioLoader.audios['startlevel'].play();

this.noOfEnemies = 5;

this.bullets = [];
this.enemies = [];
this.players = [];
this.EnemyBullets = [];

this.tileW = 50;
this.tileH = 50;
this.mapW = 20;
this.mapH = 12;
this.paused = false;
this.complete = false;
this.gameoverCounter =0;
this.gamecompleteCounter =0;
this.levelFlag = false;
this.keyPressed = false;
this.keyPressedCounter = 0;
this.levelDelay =0;
this.currentLevel = '1';

this.character = new Player(650,500,37,39,38,32);
this.players.push(this.character);

this.enemyCreator = function()
{
for(var i=0;i<this.noOfEnemies;i++)
{
var enemy = new Enemy(getRandomNumber(18,1)*this.tileW,-this.tileH,enemyData.redEnemy);
this.enemies.push(enemy);
}
}

this.enemyAnimator = function()
{
for(var i=0;i<this.noOfEnemies;i++)
{
this.enemies[i].createEnemies();
this.enemies[i].isAlive = true;
}
}

this.enemyCreator();
this.enemyAnimator();


this.allgameLevels =
{
    '1' : [
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
    ],

    '3' : [
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        1, 2, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        4, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        1, 2, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2,
        4, 0, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2 
],

    '2' : [
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        2, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 1, 2,
        2, 1, 2, 1, 2, 0, 0, 0, 2, 1, 2, 1, 0, 0, 0, 2, 1, 2, 1, 2,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        1, 2, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 1, 2,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        1, 2, 1, 2, 0, 0, 0, 2, 1, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 2,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        1, 2, 1, 2, 0, 0, 0, 2, 1, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 2,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2 
]
}

window.onload = function()
{
    game.insertBackground();
    game.createMap();
}
this.insertBackground = function()
{
    ctx.drawImage(imageLoader.images['background'],0,0,1920,1200,0,0,canvas.width,canvas.height);
}

this.createMap = function() {
    for (var y = 0; y < this.mapH; y++) {
        for (var x = 0; x < this.mapW; x++) {
            switch (this.allgameLevels[this.currentLevel][((y * this.mapW) + x)]) {
                case 1:
                    ctx.drawImage(imageLoader.images['tiles'], 0, 0, 27, 48, x * this.tileW, y * this.tileH, this.tileW, this.tileH);
                    break;
                case 2:
                    ctx.drawImage(imageLoader.images['tiles'], 26, 0, 27, 48, x * this.tileW, y * this.tileH, this.tileW, this.tileH)
                    break;
                case 3:
                    ctx.drawImage(imageLoader.images['tiles'], 81, 0, 27, 48, x * this.tileW, y * this.tileH, this.tileW, this.tileH);
                    break;
                case 4:
                    ctx.drawImage(imageLoader.images['tiles'], 54, 0, 27, 48, x * this.tileW, y * this.tileH, this.tileW, this.tileH);
                    break;
            }
        }
    }
}
}

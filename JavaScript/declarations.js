//canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bullets = [];
var enemies = [];
var players = [];
var EnemyBullets = [];


var enemyData = {
    'redEnemy': 
        {
        'health': 3,
        'bullets': false,
        'spriteWidth': 29,
        'spriteHeight': 32,
        'spritePosX': 120,
        'spritePosY': 0,
        'fallPosX' : 120,
        'fallPosY' : 32
        },
    'mainBoss':
        {
        'health': 5,
        'bullets': true,
        'spriteWidth':130,
        'spriteHeight': 68,
        'spritePosX': 8,
        'spritePosY': 657,
        'fallPosX' : 166,
        'fallPosY' : 153
        }
    }


var game = new SnowBros();
var character = new Player(650,500,37,39,38,32);
players.push(character);
// 

function enemyCreator()
{
for(var i=0;i<5;i++)
{
var enemy = new Enemy(Math.floor((Math.random() * 18) + 1)*50,-50,enemyData.redEnemy);
enemies.push(enemy);
}
}
function enemyAnimator()
{
for(var i=0;i<5;i++)
{
enemies[i].createEnemies();
enemies[i].isAlive = true;
}
}

new enemyCreator();
new enemyAnimator();
window.addEventListener("keydown", movePlayer);
window.addEventListener("keydown", pauseGame);
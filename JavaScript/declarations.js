//canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bullets = [];
var enemies = [];
var players = [];


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
    'greenEnemy':
        {
        'health': 5,
        'bullets': true,
        'spriteWidth': 23,
        'spriteHeight': 32,
        'spritePosX': 112,
        'spritePosY': 120,
        'fallPosX' : 166,
        'fallPosY' : 153
        }
    }


var game = new SnowBros();
var character = new Player(650,500,37,39,38,32);
players.push(character);
// var character = new Player(200,500,65,68,87,90);
// players.push(character);
for(var i=0;i<5;i++)
{
var enemy = new Enemy(Math.floor((Math.random() * 18) + 1)*50,-50,enemyData.redEnemy);
enemies.push(enemy);
enemies[i].createEnemies();
enemies[i].generateEnemies(i);
}

window.addEventListener("keydown", movePlayer);
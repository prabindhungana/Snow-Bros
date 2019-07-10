//canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bullets = [];
var enemies = [];


var game = new SnowBros();
var char = new Player(650,500);
for(var i=0;i<5;i++)
{
var enemy = new Enemy(Math.floor((Math.random() * 18) + 1)*50,-50);
enemies.push(enemy);
enemies[i].createEnemies();
}


window.addEventListener("keydown", movePlayer);
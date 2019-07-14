//canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.style.display = 'none';

var gameOver = document.getElementById('gameOver');
gameOver.style.display = 'none';

var gameComplete = document.getElementById('gameComplete');
gameComplete.style.display = 'none';

var requestanimationframe;

var game = null;

function newGame() 
{
    canvas.style.display = "block";
    
	var menu = document.getElementById('menu')
    menu.style.display = "none";

    game = new SnowBros();

    new loop();
	
}


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


var imageLoader = new ImageLoader();
imageLoader.init();


window.addEventListener("keydown", movePlayer);
window.addEventListener("keydown", pauseGame);
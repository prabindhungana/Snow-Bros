//canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.style.display = "none";

// get elements from dom
var loading = document.getElementById("loading");

var menu = document.getElementById("menu");
menu.style.display = "none";

var startButton = document.getElementById("startButton");
startButton.addEventListener("click", newGame);

var gameOver = document.getElementById("gameOver");
gameOver.style.display = "none";

var gameComplete = document.getElementById("gameComplete");
gameComplete.style.display = "none";

var requestanimationframe;

var game = null;

function newGame() {
  canvas.style.display = "block";
  menu.style.display = "none";
  game = new SnowBros();

  new loop();
}

var enemyData = {
  redEnemy: {
    health: 3,
    spriteWidth: 29,
    spriteHeight: 32,
    spritePosX: 120,
    spritePosY: 0,
    fallPosX: 120,
    fallPosY: 32
  }
};

var imageLoader = new ImageLoader();
imageLoader.init();

var audioLoader = new AudioLoader();
audioLoader.init();

var interval = setInterval(function() {
  if (audioLoader.hasAllAudiosLoaded() && imageLoader.hasAllImagesLoaded()) {
    loading.style.display = "none";
    menu.style.display = "block";
    audioLoader.audios["gamestart"].play();
    audioLoader.audios["gamestart"].loop = true;
    clearInterval(interval);
  } else {
    loading.style.display = "block";
    menu.style.display = 'none';
  }
}, 1000 / 60);

window.addEventListener("keydown", movePlayer);
window.addEventListener("keydown", pauseGame);
window.addEventListener("keyup", stopPlayer);

var firebaseConfig = {
  apiKey: "AIzaSyD2ryaXbl7Aox40RPu_1s6Qxn9riqRuxEk",
  authDomain: "snowbros-4236e.firebaseapp.com",
  databaseURL: "https://snowbros-4236e.firebaseio.com",
  projectId: "snowbros-4236e",
  storageBucket: "snowbros-4236e.appspot.com",
  messagingSenderId: "689290074102",
  appId: "1:689290074102:web:b6e1ea4a9de24ab8"
};

firebase.initializeApp(firebaseConfig);

var highscoreRef = firebase.database().ref('scores');

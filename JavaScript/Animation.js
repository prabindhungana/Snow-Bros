new loop();

function loop() {
  requestAnimationFrame(loop);
  ctx.imageSmoothingEnabled = false;
  clearCanvas();
  game.insertBackground();
  game.createMap();
  if (!char.falling && !char.jumping) {
    char.generateCharacter();
  }
  if(!char.jumping)
  {
  char.createGravity();
  }
  char.moveUp();
  updateBullet();
  moveEnemies();
  freezeEnemy();
  killEnemy();
  killPlayer();
  checkIfDead();
  checkEnemiesStatus();
}

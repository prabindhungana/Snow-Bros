function loop() {
  requestanimationframe = requestAnimationFrame(loop);
  ctx.imageSmoothingEnabled = false;
  clearCanvas();
  game.insertBackground();
  game.createMap();
  game.players.forEach(function(char, charIndex) {
    if (!char.falling && !char.jumping) {
      char.generateCharacter();
    }
    if (!char.jumping) {
      char.createGravity();
    }
    char.moveUp();
  });
  updateBullet();
  jumpEnemy();
  setEnemyGravity();
  if (game.currentLevel > 1) {
    game.enemies.forEach(function(enemy, enemyIndex) {
      createEnemyBullet(enemy);
    });
  }
  updateEnemyBullet();
  moveEnemies();
  freezeEnemy();
  killEnemy();
  killPlayer();
  checkHealth();
  checkEnemiesStatus();
  levelChanger();
  displayScore();
  // bulletCollision();
}

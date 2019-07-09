function movePlayer(event) {
  players.forEach(function(char,charIndex)
  {
    switch (event.keyCode) {
      case char.leftKey:
        if (!char.x <= 0 && !char.falling) {
          char.x -= 10;
          char.moveLeft();
        }
        break;
      case char.jumpKey:
          if(char.jumpCount==0 && !char.falling)
          {
          char.jumping=true;
          }
        break;
      case char.rightkey:
        if (char.x <= canvas.width - game.tileW && !char.falling) {
          char.x += 10;
          char.moveRight();
        }
        break;
        case char.shootKey:
          createBullet(char);
          break;
    }
  })
  }
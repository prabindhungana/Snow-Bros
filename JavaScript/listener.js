function movePlayer(event) {
    switch (event.keyCode) {
      case 37:
        if (!char.x <= 0 && !char.falling) {
          char.x -= 10;
          char.moveLeft();
        }
        break;
      case 38:
          if(char.jumpCount==0 && !char.falling)
          {
          char.jumping=true;
          }
        break;
      case 39:
        if (char.x <= canvas.width - game.tileW && !char.falling) {
          char.x += 10;
          char.moveRight();
        }
        break;
        case 32:
          createBullet();
          break;
    }
  }
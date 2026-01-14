function movePlayer(event) {
  game.players.forEach(function(char,charIndex)
  {
    if(!game.paused)
    {
    switch (event.keyCode) {
      case char.leftKey:
        char.movingLeft = true;
        break;
      case char.jumpKey:
          if(char.jumpCount==0 && !char.falling)
          {
          char.jumping=true;
          }
        break;
      case char.rightkey:
        char.movingRight = true;
        break;
        case char.shootKey:
          createBullet(char);
          break;
    }
    }
  })
  }

  function stopPlayer(event) {
    game.players.forEach(function(char) {
      switch (event.keyCode) {
        case char.leftKey:
          char.movingLeft = false;
          break;
        case char.rightkey:
          char.movingRight = false;
          break;
      }
    });
  }

  function pauseGame(event)
  {
    if(event.keyCode==80)
    {
      if(game.paused)
      {
        game.paused = false;
      }
      else{
        game.paused = true;
      }
    }
  }

# bubblebaby
Bubble Baby is a game where the player controls Bubbles (Powerpuff Girls) by guiding her through oncoming pipes whilst trying not to get hit. 

## MVP (DOM-CANVAS)
CANVAS. The MVP is a game where the player guides a ball through columns. 

## Backlog
```
Sprites
Background
Bobbing effect of bubble
Sound effects
Choose colour of bubble
```

## Data Structure
### main.js
```
buildDom();
buildSplash();
destroySplash();
buildGameScreen();
destroyGameScreen();
buildGameOverScreen();
destroyGameOverScreen();
```

### game.js
```
Game (){
  this.player;
  this.column;
  this.canvas;
  this.ctx;
  initialPlayerPosition;
  gameOver = false;
}

Game.prototype.startGame(){
}

Game.prototype.startLoop(){
  loop()
}

Game.prototype.updateAll(){
}

Game.prototype.clearAll(){
}

Game.prototype.drawAll(){
}
   
Game.prototype.finishGame(){
}

Game.prototype.checkCollision(){
}
```

### player.js
```
Player(){
  this.x;
  this.y;
  this.size;
  this.canvas;
  this.ctx;
  this.direction;
  this.initialPosition;
}

Player.prototype.update(){
}

Player.prototype.draw(){
}

Player.prototype.setDirection(){
}
```

### column.js
```
Column(){
  this.x;
  this.y;
  this.size;
  this.canvas;
  this.ctx;
  this.speed;
}

Column.prototype.update(){
}

Column.prototype.draw(){
}
```
## States and State Transitions
```
- splashScreen()
  - destroyGameOver(if)
  - buildSplash()
  - addEventListener(startGame)
  
  
- buildGameScreen()
  - destroySplash()
  - destroyGameOverScreen()
  - createNewGame()
  - game.start()
  
  
- gameOver()
  - destroyGame()
  - buildGameOverScreen()
  - addEventListener( if splashScreen, else startGame) 
  ```

  ## Task
  
  
  - Create repo in GitHub
  - Create files on VSC, use cheat sheet templates
  - Main - buildDOM( );
  - Main - buildSplash();
  - Main - destroySplash();
  - Main - buildGameScreen(); 
  - Main - destroyGameScreen(); 
  - Main - buildGameOverScreen();
  - Main - destroyGameOverScreen();
  - Game - 3 state transitions
  - Game - buildDom();
  - Game - function Start(); - loop
  - Game - finishGame();
  - Game - function Game();
  - Player - function Player();
  - Game - function Game(); (check player exists)
  - Player - function Player(); (movement)
  - Game - function Game(); (check player moves)
  - Columns - function Column ();
  - Game - function Game (); (check column exists)
  - Columns - function Column (); 
  - Game - function Game (); (check column moves)
  - Game - checkCollision(); 
  - Game - finishGame(); (test run)




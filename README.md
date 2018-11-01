# bubblebaby
Bubble Baby is a game where the player controls the bubble, attempting to guide it between oncoming tubes without hitting them.

MVP (DOM-CANVAS)
CANVAS. The MVP is a game where the player guides a ball through columns. 

Backlog
Sprites
Background
Bobbing effect of bubble
Sound effects
Choose colour of bubble

Data Structure
game.js
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


player.js
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

column.js
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

States and State Transitions
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
  
  Task

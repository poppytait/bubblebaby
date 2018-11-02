'use strict';

function Game(canvasElement) {
  this.player = null;
  this.enemies = [];
  this.canvasElement = canvasElement;
  this.gameIsOver = false;
  this.collision = false;
}

Game.prototype.start = function () {

  this.ctx = this.canvasElement.getContext('2d');
  this.handleKeyUp = function (event) {
    if (event.key === ' ') {
      console.log('jump');
      this.player.setDirection(-1);

      setTimeout(function() {
        this.player.setDirection(1);
      }.bind(this), 500)

    }
  }.bind(this)
  
  document.addEventListener('keyup', this.handleKeyUp);
  
  this.startLoop();

}

Game.prototype.startLoop = function () {
  this.player = new Player(this.canvasElement);
  this.column = new Column(this.canvasElement);
  


  var loop = function () {

    console.log('testing');

    this.updateAll();
    this.clearAll();
    this.drawAll();
    this.checkCollision();

    if (this.collision) {
      this.gameIsOver = true;
      this.finishGame();
    }

    if (!this.gameIsOver) {
      requestAnimationFrame(loop);
    }

  }.bind(this);

  loop();

}

Game.prototype.updateAll = function () {
  this.player.update();
  this.column.update();
}

Game.prototype.clearAll = function () {
  this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
}

Game.prototype.drawAll = function () {
  this.player.draw();
  this.column.draw();
}

//hi main, please close game screen
Game.prototype.saveGameOverCallback = function (callback) {
  //ok game, i will
  this.gameOverCallback = callback;
}

Game.prototype.finishGame = function () {
  this.gameOverCallback();
  this.gameIsOver = true;
}

Game.prototype.checkCollision = function () {
  this.collision = this.player.checkCollision();
}
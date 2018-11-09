'use strict';

function Game(canvasElement) {
  this.player = null;
  this.pipes = [];
  this.canvasElement = canvasElement;
  this.gameIsOver = false;
  this.collision = false;
  this.score = 0;
  this.frameFactor = 60;
  this.pipeSpeed = 10;
}


/*
var flush = new Audio('Powerpuff.mp3');
flush.loop = true; 
flush.play(); */


Game.prototype.start = function () {

  this.ctx = this.canvasElement.getContext('2d');

  this.handleKeyUp = function (event) {
    if (event.key === ' ') {
      this.player.jump();

    }
  }.bind(this)

  document.addEventListener('keyup', this.handleKeyUp);

  this.startLoop();
  

}

Game.prototype.startLoop = function () {
  this.player = new Player(this.canvasElement);


  var frames = 0;

  var loop = function () {

    frames++;
    if (frames % this.frameFactor === 0) {
      this.pipes.push(new Pipe(this.canvasElement, this.pipeSpeed));
      this.updateSpeed();
    }
    
    this.updateAll();
    this.clearAll();
    this.keepScore();
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
  for (var i = 0; i < this.pipes.length; i++) {
    this.pipes[i].update();
  }
}

Game.prototype.clearAll = function () {
  this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  this.pipes.forEach(function(pipe, index) {
    if(pipe.x < -pipe.width) {
      this.pipes.splice(index, 1)
    }
  }.bind(this))
}

Game.prototype.drawAll = function () {
  this.player.draw();
  for (var i = 0; i < this.pipes.length; i++) {
    this.pipes[i].draw();
  }
}

Game.prototype.updateSpeed = function() {
  // checkScore
  // if multiple of 5
  // decresing factor
  // increase speed of all pipes

  if (this.score % 5 === 0 && this.score > 0) {
    this.frameFactor = this.frameFactor - 5;
    this.pipeSpeed+=2
    this.pipes.forEach(function(pipe, index) {
      pipe.speed+=2
    }.bind(this))
  }
}

Game.prototype.saveGameOverCallback = function (callback) {
  this.gameOverCallback = callback;
}


Game.prototype.finishGame = function () {
  this.gameOverCallback(this.score);
  this.gameIsOver = true;
}

Game.prototype.checkCollision = function () {
  this.collision = this.player.hasCollidedWithCeilOrFloor();

  for (var i = 0; i < this.pipes.length; i++) {
    if (this.pipes[i].hasCollidedWithPlayer(this.player)) {
      this.collision = true;
    }
  };
};

Game.prototype.keepScore = function () {
  for (var i = 0; i < this.pipes.length; i++) {
    if (this.player.x > this.pipes[i].x && this.player.x < this.pipes[i].x + this.pipes[i].speed) {
      this.score++;
      this.updateScore(this.score);
    }
  }
}

Game.prototype.onPoints = function (callback) {
  this.updateScore = callback;
}
'use strict';

function Game(canvasElement) {
  this.player = null;
  this.pipes = [];
  this.canvasElement = canvasElement;
  this.gameIsOver = false;
  this.collision = false;
  this.score = 0; 
}

var score = this.score;

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
    if (frames % 80 === 0) {
      if (this.score < 3) {
        this.pipes.push(new Pipe(this.canvasElement, 5));
      } else if (this.score < 5) {
        this.pipes.forEach(function(item, index) {
          if(item.speed === 3) {
            this.pipes.splice(index,1);
          }
        }.bind(this))
        this.pipes.push(new Pipe(this.canvasElement, 10));
      }  else if (this.score < 10) {
        this.pipes.forEach(function(item, index) {
          if(item.speed === 6) {
            this.pipes.splice(index,1);
          }
        }.bind(this))
        this.pipes.push(new Pipe(this.canvasElement, 12));
      }
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
}

Game.prototype.drawAll = function () {
  this.player.draw();
  for (var i = 0; i < this.pipes.length; i++) {
      this.pipes[i].draw();
  }
}

Game.prototype.saveGameOverCallback = function (callback) {
  this.gameOverCallback = callback;
}

Game.prototype.finishGame = function () {
  this.gameOverCallback();
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

Game.prototype.keepScore = function() {
  for (var i = 0; i < this.pipes.length; i++) {
    if (this.player.x === this.pipes[i].x + this.pipes[i].width/2) {
      // = this.score ++ +1; 
      var score = this.score ++;
      //if (this.score = 3) {
        
     // }
      this.updateScore(score);
      
    } console.log(score);
  };
}

Game.prototype.onPoints = function (callback) {
  this.updateScore = callback;
}
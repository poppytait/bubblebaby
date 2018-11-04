'use strict';

function Game(canvasElement) {
  this.player = null;
  this.pipes = [];
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

      setTimeout(function () {
        this.player.setDirection(1);
      }.bind(this), 500)

    }
  }.bind(this)

  document.addEventListener('keyup', this.handleKeyUp);

  this.startLoop();

}

Game.prototype.startLoop = function () {
  this.player = new Player(this.canvasElement);
  this.pipe = new Pipe(this.canvasElement);
  this.pipes.push(new Pipe(this.canvasElement));

  var frames = 0;

  var loop = function () {

    frames++;
    if (frames % 80 === 0) {
      this.pipes.push(new Pipe(this.canvasElement));
    }

    console.log(frames);
    /* if (Math.random() > 0.97) {
      this.pipes.push(new Pipe(this.canvasElement));
    }
*/
    /*window.setInterval(function(){
      this.pipes.push(new Pipe(this.canvasElement));
    }.bind(this), 2000); */

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
  this.pipe.update();
}

Game.prototype.clearAll = function () {
  this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
}

Game.prototype.drawAll = function () {
  this.player.draw();
  //this.pipe.draw();

  this.pipes.forEach(function (pipe) {
    pipe.draw();
    pipe.update();
  });

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
  };
}
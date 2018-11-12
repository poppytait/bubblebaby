'use strict';

class Game {
  constructor (canvasElement) {
    this.player = null;
    this.pipes = [];
    this.canvasElement = canvasElement;
    this.gameIsOver = false;
    this.collision = false;
    this.score = 0;
    this.frameFactor = 60;
    this.pipeSpeed = 10;
  }

  start () {
    this.ctx = this.canvasElement.getContext('2d');

    this.handleKeyUp = function (event) {
      if (event.key === ' ') {
        this.player.jump();
      }
    }.bind(this);

    document.addEventListener('keyup', this.handleKeyUp);

    this.startLoop();
  }

  startLoop () {
    this.player = new Player(this.canvasElement);

    let frames = 0;

    const loop = function () {
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

  updateAll () {
    this.player.update();
    for (let i = 0; i < this.pipes.length; i++) {
      this.pipes[i].update();
    }
  }
  clearAll () {
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    this.pipes.forEach(function (pipe, index) {
      if (pipe.x < -pipe.width) {
        this.pipes.splice(index, 1);
      }
    }.bind(this));
  }

  drawAll () {
    this.player.draw();
    for (let i = 0; i < this.pipes.length; i++) {
      this.pipes[i].draw();
    }
  }

  updateSpeed () {
    if (this.score % 5 === 0 && this.score > 0) {
      this.frameFactor = this.frameFactor - 5;
      this.pipeSpeed += 2;
      this.pipes.forEach(function (pipe, index) {
        pipe.speed += 2;
      });
    }
  }

  saveGameOverCallback (callback) {
    this.gameOverCallback = callback;
  }

  finishGame () {
    this.gameOverCallback(this.score);
    this.gameIsOver = true;
  }

  checkCollision () {
    this.collision = this.player.hasCollidedWithCeilOrFloor();

    for (let i = 0; i < this.pipes.length; i++) {
      if (this.pipes[i].hasCollidedWithPlayer(this.player)) {
        this.collision = true;
      }
    };
  }

  keepScore () {
    for (let i = 0; i < this.pipes.length; i++) {
      if (this.player.x > this.pipes[i].x && this.player.x < this.pipes[i].x + this.pipes[i].speed) {
        this.score++;
        this.updateScore(this.score);
      }
    }
  }

  onPoints (callback) {
    this.updateScore = callback;
  }
}

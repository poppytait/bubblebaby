'use strict';

class Pipe {
  constructor (canvasElement, speed) {
    this.canvasElement = canvasElement;
    this.maxMinPipeHeight = 60;
    this.top = Math.floor(Math.random() * ((this.canvasElement.height / 2 - this.maxMinPipeHeight) - this.maxMinPipeHeight + 1)) + this.maxMinPipeHeight;
    this.bottom = Math.floor(Math.random() * (200 - this.maxMinPipeHeight + 1)) + this.maxMinPipeHeight;
    console.log(this.bottom);
    this.width = 60;
    this.x = this.canvasElement.width;
    this.ctx = canvasElement.getContext('2d');
    this.speed = speed;
  }

  draw () {
    const pipeBottom = document.getElementById('pipe-bottom');
    const pipeTop = document.getElementById('pipe-top');
    this.ctx.drawImage(pipeBottom, this.x, this.canvasElement.height - this.bottom, this.width, this.bottom);
    this.ctx.drawImage(pipeTop, this.x, 0, this.width, this.top);
  }

  update () {
    this.x -= this.speed;
  }

  hasCollidedWithPlayer (player) {
    if (player.y < this.top || player.y > this.canvasElement.height - this.bottom) {
      if (player.x > this.x && player.x < this.x + this.width) { return true; }
    }
    return false;
  }

  offscreen () {
    return this.x < -this.width;
  }
}

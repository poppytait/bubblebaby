'use strict';

class Player {
  constructor (canvasElement) {
    this.canvasElement = canvasElement;
    this.x = 100;
    this.y = this.canvasElement.height / 2;
    this.size = 90;
    this.ctx = canvasElement.getContext('2d');
    this.ySpeed = 3;
    this.direction = 1;
    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;
  }

  update () {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
  }

  jump () {
    this.velocity += this.lift;
  }

  draw () {
    const image = document.getElementById('source');
    this.ctx.drawImage(image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }
  hasCollidedWithCeilOrFloor () {
    let collision = null;
    if (this.y >= this.canvasElement.height - this.size / 2) {
      collision = true;
    } else {
      collision = false;
    }
    return collision;
  }
}

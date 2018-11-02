'use strict';

function Column(canvasElement) {
    this.canvasElement = canvasElement;
    this.x = 300;
    this.y = 280;
    this.ctx = this.canvasElement.getContext('2d');
    this.direction = 0;
    //this.size = 
}

Column.prototype.draw = function() {
    this.ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
    this.ctx.fillRect(this.x, this.y, 40, 200);
  }

Column.prototype.update = function() {
    this.x -= 3;
  }
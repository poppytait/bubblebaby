'use strict';

/*unction Column(canvasElement) {
    this.canvasElement = canvasElement;
    this.x = 300;
    this.y = 280;
    this.ctx = this.canvasElement.getContext('2d');
    this.direction = 0;
    //this.size = 
}

Column.prototype.draw = function() {
    this.ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
    this.ctx.fillRect(this.x, this.y, 40, 20 0);
  }

Column.prototype.update = function() {
    this.x -= 3;
  }
  */

 

  function Pipe (canvasElement) {

    
      this.canvasElement = canvasElement;
      this.top = Math.random(this.canvasElement.height/2) * 150;
      this.bottom = Math.random(this.canvasElement.height/2) * 150;
      this.width = 20;
      this.x = this.canvasElement.width;
      this.ctx = canvasElement.getContext('2d');
      this.speed = 3;
      

    Pipe.prototype.draw = function() {
        this.ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        this.ctx.fillRect(this.x, 0, this.width, this.top); 
        this.ctx.fillRect(this.x, this.canvasElement.height-this.bottom, this.width, this.bottom);
      }
  }

  Pipe.prototype.update = function() {
      this.x -= this.speed;
  }

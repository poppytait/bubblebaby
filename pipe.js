'use strict';

function Pipe(canvasElement) {

    this.canvasElement = canvasElement;
    this.top = Math.random(this.canvasElement.height / 2) * 150;
    this.bottom = Math.random(this.canvasElement.height / 2) * 150;
    this.width = 20;
    this.x = this.canvasElement.width;
    this.ctx = canvasElement.getContext('2d');
    this.speed = 3;
    

    Pipe.prototype.draw = function () {
        this.ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        this.ctx.fillRect(this.x, 0, this.width, this.top);
        this.ctx.fillRect(this.x, this.canvasElement.height - this.bottom, this.width, this.bottom);
    }

    Pipe.prototype.update = function () {
        this.x -= this.speed;
    }

    Pipe.prototype.hasCollidedWithPlayer = function (player) {
        if (player.y < this.top || player.y > this.canvasElement.height - this.bottom) {
            if (player.x > this.x && player.x < this.x + this.width)
                return true;
                
        }
    }
    return false;

    Pipe.prototype.offscreen = function () {
        return this.x < -this.width
    }

 
}

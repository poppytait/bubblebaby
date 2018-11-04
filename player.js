'use strict';

function Player(canvasElement) {
    this.canvasElement = canvasElement;
    this.x = 100;
    this.y = this.canvasElement.height / 2;
    this.size = 20;
    this.ctx = canvasElement.getContext('2d');
    this.ySpeed = 3;
    this.direction = 1

    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;
     
}
//MOVEMENT
Player.prototype.update = function(){
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
}

Player.prototype.jump = function(){
    this.velocity += this.lift;
    console.log('jumping');
}


Player.prototype.draw = function() {
    this.ctx.fillStyle = 'rgba(255, 0, 0, 0.6)';
    this.ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
}

Player.prototype.hasCollidedWithCeilOrFloor = function() {
    var collision;
    if (this.y >= this.canvasElement.height - this.size/2) {
        collision = true;
    } else {
        collision = false;
    }
    return collision;
}








'use strict';

function Player(canvasElement) {
    this.canvasElement = canvasElement;
    this.x = 100;
    this.y = this.canvasElement.height / 2;
    this.size = 20;
    this.ctx = canvasElement.getContext('2d');
    this.fallSpeed = 0;
    this.ySpeed = 3;
    this.direction = 1
     
}
//MOVEMENT
Player.prototype.update = function(){
    this.fallSpeed += 0.01;
    this.y += this.direction * this.ySpeed;
}

Player.prototype.setDirection = function(direction){
    this.direction = direction;
}

Player.prototype.setSpeed = function(speed){
    this.speed = speed;
}

Player.prototype.draw = function() {
    this.ctx.fillStyle = 'rgba(255, 0, 0, 0.6)';
    this.ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
}

Player.prototype.checkCollision = function() {
    var collision;
    if (this.y >= this.canvasElement.height - this.size/2) {
        collision = true;
    } else {
        collision = false;
    }
    return collision;
}






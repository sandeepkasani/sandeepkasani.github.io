// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/AaGK-fj-BAM

function zombie(x,y) {
  this.x = x;
  this.y = y;
  this.xspeed = random(-10, 10);
  this.yspeed = 20;
  this.gravity = 0.5;
  this.update = function(){
    this.x += this.xspeed;
    this.y -= this.yspeed;
    this.yspeed -= this.gravity;
  }
}

// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/AaGK-fj-BAM

function dot(x,y) {
  this.x = x;
  this.y = y;
  this.xspeed = 0;
  this.yspeed = 0;
  this.size = random(15,30);
  this.gravity = 0;
  this.rcolor = random(100,250);
  this.gcolor = random(100,250);
  this.bcolor = random(100,250);
  this.life = parseInt(random(100,150));

  this.update = function(){
    this.x += this.xspeed;
    this.y -= this.yspeed;
    this.yspeed -= this.gravity;
    this.life = this.life - 1;
    // this.size -= 0.02;
    if(this.y > height || this.y < 0){
      this.yspeed = this.yspeed*-1;
    }
    if(this.x > width || this.x < 0){
      this.xspeed = this.xspeed*-1;
    }
  }
}

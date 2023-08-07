// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/AaGK-fj-BAM

function dot(x,y) {
  this.x = x;
  this.y = y;
  this.xspeed = random(-2, 2);
  this.yspeed = random(9,10);
  this.size = random(5,10);
  this.gravity = 0.1;
  this.rcolor = random(50,70);
  this.gcolor = random(50,70);
  this.bcolor = random(50,70);
  this.life = parseInt(random(100,150));

  this.update = function(){
    this.x += this.xspeed;
    if(this.x < 0 || this.x > width){
      this.xspeed *= -1;
    }
    this.y -= this.yspeed;
    this.yspeed -= this.gravity;
    this.life = this.life - 1;
    //this.size -= 0.02;
    if(this.y > height){
      this.yspeed = this.yspeed*-0.3;
    }
  }
}

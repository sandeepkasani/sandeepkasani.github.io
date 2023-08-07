var dots = [];
var life;
var particles;
var target;
function setup() {
  createCanvas(600, 600);
  frameRate(60);
  background('rgb(20,20,20)');
  life = createSlider(10,600,300);
  particles = createSlider(100,1000,100);
  target = {
    x:-50,
    y:-50,
    radius: 50
  }
}

function mousePressed() {
  target.x = mouseX;
  target.y = mouseY;
  target.radius = 50;
  for(i=0; i<dots.length;i++){
    dots[i].rcolor = random(50,70);
  }
}

function draw() {
  noStroke();
  if(dots.length < particles.value()){
  // if(dots.length < 10){
    var z = new dot(width/2, height-50);
    z.life = life.value();
    dots.push(z)
  }
  background('rgba(20,20,20, 0.3)');
  if(target.radius > 0){
      var rad = target.radius + random(-5,5);
      fill(random(0,255),random(0,255),random(0,255));
      ellipse(target.x,target.y, rad, rad);
  }
  for(i=0; i<dots.length;i++){
    fill(dots[i].rcolor,dots[i].gcolor,dots[i].bcolor);
    ellipse(dots[i].x,dots[i].y, dots[i].size,dots[i].size);
    dots[i].update();
    if(Math.floor(dots[i].x) === target.x && Math.abs(dots[i].y-target.y) < 10 && target.radius > 0){
      target.radius = target.radius? target.radius - 0.5 : 0;
      dots[i].rcolor = random(0,255);
      dots[i].gcolor = random(0,255);
      dots[i].bcolor = random(0,255);
    }
    if(dots[i].life < 0){
      var z = new dot(dots[i].x,dots[i].y);
      z.life = life.value();
      z.rcolor = dots[i].rcolor > 70 ? dots[i].rcolor -60 : 40;
      if(target.x > width || target.x < 0 || !target.radius){
        z.xspeed = random(-1, 1);
      }
      else{
        z.xspeed = -1*(z.x - target.x)/100;
      }
      if(target.y > height || target.y < 0){
        z.yspeed = 10;
      }
      else{
        z.yspeed = Math.sqrt(2*z.gravity*(height-target.y));
      }
      dots.push(z)
      dots.splice(i,1);
    }

  }
}





function keyPressed() {
  if (keyCode === UP_ARROW) {
    // s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    // s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    // s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    // s.dir(-1, 0);
  }
}

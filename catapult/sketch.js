var dots = [];
var life;
var particles;
var oX;
var oY;
var released = true;
var img;

function setup() {
  createCanvas(600, 600);
  frameRate(60);
  background('rgb(20,20,20)');
  life = createSlider(10,600,100);
  particles = createSlider(100,1000,100);
  oX = width/2;
  oY = height;
}

function preload() {
  img = loadImage("green1.png");
}

function mousePressed() {
  var z = new dot(mouseX, mouseY);
  if(mouseX < width){
    oX = mouseX;
    oY = mouseY;
  }
  z.life = life.value();
  dots[dots.length] = z;
  released = false;
}

function mouseDragged() {
  dots[dots.length-1].x= mouseX;
  dots[dots.length-1].y=mouseY;
}

function mouseReleased(){
  dots[dots.length-1].xspeed = (oX-mouseX)/5;
  dots[dots.length-1].yspeed = (mouseY-oY)/5;
  released = true;
  dots[dots.length-1].gravity = 0.1;
}

function draw() {
  noStroke();
  background('rgba(20,20,20,0.3)');
  fill(255,255,255);
  stroke(255,150, 150);
  strokeWeight(5);
  if(!released){
    line(oX, oY, mouseX, mouseY);
  }
  strokeWeight(0);
  if(dots.length){
    for(i=0; i<dots.length;i++){
      if(dots[i].life == 0){
        fill(255, 0, 0);
        ellipse(dots[i].x, dots[i].y, 50, 50);
        dots.splice(i,1);
        fill(255);
      }
      else{
        // fill(dots[i].rcolor,dots[i].gcolor,dots[i].bcolor);
        ellipse(dots[i].x, dots[i].y, 20, 20);
        // image(img, dots[i].x, dots[i].y, 20, 20);
        dots[i].update();
      }
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

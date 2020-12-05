var img;
var imgMask;
var offset = 0;
var easing = 0.05;

function preload() {
  blackmask = loadImage("blackmask.jpeg");
  imgMask = loadImage("mask.png");
  imageMode(CENTER);
  // blackmask = imgMask;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(400);
}

var x=0;
var y=0;
var vx = 10;
var vy = 10;
var pause =  false;
var ang = 0;

function draw() {
  clear();
  var rad = 400;
  var upmaskheight = 10+mouseY-rad/2;
  var lowermaskheight = height - rad - upmaskheight;
  var leftmaskwidth = mouseX - rad/2;
  var righmaskwidth = width - rad- leftmaskwidth;
  image(imgMask, 0, 0, imgMask.width, imgMask.height, mouseX, mouseY, rad + 10, rad + 10);
  image(blackmask, 0, 0, blackmask.width, blackmask.height, width/2, (mouseY-rad/2)/2, width+50, upmaskheight + 20);
  image(blackmask, 0, 0, blackmask.width, blackmask.height, leftmaskwidth/2, mouseY, leftmaskwidth + 20, rad);
  image(blackmask, 0, 0, blackmask.width, blackmask.height, width/2, height - lowermaskheight/2 , width+50, 30+lowermaskheight+20);
  image(blackmask, 0, 0, blackmask.width, blackmask.height, width - righmaskwidth/2, mouseY, righmaskwidth + 20, rad);
  if(pause){
    return;
  }
  var x0 = x;
  var y0 = y;
  ang = ang + HALF_PI/50;
  x+=vx;
  y+=10*sin(ang);
  if(x>width || x<0){
    vx= -1*vx;
  }
  fill("#2424b1");
  strokeWeight(10.0);
}

function mousePressed() {
  pause =! pause;
}

function mouseMoved(){
  // console.log(mouseX);
}

var img;
var imgMask;
var offset = 0;
var easing = 0.05;
var spotx = 150;
var spoty =150;

function preload() {
  imgMask = loadImage("mask.png");
  blackmask = loadImage("blackmask.jpeg");
  imageMode(CENTER);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(24);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  clear();
  if (window.DeviceMotionEvent != undefined) {
    window.ondevicemotion = function(e) {
      ax = e.accelerationIncludingGravity.x * -5;
      ay = e.accelerationIncludingGravity.y * 5;
        if(spotx + ax < 0 ){
          spotx = 0;
        }
        if(spotx + ax > window.width ){
          spotx = window.width;
        }
        else{
          spotx = spotx + ax;
        }

        if(spoty + ay < 0 ){
          spoty = 0;
        }
        if(spoty + ax > window.height ){
          spoty = window.height;
        }
        else{
          spoty = spoty + ay;
        }

        if(spotx > window.innerWidth + window.scrollX){
          window.scrollTo(spotx + 10, window.scrollY);
        }

        if(spoty > window.innerHeight + window.scrollY){
          window.scrollTo(window.scrollX, spoty + 10);
        }

      if ( e.rotationRate ) {
      }
    }
  }
  var rad = 500;
  var upmaskheight = 10+spoty-rad/2;
  var lowermaskheight = height - rad - upmaskheight;
  var leftmaskwidth = spotx - rad/2;
  var righmaskwidth = width - rad- leftmaskwidth;
  image(imgMask, 0, 0, imgMask.width, imgMask.height, spotx, spoty, rad + 10, rad + 10);
  image(blackmask, 0, 0, blackmask.width, blackmask.height, width/2, (spoty-rad/2)/2, width+50, upmaskheight + 20);
  image(blackmask, 0, 0, blackmask.width, blackmask.height, leftmaskwidth/2, spoty, leftmaskwidth + 20, rad);
  image(blackmask, 0, 0, blackmask.width, blackmask.height, width/2, height - lowermaskheight/2 , width+50, 30+lowermaskheight+20);
  image(blackmask, 0, 0, blackmask.width, blackmask.height, width - righmaskwidth/2, spoty, righmaskwidth + 20, rad);
}

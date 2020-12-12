var img;
var imgMask;
var offset = 0;
var easing = 0.05;
var spotx = 150;
var spoty =150;

function preload() {
  img = loadImage("dragons1.jpg");
  imgMask = loadImage("mask.png");
  imageMode(CENTER);
  spotx = img.width/2;
  spoty = img.height/2;
}

function setup() {
  createCanvas(img.width,img.height);
  // createCanvas(window.innerWidth, window.innerHeight);
  frameRate(400);
}



function draw() {
  // spotx = mouseX;
  // spoty = mouseY;
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
  // background(0,0,0);
  var rad = 1000;
  image(img, spotx-rad/2, spoty-rad/2, rad, rad, spotx, spoty, rad, rad);
  image(imgMask, 0, 0, imgMask.width, imgMask.height, spotx, spoty, rad + rad/10, rad + rad/10);
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

}

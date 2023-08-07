var img;
var imgMask;
var offset = 0;
var easing = 0.05;
var spotx = 150;
var spoty =150;
var hit = 0;

function preload() {
  img = loadImage("dragon-landscape.jpg");
  imgMask = loadImage("mask.png");
  imageMode(CENTER);
  spotx = img.width/2;
  spoty = img.height/2;
}

function setup() {
  // createCanvas(img.width,img.height);

  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(200);
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
        if(spotx + ax > width ){
          spotx = width;
        }
        else{
          spotx = spotx + ax;
        }

        if(spoty + ay < 0 ){
          spoty = 0;
        }
        if(spoty + ax > height ){
          spoty = height;
        }
        else{
          spoty = spoty + ay;
        }

        // if(spotx > window.innerWidth + window.scrollX){
        //   window.scrollTo(spotx + 10, window.scrollY);
        // }
        // if(window.scrollX && spotx < window.innerWidth){
        //   window.scrollTo(spotx + 10, window.scrollY);
        // }
        //
        // if(spoty > window.innerHeight + window.scrollY){
        //   window.scrollTo(window.scrollX, spoty + 10);
        // }

      if ( e.rotationRate ) {
      }
    }
  }
  background(0,0,0);
  var radx = 200;
  var rady = 200;
  var ratiox = img.width/window.innerWidth;
  var ratioy = img.height/window.innerHeight;
  // rect(spotx, spoty, radx, rady);
  // rect(width - spotx, height - spoty, radx, rady);
  hit = collideRectRect(spotx, spoty, radx, rady, width - spotx, height - spoty, radx, rady);
  image(img, spotx-radx/2, spoty-rady/2, radx, rady, spotx, spoty, radx, rady);
  image(img, width - spotx-radx/2, height - spoty-rady/2, radx, rady, width - spotx, height - spoty, radx, rady);
  if(hit == 10){
    alert("hit");
  }
  // image(imgMask, 0, 0, imgMask.width, imgMask.height, spotx, spoty, radx + radx/10, rady + rady/10);
  // image(imgMask, 0, 0, imgMask.width, imgMask.height, width - spotx, height - spoty, radx + radx/10, rady + rady/10);

}

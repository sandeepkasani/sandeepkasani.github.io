var sparks = [];

function setup() {
  createCanvas(windowWidth - 400, windowHeight-30);
  frameRate(60);
}


function burst(x,y){
  var z = null;
  for(let i = 0; i<50; i++){
	z = new spark(x, y);
	sparks.push(z)
  }
}

// function mouseDragged() {
function mousePressed() {
  let x = width/2; 
  let y = windowHeight;
  let z = new spark(x, y, true);
  sparks.push(z)
}

function draw() {
  background('rgba(0,0,0,0.1)');
  fill(255);
  noStroke();
  for(i=0; i<sparks.length;i++){
	let s = sparks[i];
    ellipse(s.x, s.y, s.size, s.size);
    s.update();
    if(s.life < 0){
	  if(s.isShot){
		burst(s.x,s.y)
	  }
	  sparks.splice(i,1);
    }
  }
}

function spark(x,y,isShot) {
  this.x = x;
  this.y = y;
  this.isShot = isShot;
  this.xspeed = random(-3,3);
  this.yspeed = isShot ? 10 : random(-2,6);
  this.gravity = 0.1;
  this.life = isShot ? random(40,70) :random(20,60);
  this.size = isShot ? 10 : 5;
  this.update = function(){
    this.x += this.xspeed;
    this.y -= this.yspeed;
    this.yspeed -= this.gravity;
	this.life = this.life - 1;
  }
}

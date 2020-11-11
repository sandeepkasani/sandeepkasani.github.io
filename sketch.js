var sparks = [];

let started= false;
let fireSound;
let burstSound;
function preload() {
  soundFormats('mp3');
  fireSound = loadSound('sounds/gunshot');
  burstSound = loadSound('sounds/burst');
}

function fireShots(){
  if(!started){
	  for(let i= 0; i<4; i++){
		window.setTimeout(()=>{
		  fireShot()
   	    },random(1,10)*200)
	  } 
	  started = true
  }
}

function setup() {
  createCanvas(windowWidth - 50, windowHeight-30);
  frameRate(60);
}


function burst(x,y, clr){
  var z = null;
  for(let i = 0; i<100; i++){
	z = new spark(x, y, false, clr);
	sparks.push(z)
  }
  burstSound.play();  
}

// function mouseDragged() {
function mousePressed() {	
  fireShots();
}

function fireShot() {
  let x = width/2; 
  let y = windowHeight;
  let z = new spark(x, y, true);
  sparks.push(z)
  fireSound.play()
}

function draw() {
  background('rgba(0,0,0,0.2)');
  fill(255);
  noStroke();
  textSize(32);
  if(!started){
	textAlign(CENTER, CENTER)
	text('click to start fireworks', width/2, height/2);
  }
  for(i=0; i<sparks.length;i++){
	let s = sparks[i];
	fill(s.scolor)
	//s.size = random(3,10);
    ellipse(s.x, s.y, s.size, s.size);
    s.update();
    if(s.life < 0){
	  if(s.isShot){
		burst(s.x,s.y, s.scolor)
		window.setTimeout(()=>{
		  fireShot()
   	    },random(1,10)*200) 
	  }
	  sparks.splice(i,1);
    }
  }
}

function spark(x,y,isShot, pClr) {
  this.x = x;
  this.y = y;
  this.isShot = isShot;
  this.xspeed = random(-3,3);
  this.yspeed = isShot ? height/60 : random(0,5);
  this.gravity = isShot ? 0.1 : 0.1;
  let clrs = ['red', 'blue', 'cyan', 'magenta', 'yellow', 'pink', 'orange', 'purple']
  this.scolor = isShot ? clrs[Math.floor(random(0,9))]+"" : pClr;
  this.life = isShot ? random(70,100) :random(20,60);
  this.size = isShot ? 3 : 5;
  this.update = function(){
    this.x += this.xspeed;
    this.y -= this.yspeed;
    this.yspeed -= this.gravity;
	this.life = this.life - 1;
  }
}

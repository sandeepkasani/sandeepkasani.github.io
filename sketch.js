var sparks = [];

function setup() {
  createCanvas(windowWidth - 50, windowHeight-30);
  frameRate(60);  
  fireShot();  
  fireShot();  
  fireShot();  
  fireShot();  
}


function burst(x,y, clr){
  var z = null;
  for(let i = 0; i<100; i++){
	z = new spark(x, y, false, clr);
	sparks.push(z)
  }  
}

// function mouseDragged() {
function mousePressed() {	
}

function fireShot() {
  let x = width/2; 
  let y = windowHeight;
  let z = new spark(x, y, true);
  sparks.push(z)
}

function draw() {
  background('rgba(0,0,0,0.2)');
  fill(255);
  noStroke();
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
  this.xspeed = random(-2,2);
  this.yspeed = isShot ? height/60 : random(-1,5);
  this.gravity = isShot ? 0.1 : 0.1;
  let clrs = ['red', 'blue', 'cyan', 'magenta', 'yellow']
  this.scolor = isShot ? clrs[Math.floor(random(0,6))]+"" : pClr;
  this.life = isShot ? random(70,100) :random(20,60);
  this.size = isShot ? 3 : 5;
  this.update = function(){
    this.x += this.xspeed;
    this.y -= this.yspeed;
    this.yspeed -= this.gravity;
	this.life = this.life - 1;
  }
}

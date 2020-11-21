var sparks = [];
let clrs = ['#FA3308', '#FAEF08', '#4AFA08', '#08D9FA', '#7208FA', '#FA08CE', '#C7FA08', '#FA0893']
let myfont;
let started= false;
let shotColor = 0;
let sparklings = 100;
let shots = 6;
let shotsData = {};
let fireSound;
let burstSound;
let shotCount = 0;
function preload() {
  soundFormats('mp3');
  myfont = loadFont('fonts/greatvibes.otf');
  fireSound = loadSound('sounds/gunshot');
  burstSound = loadSound('sounds/burst');
}

function fireShots(){
  if(!started){
	  for(let i= 0; i<shots; i++){
		window.setTimeout(()=>{
		  fireShot()
   	    },random(1,10)*200)
	  } 
	  started = true
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  clrs.map((c)=>shotsData[c]={ count:0, clr: c});
  textFont(myfont);
  frameRate(60);
}


function burst(x,y, clr){
  var z = null;  
  var sdata = {
	x:x, y:y
  }
  for(let i = 0; i<sparklings; i++){
	z = new spark(x, y, false, clr, i);
	sparks.push(z)
  }
  shotsData[clr].count = shotsData[clr].count + sparklings
  shotsData[clr] = {...shotsData[clr], ...sdata}
  burstSound.play();
}

// function mouseDragged() {
function mousePressed() {	
  fireShots();
}

function fireShot() {
	//if(shotCount < 30){
	  let x = random(width/3,2*width/3); 
	  let y = windowHeight;
	  let z = new spark(x, y, true);
	  sparks.push(z)
	  fireSound.play()
	  shotCount = shotCount+1;
	//}
}

function draw() {
  background('rgba(0,0,0,0.1)');
  fill(255);
  noStroke();
  textSize(32);
  if(!started){
	textAlign(CENTER, CENTER)
  }
  for(i=0; i<sparks.length;i++){
	let s = sparks[i];
	fill(s.scolor)
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
	  shotsData[s.scolor].count--;
    }
  }
}

function spark(x,y,isShot, pClr, id) {
  this.x = x;
  this.y = y;
  this.isShot = isShot;
  let spd = id/30; 
  this.xspeed = isShot ? random(-3,3) : spd*cos(id)//random(-3,3) > 0 ? 3 : -3;
  this.yspeed = isShot ? height/70 : spd*sin(id)//random(0,5);
  this.gravity = isShot ? 0.1 : 0;  
  let index = Math.floor(random(0,8));
  this.scolor = isShot ? clrs[index]+"" : pClr;
  if(isShot){
	shotColor = this.scolor	
  }
  this.life = isShot ? random(70,100) : random(20,60);
  this.size = isShot ? 3 : random(2,5);
  this.update = function(){
    this.x += this.xspeed;
    this.y -= this.yspeed;
    this.yspeed -= this.gravity;
	this.life = this.life - 1;
  }
}

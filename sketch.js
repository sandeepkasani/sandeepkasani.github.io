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
	z = new spark(x, y, false, clr);
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
	if(shotCount < 50){
	  let x = random(width/3,2*width/3); 
	  let y = windowHeight;
	  let z = new spark(x, y, true);
	  sparks.push(z)
	  fireSound.play()
	  shotCount = shotCount+1;
	}
}

function draw() {
  background('rgba(0,0,0,0.2)');
  fill(255);
  noStroke();
  textSize(32);
  if(!started){
	textAlign(CENTER, CENTER)
	//text('click to start fireworks', width/2, height/2);
  }
  else{	
	//fill(clrs[Math.floor(random(0,9))]+"");
	let maxS = Object.values(shotsData).reduce(function(prev, current) {
	  return (prev.count > current.count) ? prev : current
	})
	let alpha = maxS.count < 0 ? 1 : 1-Math.floor((200*maxS.count/(sparklings*shots)))/100//.toString(16)
	stroke(maxS.clr)
	strokeWeight(2);
	textAlign(CENTER, CENTER)
	text('May your life be filled with lights of happiness', width/2, height-100);
	textSize(15);
	noStroke();
	//text('- Malleshwari', width/2, height-20);
	textSize(10+sparks.length/5);
	fill(maxS.clr)
	text('Happy Diwali', width/2, height-200);
	fill('rgba(0,0,0,'+alpha+')')
	//fill("rgba(200,200,200,0.5)")
	//rect(width/2-100, height/2-20,200,40)
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
	  shotsData[s.scolor].count--;
    }
  }
}

function spark(x,y,isShot, pClr) {
  this.x = x;
  this.y = y;
  this.isShot = isShot;
  this.xspeed = random(-2,2);
  this.yspeed = isShot ? height/70 : random(-1,5);
  this.gravity = isShot ? 0.1 : 0.1;  
  let index = Math.floor(random(0,8));
  this.scolor = isShot ? clrs[index]+"" : pClr;
  if(isShot){
	shotColor = this.scolor	
  }
  this.life = isShot ? random(70,100) :random(20,60);
  this.size = isShot ? 3 : 5;
  this.update = function(){
    this.x += this.xspeed;
    this.y -= this.yspeed;
    this.yspeed -= this.gravity;
	this.life = this.life - 1;
  }
}

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
let logo;
function preload() {
  soundFormats('mp3');
  myfont = loadFont('fonts/greatvibes.otf');
  fireSound = loadSound('sounds/gunshot');
  burstSound = loadSound('sounds/burst');
  logo = loadImage('gyt-logo.svg');
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
	textSize(20);
	//text('May your life be filled with lights of happiness', width/2, height/2+200);
	textSize(15);
	noStroke();
	//text('- Malleshwari', width/2, height-20);
	textSize(20+sparks.length/10);
	fill(maxS.clr)
	text('Happy Diwali', width/2-30, height/2+100);
	rect(windowWidth/2 - logo.width / 2-10, height-100-10, logo.width / 2 + 20, logo.height / 2+20)
	image(logo, windowWidth/2 - logo.width / 2, height-100, logo.width / 2, logo.height / 2);
	fill('rgba(0,0,0,'+alpha+')')
	tint(0, 153, 204, 126);
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

function spark(x,y,isShot, pClr, id) {
  this.x = x;
  this.y = y;
  let spd = id/30; 
  this.isShot = isShot;this.xspeed = isShot ? random(-3,3) : spd*cos(id)//random(-3,3) > 0 ? 3 : -3;
  this.yspeed = isShot ? height/70 : spd*sin(id)//random(0,5);
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

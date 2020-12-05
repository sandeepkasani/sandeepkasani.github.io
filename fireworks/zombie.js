let sparks = [];
let fireSound = new Audio('sounds/gunshot');;
let burstSound;
function preload() {
  p5.soundFormats('mp3');
  fireSound = loadSound('sounds/gunshot.mp3');
  burstSound = loadSound('sounds/burst.mp3');
}

function init() {
  fireShot()
  fireShot()
  window.requestAnimationFrame(draw);
}

let width = 600;
let height = 600;

function fireShot() {
  let x = width/2; 
  let y = height;
  let z = new spark(x, y, true);
  sparks.push(z)
  //fireSound.play()
  document.getElementById('fireshot').play()
}

function getLife(isShot){
	let life = Math.random()*20;
	if(isShot){
	  if(life < 10 || life > 15){
		life = 15
	  }
	  console.log(life)
	}
	return life
}

function spark(x,y,isShot, pClr) {
  this.x = x;
  this.y = y;
  this.isShot = isShot;
  this.xspeed = (Math.random()-0.5)*5;
  this.yspeed = isShot ? height/40 : Math.random()*3;
  this.gravity = isShot ? 0.25 : 0.05;
  let clrs = ['red', 'blue', 'cyan', 'magenta', 'yellow', 'pink', 'orange', 'purple']
  this.scolor = isShot ? clrs[Math.floor(Math.random()*9)]+"" : pClr;
  this.life = getLife(isShot);
  //this.life = this.life*100;
  this.size = isShot ? 2 : 3;
  this.update = function(){
    this.x += this.xspeed;
    this.y -= this.yspeed;
    this.yspeed -= this.gravity;
	this.life = this.life - 0.3;
  }
}

function burst(x,y, clr){
  var z = null;
  for(let i = 0; i<100; i++){
	z = new spark(x, y, false, clr);
	sparks.push(z)
  } 
  document.getElementById('burst').play()  
}

let count = 0

function drawCircle(s,context){
	  context.beginPath();
	  context.arc(s.x, s.y, s.size, 0, 2 * Math.PI, false);
	  context.fillStyle = s.scolor;
	  context.fill();
}

function draw() {
  var context = document.getElementById('canvas').getContext('2d');
  var canvas = document.getElementById('canvas');
  //context.clearRect(0, 0, canvas.width, canvas.height);
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'rgba(0,0,0,0.1)';
  context.fill();
  sparks.map((s, i)=>{
	drawCircle(s, context);
	s.update();
	if(s.isShot && (s.life < 0 || s.yspeed < 0)){
		burst(s.x,s.y, s.scolor)
		window.setTimeout(()=>{
		  fireShot()
		},Math.random()*2000) 
		sparks.splice(i,1);
	}
	
	if(s.life < 0){
	  sparks.splice(i,1);
    }
  })
  

  count = count + 1;
  window.requestAnimationFrame(draw);
}

init();
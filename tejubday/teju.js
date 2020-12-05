var sparks = [];
let clrs = ['#FA3308', '#FAEF08', '#4AFA08', '#08D9FA', '#7208FA', '#FA08CE', '#C7FA08', '#FA0893']
let started= false;
let myfont;
let shotColor = 0;
let sparklings = 300;
let shots = 2;
let shotsData = {};
let fireSound;
let burstSound;
let images = [];
let maskImg = null;
function preload() {
  soundFormats('mp3');
  myfont = loadFont('fonts/greatvibes.otf');
  fireSound = loadSound('sounds/gunshot');
  burstSound = loadSound('sounds/burst');
  for(let i = 1; i<32; i++){
   images.push(loadImage('teju/t('+i+').png'))
  }
  maskImg = loadImage('teju/mask.png')
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
  clrs.map((c)=>{	 
	let imgId = Math.floor(random(0,images.length))
	shotsData[c]={ 
	  count:0, clr: c, imgId:imgId
	}
  })
  textFont(myfont);
  frameRate(60);
}


function burst(x,y, clr){
  var z = null;  
  let imgId = Math.floor(random(0,images.length))
  console.log(imgId);
  var sdata = {
	x:x, y:y, imgId: imgId
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
  let x = random(150,width-150); 
  let y = windowHeight;
  let z = new spark(x, y, true);
  sparks.push(z)
  fireSound.play()
}

function draw() {
  background('rgba(0,0,0,0.1)');
  //background("white")
  fill(255);
  noStroke();
  textSize(32);
  if(!started){
	textAlign(CENTER, CENTER)
	//text('click to start fireworks', width/2, height/2);	
  }
  else{
	let maxS = Object.values(shotsData).reduce(function(prev, current) {
	  return (prev.count > current.count) ? prev : current
	})
	let alpha = maxS.count < 0 ? 1 : 1-Math.floor((200*maxS.count/(sparklings*shots)))/100//.toString(16)
	stroke(maxS.clr)
	strokeWeight(2);
	textAlign(CENTER, CENTER)
	textSize(20);
	text('Wishing you a life full of happiness', width/2, height/2+200);
	textSize(15);
	noStroke();
	//text('- Malleshwari', width/2, height+300);
	textSize(20+sparks.length/20);
	fill(maxS.clr)
	text('Happy Birthday Teju!!', width/2, height/2+100);
	fill('rgba(0,0,0,'+alpha+')')
	//fill("rgba(200,200,200,0.5)")
	//rect(width/2-175, height/2-20,350,40)
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
   	    },random(1,10)*100) 
	  }
	  sparks.splice(i,1);
	  if(shotsData[s.scolor].count > 0){
	    shotsData[s.scolor].count--;
	  }
    }
  } 
  
  Object.values(shotsData).map((sd,i)=>{
	let al = 1 - sd.count/255
	if(al < 1){
	  image(images[sd.imgId], sd.x-120, sd.y-120, 240,240); 	
      image(maskImg, 0,0, 500, 500, sd.x-125, sd.y-125, 250, 250);	  
    }
  }) 
}

function spark(x,y,isShot, pClr) {
  this.x = x;  
  this.y = y;
  this.isShot = isShot;
  this.xspeed = isShot ? random(-1,1):random(-2,2);
  this.yspeed = isShot ? height/random(65,75) : random(-2,2);
  this.x = this.xspeed > 0 ? this.x + 50 : this.x - 50
  this.y = this.yspeed > 0 ? this.y - 50 : this.y + 50
  this.gravity = isShot ? 0.1 : 0;  
  let index = Math.floor(random(0,8));
  this.scolor = isShot ? clrs[index]+"" : pClr;
  if(isShot){
	shotColor = this.scolor	
  }
  this.life = isShot ? random(50,80) :random(50,80);
  this.size = isShot ? 3 : 5;
  this.update = function(){
    this.x += this.xspeed;
    this.y -= this.yspeed;
    this.yspeed -= this.gravity;
	this.life = this.life - 1;
  }
}

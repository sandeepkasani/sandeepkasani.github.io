var dataStorage = window.localStorage;
var img;
var imgMask;
var spotx = 150;
var spoty =150;
var hit = 0;
var hitCount = 0;
var timeTaken = 0;
var pause = false;
var rad = 50;

var currentLevel = 1;
var difficulty = 1;
var maxLevel = 1;
var maxDifficulty = 1;

var delta = 0.75;
var homeScreen = false;
var accelFactor = 5;
var yDisp = 0.5;

var velx = 0.5;
var vely = 0.5;
var vx = vy = 2;
var target = {};
var change = 0;
var mycanvas;

var levels = [
  {level:1,title:"VOLATILE"},
  {level:2,title:"FORWARD = BACKWARD"},
  {level:3,title:"UPWARD = DOWNWARD"},
  {level:4,title:"DOUBLE TROUBLE"},
  {level:5,title:"FORWARD BACKWARD"},
  {level:6,title:"UPs and DOWNs"},
  {level:7,title:"GOING in CIRCLES"},
  {level:8,title:"GOING in CIRCLES 2"},
  {level:9,title:"FORWARD BACKWARD \n UP DOWN"},
  {level:10,title:"CLAUSTROPHOBIC"}
]

function preload() {
  img = loadImage("img/green.png");
  imgMask = loadImage("img/mask.png");
  imgGreen = loadImage("img/green.png");
  bgMusic = loadSound('sound/bg.mp3');
  imageMode(CENTER);
}

function setup() {
  mycanvas = createCanvas(window.innerWidth, window.innerHeight);
  currentLevel = 1;
  spotx = 0;
  spoty = 0;
  frameRate(60);
  bgMusic.setVolume(0.3);
  bgMusic.loop(0);
  // cordova.plugins.insomnia.keepAwake();

  if( dataStorage != undefined)
  {
    if(dataStorage.getItem("maxLevel")){
      currentLevel = maxLevel = parseInt(dataStorage.getItem("maxLevel"));
      difficulty = maxDifficulty = parseInt(dataStorage.getItem("maxDifficulty"));
      return;
    }
    //add
    dataStorage.setItem("maxLevel", currentLevel);
    dataStorage.setItem("maxDifficulty", difficulty);
  }
  else
  {
      console.log("No support");
  }
}

function draw() {
  if(homeScreen){
    // background(0);
    //currentLevel = 10;
    if(target.targetx < 0){
      vx = 2;
    }
    if(target.targetx > width){
      vx = -2;
    }
    if(target.targety < 0){
      vy = 2;
    }
    if(target.targety > height){
      vy = -2;
    }
    if(typeof target.targety == 'undefined'){
      target.targety = 0;
      target.targetx = 0;
    }
    target.targety = target.targety  + vy;
    target.targetx = target.targetx + vx;
    image(imgMask, 0, 0, imgMask.width, imgMask.height, target.targetx, target.targety, radx + radx/10, rady + rady/10);
    image(imgGreen, 0, 0, img.width, img.height, width-target.targetx, target.targety, radx + radx/10, rady + rady/10);
    return;
  }
  if(pause){
    return;
  }
  if (window.DeviceMotionEvent != undefined) {
    window.ondevicemotion = function(e) {
      ax = e.accelerationIncludingGravity.x * -accelFactor;
      ay = e.accelerationIncludingGravity.y * accelFactor;
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
    }
  }
  background(hit,hit,hit);
  var radx = rad;
  var rady = rad;
  if(Math.abs(spotx - getCoords().targetx) < radx && Math.abs(spoty - getCoords().targety) < rady){
    hitCount++;
    hit = hit + delta
  }
  else{
    if(hit >=0 )
      hit--;
  }

  if(hitCount == 100 && change == 0){
    change = 1;
  }
  if(hitCount == 250 && change == 1){
    change = 2;
  }
  if(hitCount == 400 && change == 2){
    change = 3;
  }

  if(hit > 255){
    spotx = window.innerWidth/2;
    spoty = window.innerHeight;
    endLevel();
  }
  showProgress();
  if(timeTaken < 200 && !pause){
    fill(255, 255, 255, (255 - timeTaken)/2);
    rectMode(CENTER);
    rect(width/2, height/2, 0.9*width, 0.5*height, 20);
    fill(28, 255, 28, (255 - timeTaken)/2);
    textSize(24);
    textAlign(CENTER);
    textStyle(BOLD);
    strokeWeight(10);
    stroke(0);
    // image(imgMask, 0, 0, imgMask.width, imgMask.height,  width/2, height/2, width, 200);
    text(levels[currentLevel-1].title, width/2, height/2);
  }
  else{
    strokeWeight(1);
    stroke(255);
    // text(timeTaken, width/2, 20);
    image(img, 0, 0, img.width, img.height, spotx, spoty, radx + radx/10, rady + rady/10);
    image(imgMask, 0, 0, imgMask.width, imgMask.height, getCoords().targetx, getCoords().targety, radx + radx/10, rady + rady/10);
    // image(img, 0, 0, img.width, img.height, width-getCoords().targetx, getCoords().targety, radx + radx/10, rady + rady/10);
    strokeWeight(1);
  }
  timeTaken++;
  if(timeTaken > 9999){
    timeTaken = 300;
  }
}

function showProgress(){
  if(hit>1){
    fill(255,255,0);
    stroke(0, 255,0);
  }
  else{
    fill(0,0,0);
    stroke(0, 0,0);
  }
  // arc(25, 25, 25, 25, 2*PI/255, 2*PI*hit/255, PIE);
  //rect(0, height/2, 5, height*hit/255);
  strokeWeight(7);
  line(0, height, 0, height - height*hit/255);
  line(width, height, width, height - height*hit/255);
}

function mouseClicked(){
  if(pause && currentLevel < 10){
    currentLevel = currentLevel + 1;
  }
  else if(pause && currentLevel == 10){
    difficulty++;
    currentLevel = 1;
  }
  if(difficulty == 2){
    accelFactor = 10;
  }
  levelUp();
  pause = false;
}

var endLevel = function(){
  navigator.vibrate(500);
  pause = true;
  fill(0, 102, 153);
  textSize(20);
  textAlign(CENTER);
  hit = 0;
  hitCount = 0;
  change = 0;
  timeTaken = 0;
  if(currentLevel == 10){
    text("Level "+currentLevel+" Complete \n Touch screen to restart at\n Higher Difficulty", width/2, height/3);
  }
  else{
    text("Level "+currentLevel+" Complete \n Touch the screen for next level", width/2, height/3);
  }
  levelUp();
}

var showLaunch = function(){
  pause =  true;
}

var getCoords =  function(){
  switch (currentLevel) {
    case 1: //level 1
      target.targetx = window.innerWidth/2;
      if(change == 0){
        target.targety = window.innerHeight/2;
      }
      else if(change == 1){
        target.targety = window.innerHeight/4;
      }
      else if(change == 2){
        target.targety = 3*window.innerHeight/4;
      }
      else if(change == 3){
        target.targety = window.innerHeight/2;
      }
      break;
    case 2: //level 4
      target.targetx = window.innerWidth - spotx;
      if(change == 0){
        target.targety = window.innerHeight/2;
      }
      else if(change == 1){
        target.targety = window.innerHeight/4;
      }
      else if(change == 2){
        target.targety = 3*window.innerHeight/4;
      }
      else if(change == 3){
        target.targety = window.innerHeight/2;
      }
      break;

    case 3: //level 4
      target.targety = window.innerHeight - spoty;
      if(change == 0){
        target.targetx = window.innerWidth/2;
      }
      else if(change == 1){
        target.targetx = window.innerWidth/4;
      }
      else if(change == 2){
        target.targetx = 3*window.innerWidth/4;
      }
      else if(change == 3){
        target.targetx = window.innerWidth/2;
      }
      break;
    case 4: //level 4
      target.targetx = window.innerWidth - spotx;
      target.targety = window.innerHeight - spoty;
      break;
    case 5: //level 2
      target.targetx = window.innerWidth/2-100*Math.sin(timeTaken*Math.PI/100);
      target.targety = window.innerHeight/2;
      break;
    case 6: //level 3
      target.targetx = window.innerWidth/2;
      target.targety = window.innerHeight/2 - 100*Math.sin(timeTaken*Math.PI/100);
      break;
    case 7: //level 5
      target.targetx = window.innerWidth/2-80*Math.sin(timeTaken*Math.PI/100);
      target.targety = window.innerHeight/2-80*Math.cos(timeTaken*Math.PI/100);
      if(change == 2){
        target.targetx = window.innerWidth/2-70*Math.sin(timeTaken*Math.PI/100);
        target.targety = window.innerHeight/2+70*Math.cos(timeTaken*Math.PI/100);
      }
      break;
    case 8: //level 5
      if(timeTaken == 201){
        target.targetx = window.innerWidth/2;
        target.targety = window.innerHeight/2 -50;
      }
      if(typeof target.targety == 'undefined'){
        target.targety = 0;
      }
      target.targety = target.targety  + yDisp;
      //target.targetx = window.innerWidth/2-100*Math.sin(timeTaken*Math.PI/100);
      target.targetx = window.innerWidth/2-200*Math.sin((target.targety - height/2)*Math.PI/200)*yDisp;
      if(target.targety > height/2 + 200 || target.targety < height/2 - 200){
        yDisp = -1*yDisp;
      }
      break;
    case 9:
      // if(target.targety < 0){
      //   vely = 0.5;
      // }
      // if(target.targety > height){
      //   vely = -0.5;
      // }
      if(typeof target.targety == 'undefined' || target.targety > height){
        target.targety = 0;
      }
      target.targety = target.targety  + vely;
      target.targetx = window.innerWidth/2-70*Math.cos(timeTaken*Math.PI/100);
      break;
    case 10: //level 5
      if(target.targetx < 0){
        velx = 0.5;
      }
      if(target.targetx > width){
        velx = -0.5;
      }
      if(target.targety < 0){
        vely = 0.5;
      }
      if(target.targety > height){
        vely = -0.5;
      }
      if(typeof target.targety == 'undefined'){
        target.targety = 0;
        target.targetx = 0;
      }
      target.targety = target.targety  + vely;
      target.targetx = target.targetx + velx;
      break;
    default:
      showLaunch();
  }
  return target;
}

function levelUp(){
  if(difficulty == 1){
    img = loadImage("img/green.png");
    rad = 50;
  }
  if(difficulty == 2){
    img = loadImage("img/mask.png");
    rad = 45;
    delta = 0.5;
  }
  if(difficulty == 3){
    img = loadImage("img/mask.png");
    rad = 35;
  }


  dataStorage.setItem("maxLevel", currentLevel);
  dataStorage.setItem("maxDifficulty", difficulty);
  var appElement = document.querySelector('[ng-app=dexter]');
  var $scope = angular.element(appElement).scope();
  $scope.$apply(function() {
      $scope.maxLevel = currentLevel;
      $scope.maxDifficulty = difficulty;
  });
  // $scope.setLevel(currentLevel);
}

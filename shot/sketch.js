var zombies = [];

function setup() {
  createCanvas(600, 600);
  frameRate(60);
}

// function mouseDragged() {
function mousePressed() {
  var z = new zombie(mouseX, mouseY);
  zombies.push(z)
}

function draw() {
  // background(200);
  background('rgba(200,200,200, 0.1)');
  fill(25);
  for(i=0; i<zombies.length;i++){
    ellipse(zombies[i].x,zombies[i].y,20,20);
    zombies[i].update();
    if(zombies[i].y === 600){
      zombies.splice(i,1);
    }
  }
}





function keyPressed() {
  if (keyCode === UP_ARROW) {
    // s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    // s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    // s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    // s.dir(-1, 0);
  }
}

let player;
let enemies = [];
let bullets = [];
let score = 0;

let sling;
let tiltX = 0, tiltY = 0;

function setup() {
  console.log("v1");
  createCanvas(windowWidth, windowHeight); // Use window width and height
  player = new Player();
  sling = new SlingShot(player, 0.1);

  // Create multiple enemies
  for (let i = 0; i < 5; i++) {
    enemies.push(new Enemy());
  }
}

function draw() {
  background(200); // Grey background

  // Display the score
  textSize(20);
  fill(0);
  textAlign(LEFT);
  text('Kills: ' + score+ ' - x: '+player.x+' - y: '+player.y, 10, 30);
  text('Kills: ' + score+ ' - x: '+tiltX+' - y: '+tiltY, 50, 100);

  player.move(tiltX, tiltY);
  // Display the player
  player.display();

  // Move and display enemies
  for (let enemy of enemies) {
    enemy.update();
    enemy.display();
  }

  // Update and display the sling
  sling.update();
  sling.display();

  // Check for collisions
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    bullets[i].display();

    // Check for collisions with enemies
    for (let j = enemies.length - 1; j >= 0; j--) {
      if (bullets[i].hits(enemies[j])) {
        bullets.splice(i, 1);
        enemies.splice(j, 1);
        enemies.push(new Enemy());
        score++;
        break;
      }
    }

    // Remove bullets out of bounds
    if (bullets[i] && bullets[i].isOutOfBounds()) {
      bullets.splice(i, 1);
    }
  }
}

function mousePressed() {
  sling.attach(bullets);
}

function mouseDragged() {
  sling.drag();
}

function mouseReleased() {
  sling.release();
}


function deviceMoved() {
  tiltX = radians(rotationY);
  tiltY = radians(rotationX);
}

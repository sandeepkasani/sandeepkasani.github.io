let player;
let enemies = [];
let bullets = [];
let score = 0;

let sling;

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
  text('Kills: ' + score, 10, 30);

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
  // Use accelerometer data to move the player
  let x = accelerationX;
  let y = accelerationY;
  player.move(x, y);
}

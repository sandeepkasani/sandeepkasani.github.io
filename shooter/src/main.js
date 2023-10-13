let player;
let enemies = [];
let bullets = [];
let score = 0;

let sling;
let tiltX = 0, tiltY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight); // Use window width and height
  player = new Player();
  sling = new SlingShot(player, 0.1);

  // Create multiple enemies
  for (let i = 0; i < 5; i++) {
    enemies.push(new Enemy());
  }
}

function draw() {
  background(20); // Grey background

  // Display the score
  textSize(20);
  fill(0);
  textAlign(LEFT);
  text('Kills: ' + score, 10, 30);
  text('x: '+tiltX+' - y: '+tiltY+ ' - x: '+Math.round(player.x)+' - y: '+Math.round(player.y), windowWidth-250, 30);

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
        enemies[j].isHit = true; // Mark the enemy as hit
        bullets.splice(i, 1); // Remove the bullet that hit the enemy
  
        // Delayed removal of the hit enemy after 0.5 seconds
        setTimeout(() => {
          enemies.splice(j, 1);
          enemies.push(new Enemy()); // Spawn a new enemy
        }, 500);
        
        break; // Break out of the inner loop after hitting an enemy
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

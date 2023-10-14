let player;
let enemies = [];
let bullets = [];
let score = 0;
let ammo = 3; // Added ammo variable

let sling;
let tiltX = 0, tiltY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();
  sling = new SlingShot(player, 0.1);

  // Create multiple enemies
  for (let i = 0; i < 5; i++) {
    enemies.push(new Enemy());
  }
}

function draw() {
  background(20);

  // Display the score and ammo
  textSize(20);
  fill(255);
  textAlign(LEFT);
  text('Kills: ' + score, 10, 30);
  text('Ammo: ' + ammo, width - 100, 30); // Display ammo

  // Check for gameover
  if (ammo <= 0) {
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(255);
    text('Game Over!!!', width / 2, height / 2 - 40);
    textSize(20);
    text('Score: ' + score, width / 2, height / 2 + 20);
    text('Touch anywhere to restart', width / 2, height / 2 + 60);

    // Restart the game on click
    if (mouseIsPressed) {
      restartGame();
    }

    // Exit the draw loop to stop further updates
    return;
  }

  player.move(tiltX, tiltY);
  player.display();

  for (let enemy of enemies) {
    enemy.update();
    enemy.display();
  }

  sling.update();
  sling.display();

  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    bullets[i].display();

    for (let j = enemies.length - 1; j >= 0; j--) {
      if (bullets[i].hits(enemies[j])) {
        bullets.splice(i, 1);
        enemies[j].isHit = true;

        setTimeout(() => {
          enemies.splice(j, 1);
          enemies.push(new Enemy());
        }, 500);

        score++;
        break;
      }
    }

    if (bullets[i] && bullets[i].isOutOfBounds()) {
      bullets.splice(i, 1);
      ammo--; // Decrease ammo when bullet goes out of bounds
    }
  }
}

function restartGame() {
  ammo = 3;
  score = 0;
  enemies = [];
  bullets = [];

  for (let i = 0; i < 5; i++) {
    enemies.push(new Enemy());
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

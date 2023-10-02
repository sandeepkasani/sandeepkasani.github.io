let player;
let enemies = [];
let bullets = [];
let score = 0; // Added score variable

let sling;

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
        enemies.push(new Enemy()); // Add a new enemy when one is hit
        score++; // Increase the score
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

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height/2;
    this.size = 20;
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

class Enemy {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = 20;
    this.speed = createVector(random(-2, 2), random(-2, 2));
  }

  update() {
    this.x += this.speed.x;
    this.y += this.speed.y;

    // Bounce off the walls
    if (this.x < 0 || this.x > width) {
      this.speed.x *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.speed.y *= -1;
    }
  }

  display() {
    fill(0);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

class SlingShot {
  constructor(player, strength) {
    this.player = player;
    this.strength = strength;
    this.bullet = null;
  }

  attach(bullets) {
    if (this.bullet === null) {
      this.bullet = new Bullet(this.player.x, this.player.y);
      bullets.push(this.bullet);
      return true;
    }
    return false;
  }

  drag() {
    this.strength = dist(this.player.x, this.player.y, mouseX, mouseY) * 0.2;
    this.strength = constrain(this.strength, 0, 5);
    this.bullet.drag(this.player.x, this.player.y, mouseX, mouseY);
  }

  release() {
    if (this.bullet !== null) {
      this.bullet.shoot(-2*this.strength);
      this.bullet = null;
    }
    this.strength = 0.1;
  }

  update() {
    // No need for updates in this case
  }

  display() {
    if (this.bullet !== null) {
      line(this.player.x, this.player.y, this.bullet.x, this.bullet.y);
    }
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 5;
    this.speed = createVector(0, 0);
    this.dragging = false;
  }

  drag(playerX, playerY, mouseX, mouseY) {
    this.dragging = true;
    this.x = playerX;
    this.y = playerY;
  }

  update() {
    if (!this.dragging) {
      this.x += this.speed.x;
      this.y += this.speed.y;
    }
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);

    // If dragging, draw a line from player to bullet
    if (this.dragging) {
      stroke(255);
      line(this.x, this.y, mouseX, mouseY);
    }
  }

  shoot(strength) {
    this.dragging = false;
    let angle = atan2(this.y - mouseY, this.x - mouseX);
    this.speed = p5.Vector.fromAngle(angle).mult(-strength);
  }

  hits(enemy) {
    let d = dist(this.x, this.y, enemy.x, enemy.y);
    return d < this.size / 2 + enemy.size / 2;
  }

  isOutOfBounds() {
    return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
  }
}

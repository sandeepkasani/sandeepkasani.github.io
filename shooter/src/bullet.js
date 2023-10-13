// bullet.js
let particles = []; // Define the particles array

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

      // Add particle effects
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(this.x, this.y));
      }
    }
  }

  display() {
    // Draw the trail first
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].display();
      if (particles[i].alpha <= 0) {
        particles.splice(i, 1);
      }
    }

    // If dragging, draw a line from player to bullet
    if (this.dragging) {
      stroke(255, 50); // Semi-transparent trail
      line(this.x, this.y, mouseX, mouseY);
    }

    // Display the bullet
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);
  }

  shoot(strength) {
    this.dragging = false;
    let angle = atan2(this.y - mouseY, this.x - mouseX);
    this.speed = p5.Vector.fromAngle(angle).mult(-strength);
  }

  hits(enemy) {
    let d = dist(this.x, this.y, enemy.x, enemy.y);
    if (d < this.size / 2 + enemy.size / 2) {
      // Apply blast effect to the enemy
      enemy.blast();
      return true;
    }
    return false;
  }

  isOutOfBounds() {
    return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
  }
}

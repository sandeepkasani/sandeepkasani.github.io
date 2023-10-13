// enemy.js
class Enemy {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = 20;
    this.speed = createVector(random(-2, 2), random(-2, 2));
    this.isHit = false; // New property to track if the enemy is hit
    this.alpha = 255; // Initial alpha for fading effect
  }

  update() {
    if (!this.isHit) {
      this.x += this.speed.x;
      this.y += this.speed.y;

      // Bounce off the walls
      if (this.x < 0 || this.x > width) {
        this.speed.x *= -1;
      }
      if (this.y < 0 || this.y > height) {
        this.speed.y *= -1;
      }
    } else {
      // If hit, increase size and fade away
      this.size += 0.5;
      this.alpha -= 5;
    }
  }

  display() {
    if (!this.isHit) {
      fill(0);
    } else {
      fill(255, this.alpha); // Fading effect for hit enemies
    }
    ellipse(this.x, this.y, this.size, this.size);
  }

  blast() {
    // Add blast effect if needed
    // This function can be extended for special effects when an enemy is hit
  }
}

// enemy.js
class Enemy {
  constructor() {
    this.spawnTime = millis();
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
    this.size = 20;
    this.speed = createVector(random(-2, 2), random(-2, 2));
    this.alpha = 255; // Alpha value for fade effect
    this.isHit = false; // Flag to indicate if the enemy has been hit
  }

  // New method for blast effect
  blast() {
    this.isHit = true; // Set the hit flag
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

    // Fade effect
    if (!this.isHit && this.alpha > 0) {
      this.alpha -= 2;
    } else if (this.isHit) {
      // If hit, gradually increase size
      this.size += 0.5;

      // Check if enough time has passed since the hit to spawn a new enemy
      if (millis() - this.spawnTime > 1000) { // Adjust the duration (1000 milliseconds or 1 second)
        this.reset(); // Reset the enemy properties
        this.spawnTime = millis(); // Record the spawn time
      }
    }
  }

  display() {
    if (this.isHit) {
      // Display blast effect (white particles)
      for (let i = 0; i < 5; i++) {
        fill(255, 255, 255, random(150, 255)); // White particles with random transparency
        ellipse(this.x + random(-10, 10), this.y + random(-10, 10), 5, 5);
      }

      // Display the enemy in white and fade effect
      fill(255, this.alpha); // White with fade effect
      ellipse(this.x, this.y, this.size, this.size);
    } else {
      fill(0, this.alpha); // Use alpha for fade effect
      ellipse(this.x, this.y, this.size, this.size);
    }
  }
}

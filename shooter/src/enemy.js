// enemy.js
class Enemy {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = 20;
    this.speed = createVector(random(-2, 2), random(-2, 2));
    this.isHit = false;
    this.hitTimer = 0; // Timer to track the duration of the hit effect
    this.hitDuration = 500; // 0.5 seconds
    this.particles = [];
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
      // If hit, gradually change color to white, reduce in size, and display particles
      this.hitTimer += deltaTime;
      let progress = constrain(this.hitTimer / this.hitDuration, 0, 1);
      let fadeColor = lerpColor(color(0), color(255,0,0), progress);
      fill(fadeColor);
      this.size = lerp(20, 40, progress);

      // Generate particles for the blast effect
      for (let i = 0; i < 5; i++) {
        this.particles.push(new Particle(this.x, this.y));
      }

      // Update and remove finished particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].update();
        if (this.particles[i].finished) {
          this.particles.splice(i, 1);
        }
      }

      // Reset hit state after 0.5 seconds
      if (this.hitTimer >= this.hitDuration) {
        this.isHit = false;
        this.hitTimer = 0;
      }
    }
  }

  blast() {
    // Implement the blast effect here
    // This function could be used to trigger any additional visual effects
  }

  display() {
    // Display particles for the blast effect
    for (let particle of this.particles) {
      particle.update();
    }

    // Display the enemy
    if (!this.isHit) {
      fill(0); // Black color
    }
    ellipse(this.x, this.y, this.size, this.size);
  }
}

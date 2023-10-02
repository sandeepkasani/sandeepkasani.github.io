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

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

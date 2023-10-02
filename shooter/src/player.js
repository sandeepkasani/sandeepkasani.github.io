class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2; // - 20;
    this.size = 20;
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);
  }

  move(x, y) {
    // Adjust the player's position based on accelerometer data
    this.x += x;
    this.y += y;

    // Ensure the player stays within the canvas boundaries
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
}

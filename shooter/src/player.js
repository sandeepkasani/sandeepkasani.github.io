// player.js
class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 20;
    this.auraSize = 0; // Initial size for the aura effect
    this.auraMaxSize = 10; // Maximum size for the aura effect
    this.auraSpeed = 0.05; // Adjust the speed of the aura pulsation
  }

  display() {
    // Draw the aura effect
    noFill();
    stroke(255, 255, 255, 100); // Bright blue color with transparency

    // Use a sine wave to pulsate the aura size
    this.auraSize = this.auraMaxSize * sin(frameCount * this.auraSpeed);
    strokeWeight(this.auraSize);

    // Display the player as a white-filled ellipse
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);
    strokeWeight(2);
  }

  move(targetX, targetY) {
    // this.x = lerp(this.x, targetX, 0.1);
    // this.y = lerp(this.y, targetY, 0.1);
  }
}

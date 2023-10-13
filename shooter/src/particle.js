// // particle.js
// class Particle {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.size = 5;
//     this.speed = p5.Vector.random2D().mult(random(2, 5));
//     this.alpha = 255;
//     this.finished = false; // Property to track if the particle is finished
//   }

//   update() {
//     this.x += this.speed.x;
//     this.y += this.speed.y;
//     this.alpha -= 5;

//     // Set finished to true if the alpha drops below 0
//     this.finished = this.alpha <= 0;
//   }

//   display() {
//     fill(255);
//     ellipse(this.x, this.y, this.size, this.size);
//   }
// }


class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(2, 5);
    this.color = color(255, 0, 0); // Set color to white
    this.speed = createVector(random(-2, 2), random(-2, 2));
    this.alpha = 255;
  }

  update() {
    this.x += this.speed.x;
    this.y += this.speed.y;
    this.alpha -= 5;
  }

  display() {
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
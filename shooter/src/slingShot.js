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

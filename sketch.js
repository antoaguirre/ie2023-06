let particles = [];
let numOfParticles = 300;
let maxAge = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 300, 100, 100, 1);
  blendMode(BLEND);

  for (let i = 0; i < numOfParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(0);

  for (let particle of particles) {
    let ageNormalized = map(particle.age, 0, maxAge, 0, 1);
    let hue = map(particle.pos.x, 0, width, 260, 300);
    let saturation = map(particle.pos.y, 0, height, 50, 100);
    
    // Variaciones de posición basadas en ruido
    let angle = noise(particle.pos.x * 0.005, particle.pos.y * 0.005, frameCount * 0.01) * TWO_PI;
    let velocity = p5.Vector.fromAngle(angle);
    particle.move(velocity);

    // Modificación de propiedades visuales
    particle.display(ageNormalized, hue, saturation);
    particle.updateAge();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.age = 0;
    this.size = random(5, 15);
  }

  move(velocity) {
    this.pos.add(velocity);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }

  updateAge() {
    this.age++;
    if (this.age > maxAge) {
      this.pos.x = random(width);
      this.pos.y = random(height);
      this.age = 0;
    }
  }

  display(ageNormalized, hue, saturation) {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.age * 0.1);

    // Modificación visual basada en la edad de la partícula
    let particleSize = this.size + (this.size * ageNormalized * 10);
    let particleAlpha = map(ageNormalized, 0, 1, 1, 0);

    let fadeToDarkPurple = map(ageNormalized, 0, 1, 70, 30);
    
    fill(hue, saturation, fadeToDarkPurple, particleAlpha);
    blendMode(BLEND);
    noStroke();
    ellipse(0, 0, particleSize, particleSize);
    pop();
  }
}


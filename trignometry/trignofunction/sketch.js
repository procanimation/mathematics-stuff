// Procanimation World — Trigonometric Function & Fourier Wave Synthesis
// Formula: Square(t) = (4/pi) * sum_{n=1}^N [ sin((2n-1)omega t) / (2n-1) ]

let time = 0;
let wave = [];
let numEpicycles = 12;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(7, 9, 14);
  translate(width * 0.3, height * 0.5);

  let x = 0;
  let y = 0;

  for (let i = 0; i < numEpicycles; i++) {
    let prevx = x;
    let prevy = y;

    let n = i * 2 + 1;
    let radius = 120 * (4 / (n * PI));
    x += radius * cos(n * time);
    y += radius * sin(n * time);

    // Orbit Circle
    stroke(76, 201, 240, 50);
    noFill();
    strokeWeight(1);
    ellipse(prevx, prevy, radius * 2);

    // Radius Vector Line
    stroke(0, 245, 212, 180);
    line(prevx, prevy, x, y);
    fill(0, 245, 212);
    circle(x, y, 4);
  }

  wave.unshift(y);
  if (wave.length > 600) {
    wave.pop();
  }

  // Projection Line
  stroke(247, 37, 133, 160);
  line(x, y, width * 0.2, wave[0]);

  // Synthesized Wave Path
  stroke(247, 37, 133);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let i = 0; i < wave.length; i++) {
    vertex(i + width * 0.2, wave[i]);
  }
  endShape();

  // Telemetry HUD
  fill(255);
  noStroke();
  textSize(14);
  textFont('monospace');
  text("TRIGONOMETRY & FOURIER WAVE SYNTHESIS", -width * 0.25, -height * 0.4);
  text(`Epicycle Harmonics: N = ${numEpicycles}`, -width * 0.25, -height * 0.4 + 24);
  text(`Phase Angle: ${(time % (2 * PI)).toFixed(2)} rad`, -width * 0.25, -height * 0.4 + 48);

  time += 0.03;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

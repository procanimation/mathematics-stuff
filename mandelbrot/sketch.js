// Procanimation World — The Mandelbrot Deep Zoom
// Mathematical Formula: z_{n+1} = z_n^2 + c in Complex Plane C
// Continuous Logarithmic Potential Shading: nu = n + 1 - ln(ln|z|) / ln(2)

let centerX = -0.7;
let centerY = 0.0;
let zoom = 1.0;
let maxIterations = 100;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
}

function draw() {
  loadPixels();
  let scale = 3.0 / (zoom * min(width, height));
  let startRe = centerX - (width / 2.0) * scale;
  let startIm = centerY - (height / 2.0) * scale;

  for (let py = 0; py < height; py++) {
    let cIm = startIm + py * scale;
    for (let px = 0; px < width; px++) {
      let cRe = startRe + px * scale;

      let zRe = 0.0;
      let zIm = 0.0;
      let iter = 0;

      // Cardioid check optimization
      let crMinusQuarter = cRe - 0.25;
      let q = crMinusQuarter * crMinusQuarter + cIm * cIm;
      if (q * (q + crMinusQuarter) <= 0.25 * cIm * cIm) {
        setPixel(px, py, 6, 9, 14);
        continue;
      }

      while (zRe * zRe + zIm * zIm <= 4.0 && iter < maxIterations) {
        let nextRe = zRe * zRe - zIm * zIm + cRe;
        zIm = 2.0 * zRe * zIm + cIm;
        zRe = nextRe;
        iter++;
      }

      if (iter === maxIterations) {
        setPixel(px, py, 6, 9, 14);
      } else {
        let modZ = Math.sqrt(zRe * zRe + zIm * zIm);
        let smoothIter = iter + 1.0 - Math.log(Math.max(1.0, Math.log(modZ))) / Math.LN2;
        let t = smoothIter / maxIterations;

        let r = Math.floor(Math.sin(t * Math.PI * 4.0 + 0.5) * 127 + 128);
        let g = Math.floor(Math.sin(t * Math.PI * 4.0 + 2.5) * 127 + 128);
        let b = Math.floor(Math.sin(t * Math.PI * 4.0 + 4.5) * 127 + 128);
        setPixel(px, py, r, g, b);
      }
    }
  }
  updatePixels();

  // Telemetry HUD
  fill(255);
  noStroke();
  textSize(14);
  textFont('monospace');
  text(`Target: ${centerX.toFixed(6)} + ${centerY.toFixed(6)}i`, 20, 30);
  text(`Zoom: ${zoom.toFixed(1)}x`, 20, 50);
  text(`Iterations: ${maxIterations}`, 20, 70);
  text(`Drag to Pan • Mouse Wheel to Zoom`, 20, 90);
}

function setPixel(x, y, r, g, b) {
  let idx = (x + y * width) * 4;
  pixels[idx] = r;
  pixels[idx + 1] = g;
  pixels[idx + 2] = b;
  pixels[idx + 3] = 255;
}

function mousePressed() {
  isDragging = true;
  dragStartX = mouseX;
  dragStartY = mouseY;
}

function mouseReleased() {
  isDragging = false;
}

function mouseDragged() {
  let scale = 3.0 / (zoom * min(width, height));
  let dx = mouseX - dragStartX;
  let dy = mouseY - dragStartY;
  dragStartX = mouseX;
  dragStartY = mouseY;
  centerX -= dx * scale;
  centerY -= dy * scale;
  redraw();
}

function mouseWheel(event) {
  let factor = event.delta < 0 ? 1.25 : 0.8;
  zoom *= factor;
  maxIterations = min(400, floor(80 + Math.log10(max(1, zoom)) * 35));
  redraw();
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

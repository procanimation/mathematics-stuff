# The Mandelbrot Deep Zoom (p5.js)

Procedural exploration of the Mandelbrot Set in the complex plane $\mathbb{C}$ using continuous logarithmic potential shading.

## Mathematical Formulation

$$z_0 = 0$$
$$z_{n+1} = z_n^2 + c$$
$$M = \left\{ c \in \mathbb{C} : \lim_{n \to \infty} |z_n| \neq \infty \right\}$$

### Continuous Potential Shading
To prevent discrete color banding, we renormalize the escape index using the continuous potential function:
$$\nu(z) = k + 1 - \frac{\ln(\ln|z_{k}|)}{\ln 2}$$

## Features
- Real-time mouse panning & cursor-centered zoom
- Continuous potential coloring across millions of zoom steps
- Main cardioid and period-2 bulb bailout optimization

## Live Interactive Web Lab
Explore the full simulation and mathematical breakdown:
👉 [https://procanimation.github.io/experiments/mandelbrot-deep-zoom.html](https://procanimation.github.io/experiments/mandelbrot-deep-zoom.html)

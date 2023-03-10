// Dotted Polygon
function makePolygon(xPos, yPos, radius, numPoints, arr, color, show) {
  let arc = (Math.PI * 2) / numPoints;
  let ang = 0; // the shape starts at angle 0 (east)

  c.beginPath();
  for (let i = 0; i <= numPoints; i++) {
    let x = xPos - radius * Math.cos(ang);
    let y = radius * Math.sin(ang) + yPos;

    // Toggle outline visibility
    if (show) {
      c.fillStyle = color;
      c.lineTo(x, y);
      c.fill();
    }

    // Push points to an associated array
    if (arr != null) {
      arr.push({ x: x, y: y });
    }

    ang += arc;
  }
  if (show) {
    c.lineTo(xPos - radius * Math.cos(0), radius * Math.sin(0) + yPos);
    c.stroke();
  }
}

// Interpolation functions
function lerpLine(a, b, t) {
  let nx = a[0] + (b[0] - a[0]) * t;
  let ny = a[1] + (b[1] - a[1]) * t;
  return { x: nx, y: ny };
}

function lerpCurve(a, b, c, t) {
  let nx = (1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * b[0] + t * t * c[0];
  let ny = (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * b[1] + t * t * c[1];
  return { x: nx, y: ny };
}

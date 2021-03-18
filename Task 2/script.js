const canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");
const out = document.getElementById("out");
const brush = document.getElementById("brush");
const color = document.getElementById("color");

color.addEventListener("input", () => {
  ctx.strokeStyle = color.value;
});

brush.addEventListener("input", (event) => {
  console.log(brush.value);
  ctx.lineWidth = brush.value;
  out.textContent = brush.value;
  out.style.left = (brush.value * 6)  + "px";
});

canvas.addEventListener("mousemove", (event) => {
  let x = event.offsetX,
    y = event.offsetY,
    mx = event.movementX,
    my = event.movementY;

  if (event.buttons > 0) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - mx, y - my);
    ctx.stroke();
    ctx.closePath();
  }
});

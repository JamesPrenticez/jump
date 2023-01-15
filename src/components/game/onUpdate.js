export function onUpdate(ctx, canvasWidth, canvasHeight, framesLastSecond) {
  // Clear Canvas
  ctx.clearRect(0 , 0, canvasWidth, canvasHeight)
  ctx.fillStyle = "black"
  ctx.fillRect(20, 20, 150, 100);

  // Frame Rate
  ctx.font = 'bold 25px serif';
  ctx.fillStyle = "#ff0000"
  ctx.fillText("FPS: " + framesLastSecond, 10, 30)

  ctx.fillStyle = 'red'
  ctx.beginPath()
  ctx.arc(250, 250, 20, 0, 2*Math.PI)
  ctx.fill()
}

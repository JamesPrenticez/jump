import React, { useRef, useEffect } from 'react'
// ====================================================================================== 
//  Canvas 
// ====================================================================================== 

import { Player } from '../game/player'
import { Controls } from '../game/controls'


let canvasWidth = 500
let canvasHeight = 500

let fps = 30
let fpsInterval = 1000 / fps
let frameCount = 0

let startTime = window.performance.now()
let now = window.performance.now()
let then = window.performance.now()
let elapsed

export const Canvas = props => {

  const canvasRef = useRef(null)

    useEffect(() => {
      let timestamp
      
      // Context
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      const player = new Player()
      player.name = "james"
      player.controls = new Controls(canvas, "player")
      

      const render = (newtime) => {
        now = newtime
        elapsed = now - then

        window.requestAnimationFrame(render)

        //Throttle FPS 
        if (elapsed >= fpsInterval) {
          then = now - (elapsed % fpsInterval)

          let sinceStart = now - startTime
          let currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100

          // Do Stuff
          resizeCanvasToDisplaySize(canvas)
          mainDraw(ctx, player, currentFps)
        }
        
        
      }
      
      render()

      return () => {
        window.cancelAnimationFrame(timestamp)
      }


    }, [mainDraw])
  
  return <canvas ref={canvasRef} tabIndex={0} className="ring-2 ring-red-500 focus:ring-green-500 select-none box-border rounded-md outline-none"/>
}

// ====================================================================================== 
// Main Draw
// ====================================================================================== 
function mainDraw(ctx, player, frameCount){
        ctx.clearRect(0 , 0, canvasWidth, canvasHeight)

        // BG color
        ctx.clearRect(0 , 0, canvasWidth, canvasHeight)
        ctx.fillStyle = "black"
        ctx.fillRect(0 , 0, canvasWidth, canvasHeight)

        // Frame Rate
        ctx.font = 'bold 25px serif';
        ctx.fillStyle = "#ff0000"
        ctx.fillText("FPS: " + frameCount, 10, 30)
        
        // draw player
        player.update(ctx)
}

// ====================================================================================== 
// Resize 
// ====================================================================================== 
function resizeCanvasToDisplaySize(canvas) {
    
  const width = 500 //window.innerWidth - 100
  const height = 500 //window.innerHeight - 100

  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio:ratio=1 } = window
    const context = canvas.getContext('2d')
    canvas.width = width*ratio
    canvas.height = height*ratio
    context.scale(ratio, ratio)
    return true
  }

  return false
}
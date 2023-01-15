import React, { useRef, useEffect } from 'react'
// ====================================================================================== 
//  Canvas 
// ====================================================================================== 
import { Frame } from '../game/frame'
import { onUpdate } from '../game/onUpdate'

import { Player } from '../game/player'
import { Controls } from '../game/controls'


let canvasWidth = 500
let canvasHeight = 500

export const Canvas = props => {
  const canvasRef = useRef(null)

    const player = new Player()
    const frame = new Frame(0, 0, 0)
    
    useEffect(() => {
      let timestamp
      
      
      // Context
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      player.name = "james"
      player.controls = new Controls(canvas, "player")

      const render = (timestamp) => {
        
        frame.setCurrentFrame()
        resizeCanvasToDisplaySize(canvas)

        // DRAW
        // Clear Canvas
        ctx.clearRect(0 , 0, canvasWidth, canvasHeight)
        
        // BG color
        ctx.clearRect(0 , 0, canvasWidth, canvasHeight)
        ctx.fillStyle = "goldenrod"
        ctx.fillRect(0 , 0, canvasWidth, canvasHeight)

        // Frame Rate
        ctx.font = 'bold 25px serif';
        ctx.fillStyle = "#ff0000"
        ctx.fillText("FPS: " + frames.framesLastSecond, 10, 30)
        
        // draw player
        player.update(ctx)
        
        timestamp = window.requestAnimationFrame(render)
      }
      
      render(timestamp)
      
      return () => {
        window.cancelAnimationFrame(timestamp)
      }
    }, [onUpdate])
  
  return <canvas ref={canvasRef} tabIndex={0} className="ring-2 ring-red-500 focus:ring-green-500 select-none box-border rounded-md outline-none"/>
}

// ====================================================================================== 
// Frame Rate
// ====================================================================================== 


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
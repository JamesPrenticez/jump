import {useEffect, useRef} from 'react'

import { Player } from '../game/player'
import { Controls } from '../game/controls'
// import { handleKeyDown, handleKeyUp } from '../game/movement'


export const Canvas = ({height, width}) => {
  const canvasRef = useRef()
  
  const player = new Player()
  player.name = "james"
  
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    player.ctx = ctx
    player.controls = new Controls(canvasRef.current, "player")

    
    // Event Listeners for key down/up
    // canvasRef.current.addEventListener('keydown', (e) => handleKeyDown(e, player))
    // canvasRef.current.addEventListener('keyup', (e) => handleKeyUp(e, player))

    // Draw
    player.update(ctx)

  })
  
  return (
    <canvas ref={canvasRef} height={height} width={width}  tabIndex={0} className="ring-2 ring-red-500 focus:ring-green-500 select-none box-border rounded-md outline-none"/>
  )
}
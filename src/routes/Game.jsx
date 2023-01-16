import React from 'react'
import { Canvas } from '../components/canvas/Canvas'


export default function Game() {
  


  return (
    <>
    <Canvas 
      height={500}
      width={500}
      />

    <img src="./agent.png" alt="" />
    </>
  )
}

import { Canvas } from "../canvas/Canvas"

const canvasHeight = 500
const canvasWidth = 500

export class Player{
  constructor(ctx, controls, name){
      this.ctx = ctx
      this.name = name,
      this.img = new Image()
      this.img.src = './character.png'
  
      this.width = 50,
      this.height = 50,
  
      this.frameX = 5,
      this.frameY = 0,
    
      this.position = {x: 250, y: 250}
      this.velocity = {x: 0, y: 0}
      this.gravity = 0.2

      this.friction = 0.125
      this.acceleration = 2
      this.jump = 0.50
      this.maxSpeed = 1
      this.action = 'down'
  
      this.w = false
      this.a = false
      this.s = false
      this.d = false

      this.controls = controls
  }

  update(ctx){
    this.frames()
    this.applyGravity()
    this.updatePosition()
    this.move()
    this.draw(ctx)
  }



  // y
  applyGravity(){
    if(this.position.y + this.height + this.velocity.y >= canvasHeight){
      this.velocity.y = 0
    } else {
      this.velocity.y += this.gravity
    }
  }

  // // x
  // friction(){
  //   if(this.speed > 0){
  //     this.speed -= this.friction
  //   }

  //   if(this.speed < 0){
  //     this.speed += this.friction
  //   }

  //   //fix slight movement bug
  //   if(Math.abs(this.speed) < this.friction){
  //     this.speed = 0
  //   }
  // }

  updatePosition(){
    this.position.y += this.velocity.y
  }


  move(){
    // Up
    if(this.controls.w){
      if(this.velocity.y <= -1) return
      this.velocity.y += -this.acceleration
      this.action = 'up'
    }

    // Down
    if(this.controls.s){
      if(this.velocity.y >= 1) return
      this.velocity.y += this.speed
      this.action = 'down'
    }
    
    
    // Left
    if(this.controls.a){
      if(this.velocity.x <= -1) return
      this.velocity.x += -this.speed
      this.action = 'right'
    }

    // Right
    if(this.controls.d){
      if(this.velocity.x >= 1) return
      this.velocity.x += this.speed
      this.action = 'left'
    }


    // Right
    if(this.controls.d){
      if(this.velocity.x >= 1) return
      this.velocity.x += 0.01
      this.action = 'left'
    }

    // Diagonals
    if(this.controls.w && this.controls.d){
      this.action = 'top right'
    }
    if(this.controls.w && this.controls.a){
      this.action = 'top left'
    }
    if(this.controls.s && this.controls.d){
      this.action = 'bottom right'
    }
    if(this.controls.a && this.controls.s){
      this.action = 'bottom left'
    }

  }

  frames(){
    if(this.controls.w | this.controls.a | this.controls.s | this.controls.d){
      if(this.frameY >= 7 ) this.frameY = 0
      this.frameY++
    } else {
      this.frameY = 0
    }

    switch(this.action){
      case 'up':
        this.frameX = 1
        break
      case 'top right':
        this.frameX = 2
        break
      case 'right':
        this.frameX = 7
        break
      case 'bottom right':
        this.frameX = 4
        break
      case 'down':
        this.frameX = 5
        break
      case 'bottom left':
        this.frameX = 6
        break
      case 'left':
        this.frameX = 3
        break
      case 'top left':
        this.frameX = 0 
        break
    }
  }

  draw(ctx){
    ctx.fillStyle = 'red'
    ctx.beginPath()
    // ctx.arc(this.position.x, this.position.y, 20, 0, 2*Math.PI)
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    ctx.fill()

    // Draw player stats
    ctx.font = 'bold 25px serif';
    ctx.fillStyle = "#000000"
    ctx.fillText("pos x:" + Math.floor(this.position.x) + " y:" + Math.floor(this.position.y), 10, 450)
    ctx.fillText("vol x:" + Math.floor(this.velocity.x) + " y:" + Math.floor(this.velocity.y), 10, 490)
  }
}
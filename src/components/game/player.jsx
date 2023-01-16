const canvasHeight = 500
const canvasWidth = 500

export class Player{
  constructor(ctx, controls, name){
      this.ctx = ctx
      this.name = name,
      this.width = 37,
      this.height = 56,
      
      this.img = new Image()
      this.img.src = './agent.png'
  
      this.action = 'down'
      this.spriteSheetFrameX = 0,
      this.spriteSheetFrameY = 0,
      this.spriteSheetWidth = 32,
      this.spriteSheetHeight = 32,
    
      this.position = {x: 250, y: 250}
      this.velocity = {x: 0, y: 0}
      this.gravity = 0.02
      this.friction = 0.02

      this.acceleration = 0.1
      this.maxSpeed = 1
  
      this.w = false
      this.a = false
      this.s = false
      this.d = false

      this.jump = {isOnCooldown: false, duration: 1000}

      this.controls = controls
  }

  update(ctx){
    this.frames()
    this.applyGravity()
    this.applyFriction()
    this.updatePosition()
    this.move()
    this.draw(ctx)
    this.drawPlayerSprite(ctx)
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
  applyFriction(){
    if(this.velocity.x > 0){
      this.velocity.x -= this.friction
    }

    if(this.velocity.x < 0){
      this.velocity.x += this.friction
    }

    //fix slight movement bug
    if(Math.abs(this.velocity.x) < this.friction){
       this.velocity.x = 0
    }
  }

  updatePosition(){
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
  }


  move(){
    // Up
    if(this.controls.w){
      if(this.velocity.y <= -this.maxSpeed) return
      // console.log(this.jump.isOnCooldown)
      if(this.jump.isOnCooldown) return
      this.velocity.y += -(this.acceleration + 5)
      this.action = 'up'
    } else if (!this.controls.w) {
      this.velocity.y += this.acceleration
    }

    // Down
    if(this.controls.s){
      if(this.velocity.y >= this.maxSpeed) return
      this.velocity.y += this.acceleration
      this.action = 'down'
    }

    // Right
    if(this.controls.d){
      if(this.velocity.x >= this.maxSpeed) return
      this.velocity.x += this.acceleration
      this.action = 'left'
    }
    
    // Left
    if(this.controls.a){
      if(this.velocity.x <= -this.maxSpeed) return
      this.velocity.x += -this.acceleration
      this.action = 'right'
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

  //https://stackoverflow.com/questions/8168217/html-canvas-how-to-draw-a-flipped-mirrored-image
  // Animate()

  drawPlayerSprite(ctx){
    // Source > Destination
    ctx.drawImage(
      this.img, //img
      this.spriteSheetFrameX * this.spriteSheetWidth, //sX
      this.spriteSheetFrameY * this.spriteSheetHeight, //sY
      this.spriteSheetWidth, //sW
      this.spriteSheetHeight, //sH
      this.position.x, //dX 
      this.position.y, //dY
      this.width, //dW
      this.height //dH
    )
  }
}
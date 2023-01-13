
export class Player{
  constructor(ctx, controls, name){
      this.ctx = ctx
      this.name = name,
      this.img = new Image()
      this.img.src = './character.png'
  
      this.width = 39,
      this.height = 52,
  
      this.frameX = 5,
      this.frameY = 0,
  
      this.x = 250,
      this.y = 100,
  
      this.speed = 0
  
      this.action = 'down'
  
      this.w = false
      this.a = false
      this.s = false
      this.d = false

      this.controls = controls
  }

  update(ctx){
    this.frames()
    this.move()
    this.draw(ctx)
  }



  move(){
    if(this.controls.w){
      this.y -= 1
      this.action = 'up'
    }
    if(this.controls.a){
      this.x -= 1
      this.action = 'right'
    }

    if(this.controls.s){
      this.y += 1
      this.action = 'down'
    }

    if(this.controls.d){
      this.x += 1
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
    ctx.arc(this.x, this.y, 20, 0, 2*Math.PI)
    ctx.fill()
  }
}
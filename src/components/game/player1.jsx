export class Player{
  constructor(ctx, controls){
    this.img = new Image()
    this.img.src = './character.png'

    this.width = 39,
    this.height = 52,

    this.frameX = 4,
    this.frameY = 0,

    this.x = 100,
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
    this.#frames()
    this.#move()
    this.#draw(ctx)

  }
  
  #move(){
    if(this.controls.w){
      this.y -= 10;
      this.action = 'up'
    }
    if(this.controls.a){
      this.x -= 10
      this.action = 'right'
    }

    if(this.controls.s){
      this.y += 10
      this.action = 'down'
    }

    if(this.controls.d){
      this.x += 10
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

  #frames(){
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

  #draw(ctx){
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(
      this.img, //image
      this.width * this.frameX, // source x
      this.height * this.frameY, // source y
      this.width, // source width
      this.height, // source height
      this.x, // x
      this.y, // y
      this.width * 4, // destination width
      this.height * 4, // destination height
    )


  }
}
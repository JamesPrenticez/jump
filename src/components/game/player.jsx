export class Player{
  constructor(ctx, controls){
    this.img = new Image()
    this.img.src = './spritesheet/idel.png'

    this.width = 48,
    this.height = 48,

    this.spriteSheetFrameX = 0,
    this.spriteSheetFrameY = 0,
    this.spriteSheetFrameXMax = 7

    this.x = 10,
    this.y = 10,

    this.speed = 0

    this.action = 'idel'

    this.w = false
    this.a = false
    this.s = false
    this.d = false

    this.controls = controls
  }

  update(ctx){
    this.#animate()
    this.#frames()
    this.#move()
    this.#draw(ctx)

  }

  #animate(){
    // If action not idel
    if (this.spriteSheetFrameX < this.spriteSheetFrameXMax) this.spriteSheetFrameX ++
    else this.spriteSheetFrameX = 0
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

    if(!this.controls.w && !this.controls.a && !this.controls.s && !this.controls.d){
      this.action = 'idel'
    }
  }

  #frames(){
    switch(this.action){
      case 'idel':
        this.img.src = './spritesheet/idel.png'
        this.spriteSheetFrameXMax = 9
        break
      case 'up':
        this.img.src = './spritesheet/jump.png'
        this.spriteSheetFrameXMax = 3
        break
      case 'right':
        this.img.src = './spritesheet/run.png'
        this.spriteSheetFrameXMax = 7
        break
      case 'down':
        this.img.src = './spritesheet/land.png'
        this.spriteSheetFrameXMax = 3
        break
      case 'left':
        this.img.src = './spritesheet/run.png'
        this.spriteSheetFrameXMax = 7
        break
    }
  }

  #draw(ctx){
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(
      this.img, //image
      this.width * this.spriteSheetFrameX, // source x
      this.height * this.spriteSheetFrameY, // source y
      this.width, // source width
      this.height, // source height
      this.x, // x
      this.y, // y
      this.width * 2, // destination width
      this.height * 2, // destination height
    )


  }
}

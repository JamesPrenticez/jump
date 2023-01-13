export class Controls{
  constructor(canvas, type){
      this.canvas = canvas
      this.up = false
      this.left = false
      this.down = false
      this.right = false
      this.plus = false
      this.minus = false

      switch(type){
        case "player":
          this.#playerControls()
          break
      }
    }

  
    #playerControls(){
      this.canvas.addEventListener('keydown', (e) => {
        switch(e.key){
          case "w":
            this.w = true
            break
          case "a":
            this.a = true
            break
          case "s":
            this.s = true
            break
          case "d":
            this.d = true
            break
        }
      })
      this.canvas.addEventListener('keyup', (e) => {
        switch(e.key){
          case "w":
            this.w = false
            break
          case "a":
            this.a = false
            break
          case "s":
            this.s = false
            break
          case "d":
            this.d = false
            break
        }
      })
    }
}
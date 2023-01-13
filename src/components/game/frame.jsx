

export class Frame{
  constructor(currentSecond, frameCount, lastFrameTime){
      this.currentSecond = currentSecond
      this.frameCount = frameCount
      this.lastFrameTime = lastFrameTime
      this.framesLastSecond = 0
  }

  setCurrentFrame(){
    let now = Math.floor(Date.now()/1000)
   // console.log("now:", now, "currentSecond",this.currentSecond, "lastFrame",this.lastFrameTime)

    if(now != this.currentSecond){
        this.currentSecond = now
        this.framesLastSecond = this.frameCount
        this.frameCount = 1
    } else {
        this.frameCount ++
    }

    let currentFrameTime = Math.floor(Date.now()/1000)
    this.lastFrameTime = currentFrameTime
  }
}


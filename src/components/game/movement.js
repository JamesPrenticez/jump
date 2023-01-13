export function handleKeyDown (e, player) {
  console.log(player)
    if (e.repeat) return
    if (e.key === 'ArrowUp') e.preventDefault()
      e.preventDefault()

      if (e.key === 'w') player.pressingUp = true //socket.emit("keyPress", {inputId:"up", state: true}) 
      // else if (e.key === 'a') socket.emit("keyPress", {inputId:"left", state: true})
      // else if (e.key === 's') socket.emit("keyPress", {inputId:"down", state: true})
      // else if (e.key === 'd') socket.emit("keyPress", {inputId:"right", state: true})

  }


export function handleKeyUp(e, player){
    e.preventDefault()
    if (e.key === 'w') player.pressingUp = false //socket.emit("keyPress", {inputId:"up", state: false})
    // else if (e.key === 'a') socket.emit("keyPress", {inputId:"left", state: false})
    // else if (e.key === 's') socket.emit("keyPress", {inputId:"down", state: false})
    // else if (e.key === 'd') socket.emit("keyPress", {inputId:"right", state: false})
  }



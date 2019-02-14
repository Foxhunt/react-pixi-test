import React, { useState, useCallback } from "react"
import { useApp, useTick } from "@inlet/react-pixi"

import Circle from "./circle"

const Ball = () => {
  const app = useApp()

  const [active, setActive] = useState(false)
  const [count, setCount] = useState(Math.PI * 1.5)

  const tick = useCallback(d => {
    if (active) {
      setCount(count => count + d * 0.02)
    }
  }, [active])

  useTick(tick)

  const x = app.view.width / 2 + Math.cos(count + Math.PI * 0.5) * 100
  const y = app.view.height / 2 + Math.cos(count) * 100

  return <Circle
    interactive
    x={ x }
    y={ y }
    radius={ 50 }
    fill={ 0xffffff }
    line={ 0x000000 }
    pointerover={ () => {
      setActive(true)
    } }
    pointerout={ () => {
      setActive(false)
    } } />
}

export default Ball

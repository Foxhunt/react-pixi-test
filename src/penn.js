import React, { useState } from "react"
import { Graphics, Container, useTick, useApp } from "@inlet/react-pixi"

function sin(x) {
  return Math.sin(x / 800 * 2 * Math.PI)
}

function oscillate(input, min, max) {
  const range = max - min
  const out = min + Math.abs((input + range) % (range * 2) - range)
  return out
}

const Penn = () => {
  const app = useApp()
  const width = app.view.width
  const height = app.view.height

  const [time, setTime] = useState(1)
  const [frequenz, setFrequenz] = useState(1)
  const [amplitude, setAmplitude] = useState(400)

  useTick(d => {
    setTime(t => t + d)
    setAmplitude(oscillate(time, 0, 200))
    setFrequenz(oscillate(time * 0.02, 1, 10))
  })

  return (
    <Container>
      <Graphics
        draw={
          g => {
            g.clear()
            g.lineStyle(2, 0xffffff, true)
            g.moveTo(0, sin(0 * frequenz + time) * amplitude + height / 2)
            for (let i = 0; i <= 800; i++) {
              g.lineTo(i, sin(i * frequenz + time) * amplitude + height / 2)
            }
          }
        } />
    </Container>
  )
}


export default Penn

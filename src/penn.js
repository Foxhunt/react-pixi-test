import React, { useState, useRef } from "react"
import { Graphics, Container, useTick, useApp } from "@inlet/react-pixi"
import Tumult from "tumult"

import Filter from "./Filter"

function sin(x) {
  return Math.sin(x / 800 * 2 * Math.PI)
}

function oscillate(input, min, max) {
  const range = max - min
  const out = min + Math.abs((input + range) % (range * 2) - range)
  return out
}

const alphaFilter = new Filter()

const Penn = () => {
  const app = useApp()
  const height = app.view.height
  const width = app.view.width

  const [time, setTime] = useState(1)
  const [frequenz, setFrequenz] = useState(5)
  const [amplitude, setAmplitude] = useState(200)

  useTick(d => {
    setTime(t => t + d * 2)
    // setAmplitude(oscillate(time * 0.3, 0, 200))
    // setFrequenz(oscillate(time * 0.0000001, -2, 2))
  })

  const tumult = useRef(new Tumult.Simplex2())
  const rngFreq = tumult.current.gen(time * 0.0006, time * 0.0006)
  const rngAmp = tumult.current.gen(time * 0.0001, time * 0.0008)

  return (
    <Container
      position={ [width / 2, height / 2] }
      filters={ [alphaFilter] }>
      <Graphics
        draw={
          g => {
            g.clear()
            g.lineStyle(4, 0xff9966)
            g.moveTo(-600, sin(-600 * frequenz + time) * amplitude)
            for (let i = -600; i <= 600; i++) {
              g.lineTo(i, amplitude * rngAmp * sin(i * frequenz * rngFreq + time))
            }
          }
        } />
      <Graphics
        draw={
          g => {
            g.clear()
            g.lineStyle(4, 0x6699ff)
            g.moveTo(-600, sin(-600 * frequenz + time) * amplitude)
            for (let i = -600; i <= 600; i++) {
              g.lineTo(i, sin(i * frequenz + time) * amplitude)
            }
          }
        } />
    </Container>
  )
}


export default Penn

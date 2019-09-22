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
  const [frequenz, setFrequenz] = useState(-2)
  const [amplitude, setAmplitude] = useState(height / 2)

  const tumult = useRef(new Tumult.Simplex2())
  const rngFreq = tumult.current.gen(time * 0.0006, time * 0.0006)
  const rngAmp = tumult.current.gen(time * 0.0001, time * 0.0008)
  const rngTime = tumult.current.gen(time * 0.00001, time * 0.0002)

  useTick(d => {
    setTime(time + d)
    setAmplitude(oscillate(time * 0.3, 100 * rngAmp, height / 2))
    setFrequenz(oscillate(time * 0.0000001, -2, 7))
  })

  return (
    <Container
      position={ [width / 2, height / 2] }
      filters={ [alphaFilter] }>
      <Graphics
        draw={
          g => {
            g.clear()
            g.lineStyle(4, 0xff9966)
            g.moveTo(-width / 2, amplitude * rngAmp * sin(-width / 2 * frequenz * rngFreq + time) * sin(-width / 2 + time * rngTime))
            for (let i = -width / 2; i <= width / 2; i++) {
              g.lineTo(i, amplitude * rngAmp * sin(i * frequenz * rngFreq + time) * sin(i + time * rngTime))
            }
          }
        } />
        <Graphics
          draw={
            g => {
              g.clear()
              g.lineStyle(4, 0xff9966)
              g.moveTo(-width / 2, amplitude * rngAmp * sin(-width / 2 * frequenz * rngFreq - time) * sin(-width / 2 + time * rngTime))
              for (let i = -width / 2; i <= width / 2; i++) {
                g.lineTo(i, amplitude * rngAmp * sin(i * frequenz * rngFreq - time) * sin(i + time * rngTime))
              }
            }
          } />
      <Graphics
        draw={
          g => {
            g.clear()
            g.lineStyle(4, 0x6699ff)
            g.moveTo(-width / 2, amplitude * sin(-width / 2 * frequenz + time * rngTime))
            for (let i = -width / 2; i <= width / 2; i++) {
              g.lineTo(i, amplitude * sin(i * frequenz + time * rngTime))
            }
          }
        } />
        <Graphics
          draw={
            g => {
              g.clear()
              g.lineStyle(4, 0x6699ff)
              g.moveTo(-width / 2, amplitude * sin(-width / 2 * frequenz - time * rngTime))
              for (let i = -width / 2; i <= width / 2; i++) {
                g.lineTo(i, amplitude * sin(i * frequenz - time * rngTime))
              }
            }
          } />
    </Container>
  )
}


export default Penn

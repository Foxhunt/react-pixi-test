import React, { useState, useEffect } from "react"
import { Graphics, Container, useTick, useApp, Sprite } from "@inlet/react-pixi"
import Tumult from "tumult"
import { filters } from "pixi.js"

import Filter from "./Filter"
import Recorder from "./Recorder"

const bunny = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"

function sin(x) {
  return Math.sin(x / 1920 * 2 * 2 * Math.PI)
}

function oscillate(input, min, max) {
  const range = max - min
  const out = min + Math.abs((input + range) % (range * 2) - range)
  return out
}

const alphaFilter = new Filter()
const fxaaFilter = new filters.FXAAFilter()
const someFilter = new filters.NoiseFilter()

const Penn = () => {
  const app = useApp()
  const height = app.view.height
  const width = app.view.width

  const [tumult, setTumult] = useState()
  const [recorder, setRecorder] = useState()
  const [recording, setRecording] = useState(false)

  const [bunnys, setBunnys] = useState([])

  useEffect(() => {
    for (let i = 0; i < 1920 * 2; i += 26) {
      bunnys.push(i)
    }
    setBunnys(bunnys)
  }, [])

  useEffect(() => {
    if (!tumult) {
      setTumult(new Tumult.Simplex2("seeds"))
    }
    if (!recorder) {
      setRecorder(new Recorder(app.view))
    }
    return () => {
      window.onpointerup = null
    }
  }, [recorder, tumult])

  useEffect(() => {
    if (recorder && recording) {
      recorder.start()
    } else if (recorder && !recording && recorder.state !== "inactive") {
      recorder.stop()
    }
  }, [recording])

  const [time, setTime] = useState(1)
  const [frequenz, setFrequenz] = useState(1)
  const [amplitude, setAmplitude] = useState(height / 2)

  const rngFreq = tumult && tumult.gen(time * 0.0002, time * 0.0002)
  const rngAmp = tumult && tumult.gen(time * 0.0001, time * 0.0002)
  const rngTime = tumult && tumult.gen(time * 0.00001, time * 0.0002)

  function ownTick(d) {
    setTime(time + d * 0.6)
    setAmplitude(oscillate(time * 0.1, 100 * rngAmp, height / 2))
    setFrequenz(oscillate(time * 0.001 * rngFreq, 0, 3))
  }

  useTick(ownTick)

  return (
    <Container
      position={ [width / 2, height / 2] }
      filters={ [fxaaFilter, alphaFilter] }>
      <Graphics
        draw={
          g => {
            g.clear()
            g.lineStyle(7, 0xff9966)
            g.moveTo(-width / 2, amplitude * rngAmp *
              sin(-width / 2 * frequenz * rngFreq + time) * sin(-width / 2 + time * rngTime)
            )
            for (let i = -width / 2; i <= width / 2; i++) {
              g.lineTo(i,
                amplitude * rngAmp * sin(i * frequenz * rngFreq + time) * sin(i + time * rngTime)
              )
            }
            g.lineStyle(7, 0x6699ff)
            g.moveTo(-width / 2, amplitude * rngAmp *
              sin(-width / 2 * frequenz * rngFreq - time) * sin(-width / 2 - time * rngTime)
            )
            for (let i = -width / 2; i <= width / 2; i++) {
              g.lineTo(i,
                amplitude * rngAmp * sin(i * frequenz * rngFreq - time) * sin(i - time * rngTime)
              )
            }
            g.lineStyle(7, 0x6699ff)
            g.moveTo(-width / 2, amplitude * sin(-width / 2 * frequenz - time * rngTime))
            for (let i = -width / 2; i <= width / 2; i++) {
              g.lineTo(i, amplitude * sin(i * frequenz - time * rngTime))
            }
            g.lineStyle(7, 0xff9966)
            g.moveTo(-width / 2, amplitude * sin(-width / 2 * frequenz + time * rngTime))
            for (let i = -width / 2; i <= width / 2; i++) {
              g.lineTo(i, amplitude * sin(i * frequenz + time * rngTime))
            }
          }
        } />
      {
        bunnys.map((value, index, array) =>
          <Sprite
            key={ value }
            anchor={ [0.5, 0.5] }
            position={ [
              value - width / 2 + 16,
              amplitude * sin((value - width / 2 + 16) * frequenz - time * rngTime)
            ] }
            interactive
            rotation={ Math.sin(time * 0.01) * 4 }
            image={ bunny }
            pointerdown={ () => {
              array.splice(index, 1)
              setBunnys(array)
              setTimeout(() => {
                bunnys.push(value)
                bunnys.sort()
                setBunnys(bunnys)
              }, 1000)
            } } />)
      }
    </Container>
  )
}


export default Penn

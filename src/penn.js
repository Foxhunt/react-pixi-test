import React, { useState, useEffect } from "react"
import { Graphics, Container, useTick, useApp } from "@inlet/react-pixi"
import Tumult from "tumult"

import Filter from "./Filter"
import Recorder from "./Recorder"

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

  const [tumult, setTumult] = useState()
  const [recorder, setRecorder] = useState()
  const [recording, setRecording] = useState(false)

  useEffect(() => {
    if(!tumult){
      setTumult(new Tumult.Simplex2())
    }
    if(!recorder){
      setRecorder(new Recorder(app.view))
    }
    window.onpointerup = () => {
      setRecording(rec => !rec)
    }
    return () => {
      window.onpointerup = null
    }
  }, [recorder, tumult])

  useEffect(() => {
    if(recorder && recording){
      recorder.start()
    } else if(recorder && !recording && recorder.state !== "inactive") {
      recorder.stop()
    }
  }, [recording])

  const [time, setTime] = useState(1)
  const [frequenz, setFrequenz] = useState(1)
  const [amplitude, setAmplitude] = useState(height / 2)

  const rngFreq =  tumult && tumult.gen(time * 0.0006, time * 0.0006)
  const rngAmp = tumult && tumult.gen(time * 0.0001, time * 0.0002)
  const rngTime = tumult && tumult.gen(time * 0.00001, time * 0.0002)

  function ownTick(d){
    setTime(time + d * .6)
    setAmplitude(oscillate(time * 0.3, 100 * rngAmp, height / 2))
    setFrequenz(oscillate(time * 0.0000001, 1, 7))
  }

  useTick(ownTick)

  return (
    <Container
      position={ [width / 2, height / 2] }
      filters={ [alphaFilter] }>
      <Graphics
        draw={
          g => {
            g.clear()
            g.lineStyle(7, 0xff9966)
            g.moveTo(-width / 2, amplitude * rngAmp * sin(-width / 2 * frequenz * rngFreq + time) * sin(-width / 2 + time * rngTime))
            for (let i = -width / 2; i <= width / 2; i++) {
              g.lineTo(i, amplitude * rngAmp * sin(i * frequenz * rngFreq + time) * sin(i + time * rngTime))
            }
            g.lineStyle(7, 0x6699ff)
            g.moveTo(-width / 2, amplitude * rngAmp * sin(-width / 2 * frequenz * rngFreq - time) * sin(-width / 2 - time * rngTime))
            for (let i = -width / 2; i <= width / 2; i++) {
              g.lineTo(i, amplitude * rngAmp * sin(i * frequenz * rngFreq - time) * sin(i - time * rngTime))
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
    </Container>
  )
}


export default Penn

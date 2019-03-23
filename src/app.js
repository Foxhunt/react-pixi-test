import React, { useState, useEffect } from "react"
import { Stage } from "@inlet/react-pixi"

import Recorder from "./Recorder"

import Penn from "./penn"

const App = () => {
  const [app, setApp] = useState(null)
  const [recorder, setRecorder] = useState(null)
  const [active, setActive] = useState(false)
  const [conRotSpeed, setConRotSpeed] = useState(0.055)
  const [rectPosSpeed, setRectPosSpeed] = useState(0.001)

  useEffect(() => {
    if (app) {
      setRecorder(new Recorder(app.view))
    }
  }, [app])

  useEffect(() => {
    if (active) {
      document.title = "recording"
      if (recorder) {
        recorder.start()
      }
    } else {
      document.title = "not recording"
      if (recorder && recorder.state !== "inactive") {
        recorder.stop()
      }
    }
  }, [active, recorder])

  useEffect(() => {
    window.onkeydown = event => {
      if (event.keyCode === 39) {
        console.log("inc ConRotSpeed")
        setConRotSpeed(val => val + 0.001)
      }
      if (event.keyCode === 37) {
        console.log("dec ConRotSpeed")
        setConRotSpeed(val => val - 0.001)
      }
      if (event.keyCode === 38) {
        console.log("inc RectPosSpeed")
        setRectPosSpeed(val => val + 0.0001)
      }
      if (event.keyCode === 40) {
        console.log("dec RectPosSpeed")
        setRectPosSpeed(val => val - 0.0001)
      }
      if (event.keyCode === 32) {
        if (app) {
          app.renderer.clear()
        }
      }
    }
    return () => {
      window.onkeydown = null
    }
  })

  return (
    <>
      <Stage
        onClick={ () => {
          setActive(!active)
        } }
        width={ 800 }
        height={ 800 }
        options={ {
          antialias: true,
          clearBeforeRender: false,
          preserveDrawingBuffer: true
        } }>
        <Penn
          active={ active }
          conRotSpeed={ conRotSpeed }
          rectPosSpeed={ rectPosSpeed }
          getApp={ setApp } />
      </Stage>
      <div>conRotSpeed: { conRotSpeed }</div>
      <div>rectPosSpeed: { rectPosSpeed }</div>
    </>
  )
}

export default App

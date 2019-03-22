import React, { useState, useEffect } from "react"
import { Stage } from "@inlet/react-pixi"

import Recorder from "./Recorder"

import Penn from "./penn"

const App = () => {
  const [recorder, setRecorder] = useState(null)
  const [recording, setRecording] = useState(true)
  const [conRotSpeed, setConRotSpeed] = useState(0.0325)
  const [rectPosSpeed, setRectPosSpeed] = useState(0.0009)

  useEffect(() => {
    if (recording) {
      document.title = "recording"
      if (recorder) {
        recorder.start()
      }
    } else {
      document.title = "not recording"
      if (recorder) {
        recorder.stop()
      }
    }
  }, [recording, recorder])

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
    }
    return () => {
      window.onkeydown = null
    }
  })

  return (
    <>
      <Stage
        onClick={ () => {
          setRecording(!recording)
        } }
        width={ 800 }
        height={ 800 }
        options={ {
          antialias: true,
          clearBeforeRender: false,
          preserveDrawingBuffer: true
        } }>
        <Penn
          conRotSpeed={ conRotSpeed }
          rectPosSpeed={ rectPosSpeed }
          getApp={ app => setRecorder(new Recorder(app.view)) } />
      </Stage>
      <div>conRotSpeed: { conRotSpeed }</div>
      <div>rectPosSpeed: { rectPosSpeed }</div>
    </>
  )
}

export default App

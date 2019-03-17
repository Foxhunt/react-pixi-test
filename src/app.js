import React, { useState, useEffect } from "react"
import { Stage } from "@inlet/react-pixi"

import Recorder from "./Recorder"

import Penn from "./penn"

const App = () => {
  const [recorder, setRecorder] = useState(null)
  const [recording, setRecording] = useState(false)
  const [conRotSpeed, setConRotSpeed] = useState(0.03)
  const [rectPosSpeed, setRectPosSpeed] = useState(0.0003)

  useEffect(() => {
    if (recording) {
      document.title = "recording"
    } else {
      document.title = "not recording"
    }
  }, [recording])

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
    <Stage
      onClick={ () => {
        if (recording) {recorder.stop()} else {recorder.start()}
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
  )
}

export default App

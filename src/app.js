import React, { useState, useEffect } from "react"
import { Stage } from "@inlet/react-pixi"

import Recorder from "./Recorder"

import Penn from "./penn"

const App = () => {
  const [recorder, setRecorder] = useState(null)
  const [recording, setRecording] = useState(false)

  useEffect(() => {
    if (recording) {
      document.title = "recording"
    } else {
      document.title = "not recording"
    }
  }, [recording])

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
        getApp={ app => setRecorder(new Recorder(app.view)) } />
    </Stage>
  )
}

export default App

import React, { useState } from "react"
import { Stage } from "@inlet/react-pixi"

import Recorder from "./Recorder"

import Penn from "./penn"

const dimension = 600

const App = () => {
  const [recorder, setRecorder] = useState(null)
  const [recording, setRecording] = useState(false)

  return (
    <>
      <Stage
        width={ dimension }
        height={ dimension }
        options={ {
          antialias: true,
          clearBeforeRender: false,
          preserveDrawingBuffer: true
        } }>
        <Penn
          getApp={ app => {if (!recorder) {setRecorder(new Recorder(app.view))}} } />
      </Stage>
      <div
        onClick={ () => {
          if (recording) {recorder.stop()} else {recorder.start()}
          setRecording(!recording)
        } }>
        { recording ? "stop" : "record" }
      </div>
    </>
  )
}

export default App

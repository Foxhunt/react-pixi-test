import React, { useState, useCallback } from "react"
import { Stage } from "@inlet/react-pixi"

import Penn from "./penn"

const App = () => {
  const [currentCanvas, setCanvas] = useState(null)

  const canvasRef = useCallback(ref => {
    if (ref !== null) {
      setCanvas(ref)
    }
  }, [])

  return (
    <div
      style={ {
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
      } }>
      <div
        style={ {
          width: "100vw",
          height: "56.25vw",
          maxWidth: "177.78vh",
          maxHeight: "100vh"
        } }>
        <canvas
          style={ {
            width: "100%"
          } }
          className="canvas"
          ref={ canvasRef } />
        {
          currentCanvas &&
          <Stage
            width={ 1920 }
            height={ 1080 }
            options={ {
              antialias: true,
              preserveDrawingBuffer: true,
              clearBeforeRender: false,
              view: currentCanvas
            } }>
            <Penn />
          </Stage>
        }
      </div>
    </div>
  )
}

export default App

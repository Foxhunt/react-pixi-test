import React from "react"
import { Stage } from "@inlet/react-pixi"

import Ball from "./ball"

const dimension = 600

const App = () =>
  <Stage
    width={ dimension }
    height={ dimension }
    options={ {
      roundPixels: true,
      antialias: true,
      clearBeforeRender: false,
      preserveDrawingBuffer: false
    } }>
    <Ball />
  </Stage>

export default App

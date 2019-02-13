import React from "react"
import { Stage } from "@inlet/react-pixi"

import Ball from "./ball"

const App = () =>
  <Stage
    width={ 300 }
    height={ 300 }
    options={ {
      antialias: true
    } }>
    <Ball />
  </Stage>

export default App

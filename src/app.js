import React from "react"
import { Stage } from "@inlet/react-pixi"

import Penn from "./penn"

const App = () =>
  <Stage
    width={ 800 }
    height={ 800 }
    options={ {
      antialias: true
    } } >
    <Penn />
  </Stage>


export default App

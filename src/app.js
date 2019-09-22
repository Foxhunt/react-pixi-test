import React, {useState, useEffect} from "react"
import { Stage } from "@inlet/react-pixi"

import Penn from "./penn"

const App = () => {
  const [dimensions, setDimensions] = useState([window.innerWidth, window.innerHeight])

  useEffect(() => {
    function handleResize(){
      setDimensions([window.innerWidth, window.innerHeight])
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  return (
    <Stage
      width={ dimensions[0] }
      height={ dimensions[1] }
      options={ {
        antialias: true,
        preserveDrawingBuffer: true,
        clearBeforeRender: false
      } } >
      <Penn />
    </Stage>
  )
}
  


export default App

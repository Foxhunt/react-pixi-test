import React, { useState } from "react"
import { Graphics, Text, useTick, useApp } from "@inlet/react-pixi"
import { TextStyle } from "pixi.js"

const textStyle = new TextStyle({
  fill: "#ffffff",
  stroke: "#000000",
  strokeThickness: 6
})

const gE = 9.81

const a = -0 * (Math.PI / 180)
const v0 = 20 * 3

const Penn = () => {
  const app = useApp()
  const width = app.view.width
  const height = app.view.height

  const x0 = width - width
  const y0 = height / 2

  const [t, setT] = useState(0)
  const sX = x0 + v0 * Math.cos(a) * t
  const sY = y0 + v0 * Math.sin(a) * t + gE / 2 * t ** 2

  const vX = v0 * Math.cos(a)
  const vY = v0 * Math.sin(a) + gE * t


  function onTick(d) {
    setT(t + d * (1 / 60))

    if (sY > height) {
      app.renderer.clear()
      setT(0)
    }
  }

  useTick(onTick)

  return (
    <>
      <Graphics
        draw={ g => {
          g.clear()
          g.beginFill(0xffffff)
          g.lineStyle(1, 0x666666)
          g.drawCircle(sX, sY, 20)
        } } />
      <Text
        x={ 10 }
        y={ 10 }
        text={ `t: ${Math.round(t)}s` }
        style={ textStyle } />
      <Text
        x={ 10 }
        y={ 40 }
        text={ `sX: ${Math.round(sX)}m` }
        style={ textStyle } />
      <Text
        x={ 10 }
        y={ 70 }
        text={ `sY: ${Math.round(sY)}m` }
        style={ textStyle } />
      <Text
        x={ 10 }
        y={ 100 }
        text={ `vX: ${Math.round(vX)}m/s` }
        style={ textStyle } />
      <Text
        x={ 10 }
        y={ 130 }
        text={ `vY: ${Math.round(vY)}m/s` }
        style={ textStyle } />
    </>
  )
}


export default Penn

import React, { useState, useCallback, useEffect } from "react"
import { useApp, useTick, Graphics, Container } from "@inlet/react-pixi"

const drawRect = (g, size) => {
  g.clear()
  g.beginFill(0xff6666, 0.5)
  g.lineStyle(1, 0x1a1a1a, 0.5, 0.5)
  g.drawRect(0 - size / 2, 0 - size / 2, size, size)
  g.endFill()
}

const oscillate = (input, min, max) => {
  const range = max - min
  const out = min + Math.abs(((input + range) % (range * 2)) - range)
  return out
}

const Penn = ({ getApp }) => {
  const app = useApp()

  useEffect(() => {
    getApp(app)
  }, [app])

  const [active, setActive] = useState(true)
  const [contRot, setContRot] = useState(Math.PI * 1.75)
  const [rectRot, setRectRot] = useState(0)
  const [rectSize, setRectSize] = useState(0)
  const [rectPos, setRectPos] = useState(0)

  const tick = useCallback(d => {
    if (active) {
      setContRot(val => val + d * 0.015)
      setRectRot(val => val - d * 0.03)
      setRectSize(val => val + d * 0.0003)
      setRectPos(val => val + d * 0.0006)
    }
  }, [active])

  useTick(tick)

  const sizeOsc = oscillate(rectSize, 0 , 1)
  const posOsc = oscillate(rectPos, 0 , 1)

  const size = (app.view.width / 6) * sizeOsc

  return (
    <Container
      position={ [app.view.width / 2, app.view.height / 2] }
      rotation={ contRot }>
      <Graphics
        interactive
        position={ [app.view.width / 4 * posOsc, app.view.height / 4 * posOsc] }
        rotation={ rectRot }
        pointertap={ () => {
          setActive(!active)
        } }
        draw={ g => drawRect(g, size) } />
      <Graphics
        interactive
        position={ [-app.view.width / 4 * posOsc, app.view.height / 4 * posOsc] }
        rotation={ rectRot }
        pointertap={ () => {
          setActive(!active)
        } }
        draw={ g => drawRect(g, size) } />
      <Graphics
        interactive
        position={ [app.view.width / 4 * posOsc, -app.view.height / 4 * posOsc] }
        rotation={ rectRot }
        pointertap={ () => {
          setActive(!active)
        } }
        draw={ g => drawRect(g, size) } />
      <Graphics
        interactive
        position={ [-app.view.width / 4 * posOsc, -app.view.height / 4 * posOsc] }
        rotation={ rectRot }
        pointertap={ () => {
          setActive(!active)
        } }
        draw={ g => drawRect(g, size) } />
    </Container>
  )
}

export default Penn

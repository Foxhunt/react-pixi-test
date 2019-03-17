import React, { useState, useCallback, useEffect } from "react"
import { useApp, useTick, Graphics, Container } from "@inlet/react-pixi"

const drawRect = (g, size) => {
  g.clear()
  g.beginFill(0xff3333, 0.5)
  g.lineStyle(1, 0x1a1a1a, 0.5, 0.5)
  g.drawRect(0 - size / 2, 0 - size / 2, size, size)
  g.endFill()
}

const oscillate = (input, min, max) => {
  const range = max - min
  const out = min + Math.abs((input + range) % (range * 2) - range)
  return out
}

const Penn = ({ getApp, conRotSpeed, rectPosSpeed }) => {
  const app = useApp()

  useEffect(() => {
    getApp(app)
  }, [])

  const [active, setActive] = useState(true)
  const [contRot, setContRot] = useState(Math.PI * 1.75)
  const [rectRot, setRectRot] = useState(0)
  const [rectSize, setRectSize] = useState(0.3)
  const [rectPos, setRectPos] = useState(0)

  const tick = useCallback(d => {
    if (active) {
      setContRot(val => val + d * conRotSpeed)
      setRectRot(val => val - d * 0.03)
      setRectSize(val => val + d * 0.00015)
      setRectPos(val => val + d * rectPosSpeed)
    }
  }, [active, conRotSpeed, rectPosSpeed])

  useTick(tick)

  const sizeOsc = oscillate(rectSize, 0, 1)
  const posOsc = oscillate(rectPos, 0.02, 1)

  const size = 30 * sizeOsc

  return (
    <Container
      position={ [app.view.width / 2, app.view.height / 2] }
      rotation={ contRot }>
      <Graphics
        interactive
        position={ [app.view.width / 4 * posOsc, app.view.width / 4 * posOsc] }
        rotation={ rectRot }
        pointertap={ () => {
          setActive(!active)
        } }
        draw={ g => drawRect(g, size) } />
      <Graphics
        interactive
        position={ [-app.view.width / 4 * posOsc, app.view.width / 4 * posOsc] }
        rotation={ rectRot }
        pointertap={ () => {
          setActive(!active)
        } }
        draw={ g => drawRect(g, size) } />
      <Graphics
        interactive
        position={ [app.view.width / 4 * posOsc, -app.view.width / 4 * posOsc] }
        rotation={ rectRot }
        pointertap={ () => {
          setActive(!active)
        } }
        draw={ g => drawRect(g, size) } />
      <Graphics
        interactive
        position={ [-app.view.width / 4 * posOsc, -app.view.width / 4 * posOsc] }
        rotation={ rectRot }
        pointertap={ () => {
          setActive(!active)
        } }
        draw={ g => drawRect(g, size) } />
    </Container>
  )
}

export default Penn

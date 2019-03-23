import React, { useState, useCallback, useEffect } from "react"
import { useApp, useTick, Graphics, Container } from "@inlet/react-pixi"

const drawRect = (g, size) => {
  g.clear()
  g.beginFill(0x000000, 0.5)
  g.lineStyle(1, 0xffffff, 0.5, 0.5)
  g.drawRect(0 - size / 2, 0 - size / 2, size, size)
  g.endFill()
}

const oscillate = (input, min, max) => {
  const range = max - min
  const out = min + Math.abs((input + range) % (range * 2) - range)
  return out
}

const Penn = ({ active, getApp, conRotSpeed, rectPosSpeed }) => {
  const app = useApp()

  useEffect(() => {
    getApp(app)
  }, [])

  const [contRot, setContRot] = useState(Math.PI * 1.75)
  const [rectRot, setRectRot] = useState(0)
  const [rectSize, setRectSize] = useState(0.3)
  const [rectPos, setRectPos] = useState(0)

  const tick = useCallback(d => {
    if (active) {
      setContRot(val => val + d * conRotSpeed)
      setRectRot(val => val - d * 0.03)
      setRectSize(val => val + d * 0.05)
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
        position={ [app.view.width / 2 * posOsc, app.view.width / 2 * posOsc] }
        rotation={ rectRot }
        draw={ g => drawRect(g, size) } />
      <Graphics
        interactive
        position={ [-app.view.width / 2 * posOsc, app.view.width / 2 * posOsc] }
        rotation={ rectRot }
        draw={ g => drawRect(g, size) } />
      <Graphics
        interactive
        position={ [app.view.width / 2 * posOsc, -app.view.width / 2 * posOsc] }
        rotation={ rectRot }
        draw={ g => drawRect(g, size) } />
      <Graphics
        interactive
        position={ [-app.view.width / 2 * posOsc, -app.view.width / 2 * posOsc] }
        rotation={ rectRot }
        draw={ g => drawRect(g, size) } />
    </Container>
  )
}

export default Penn

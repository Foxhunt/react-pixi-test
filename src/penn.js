import React, { useState, useCallback, useEffect } from "react"
import { useApp, useTick, Graphics, Container } from "@inlet/react-pixi"

const calcPos = (count, rad) => [
  Math.cos(count + Math.PI * 0.5) * rad,
  Math.cos(count) * rad
]

const Penn = ({ getApp }) => {
  const app = useApp()

  useEffect(() => {
    getApp(app)
  }, [app, getApp])

  const [active, setActive] = useState(false)
  const [posCount, setPosCount] = useState(Math.PI * 1.5)
  const [rotCount, setRotCount] = useState(0)

  const tick = useCallback(d => {
    if (active) {
      setPosCount(count => count + d * 0.01)
      setRotCount(rotCount => rotCount - d * 0.005)
    }
  }, [active])

  useTick(tick)

  const size = app.view.width / 6
  const radius = app.view.width / 3

  const [xOff, yOff] = calcPos(posCount, radius)

  const x = app.view.width / 2 + xOff
  const y = app.view.height / 2 + yOff

  return (
    <Container
      position={ [x, y] }
      rotation={ rotCount }>
      <Graphics
        interactive
        pointertap={ () => {
          setActive(!active)
        } }
        draw={ g => {
          g.clear()
          g.beginFill(0xFFC0CB, 0.1)
          g.lineStyle(1, 0x000000, 1, 0.5)
          g.drawRect(0 - size / 2, 0 - size / 2, size, size)
          g.endFill()
        } } />
    </Container>
  )
}

export default Penn

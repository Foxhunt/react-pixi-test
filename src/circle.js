import { PixiComponent } from "@inlet/react-pixi"
import { Graphics } from "pixi.js"

const Circle = PixiComponent("Circle", {
  create: () => new Graphics(),
  applyProps: (g, _, props) => {
    const { x, y, fill, line, radius, interactive, pointerdown } = props
    g.interactive = interactive
    g.on("pointerdown", pointerdown)
    g.clear()
    g.beginFill(fill)
    g.lineStyle(1, line)
    g.drawCircle(x, y, radius)
    g.endFill()
  }
})

export default Circle

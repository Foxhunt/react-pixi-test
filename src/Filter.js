import { Filter } from "pixi.js"

const FragShader = `
varying vec2 vTextureCoord;
  
uniform sampler2D uSampler;

void main(void)
{
    vec4 pixel = texture2D(uSampler, vTextureCoord);
    pixel.a += 0.004;
    gl_FragColor = pixel;
}
`

class AlphaFilter extends Filter {
  constructor() {
    super(null, FragShader)
  }
}

export default AlphaFilter

const Vertexobject = `

uniform vec3 uColor;
varying vec2 vUv;
varying vec3 newpos;
varying vec4 worldpos;
varying vec3 vViewPos;
void main(){
  worldpos= modelMatrix*vec4(position,1.0);

  vUv=worldpos.xz*0.008;
  vec4 viewPos = modelViewMatrix * vec4(position, 1.0);
  vViewPos = viewPos.xyz;
  gl_Position= projectionMatrix * modelViewMatrix *vec4(position,1.0);

}
`

export default Vertexobject;
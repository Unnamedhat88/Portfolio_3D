const Vertexorb = `
varying vec2 vUv;
varying vec3 vPos;
varying vec3 vViewPos;



void main(){
  vUv=uv;
  vPos=position;
  vec4 pos =vec4(position,1.0);


  #ifdef USE_INSTANCING
    pos = instanceMatrix*pos;
  #endif

  vViewPos=(modelViewMatrix*pos).xyz;

  gl_Position= projectionMatrix * modelViewMatrix *pos;

}
`

export default Vertexorb;
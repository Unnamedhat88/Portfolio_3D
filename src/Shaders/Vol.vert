const VertexVol = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPos;
uniform vec3 uLightPos;
varying vec2 vLightScreenPos;
void main(){
  vUv=uv;
  vNormal = normalMatrix*normal;
  vec4 worldPos= modelMatrix*vec4(position,1.0);
  vWorldPos=worldPos.xyz;

  vec4 lightClipPos=projectionMatrix*viewMatrix*vec4(uLightPos,1.0);
  vLightScreenPos =(lightClipPos.xy/lightClipPos.w)*0.5+0.5;

 
  gl_Position= projectionMatrix * modelViewMatrix *vec4(position,1.0);

}
`

export default VertexVol;
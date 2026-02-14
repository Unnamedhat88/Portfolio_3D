const VertexTutorial = `
#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vViewPos;

void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPos = viewPosition.xyz;

    gl_Position = projectionMatrix * viewPosition;
}
`;

export default VertexTutorial;

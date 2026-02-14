const FragmentTutorial = `
#ifdef GL_ES
precision mediump float;
#endif

uniform float uTime;
uniform float MAX_OPACITY;
varying vec3 vViewPos;
uniform vec3 uFogColor;
uniform float uFogDensity;

void main() {
    vec3 color = vec3(1.0, 1.0, 1.0);

    float threshold = 10.0;
    float dist = length(vViewPos);
    float fogFactor = 1.0 - exp(-pow(dist * uFogDensity, 2.0));
    fogFactor = fogFactor - (1.0 - exp(-pow(threshold * uFogDensity, 2.0)));

    if (dist > threshold) {
        float extra = (dist - threshold) / 50.0;
        fogFactor += extra;
    }

    fogFactor = clamp(fogFactor, 0.0, 1.0);
    color = mix(color, uFogColor, fogFactor);

    gl_FragColor = vec4(color, MAX_OPACITY+0.3*sin(uTime*2.5));
}
`;

export default FragmentTutorial;

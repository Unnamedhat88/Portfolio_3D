
const Fragmentorb = `
varying vec2 vUv;
varying vec3 vViewPos;
uniform vec3 uFogColor;
uniform float uFogDensity;


void main(){
    float distR = length(vUv-vec2(0.5,0.5));

    float alpha = smoothstep(0.4,0.2,distR);

    float threshold = 40.0;
    float dist = length(vViewPos); 
    float fogFactor = 1.0 - exp(-dist * uFogDensity);
    fogFactor = clamp(fogFactor, 0.0, 1.0);
    
    
    if (dist>threshold){
        fogFactor *= smoothstep(threshold, threshold + 30.0, dist);
       
    }
    


    vec3 color = mix(vec3(1.0,1.0,1.0),uFogColor,fogFactor);

    float finalAlpha= alpha*(1.0-fogFactor);
    
    gl_FragColor=vec4(mix(vec3(1.0),uFogColor,fogFactor),finalAlpha);
  
    

    
    
}
`

export default Fragmentorb;
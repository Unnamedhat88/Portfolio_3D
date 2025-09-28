//
// Description : Array and textureless GLSL 2D/3D/4D simplex 
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20201014 (stegu)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
// 
const FragmentVol = `
uniform float uTime;
uniform vec3 uColor;
uniform float uNoiseScale;
uniform float uSmoothTop;
uniform float uSmoothBottom;
uniform float uFresnelPower;
uniform vec3 uLightDir;
uniform vec3 uLightPos;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec2 vLightScreenPos;
uniform vec3 uCameraPosition;
uniform float uFogDensity;
uniform vec3 uFogColor;


vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+10.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
  }
  
//=====================================================================
//main
//=======================================================================
void main(){
  vec3 localCoord= vWorldPos-vec3(-13,24,-15);
  vec3 lightDir= normalize(uLightDir); 
  float along = dot(localCoord, lightDir); 
  vec3 perpNoise=localCoord-along*lightDir; 
  vec3 noisePos=along*lightDir+perpNoise*uNoiseScale+vec3(uTime*0.2); 

  float n1=snoise(noisePos+vec3(0.0,0.0,0.0)); 
  float n2=snoise(noisePos+vec3(31.0,17.0,5.0)); 
  float n3=snoise(noisePos+vec3(12.0,78.0,44.0)); 
  float noiseVal=(n1+n2+n3)/3.0; 

  float smoothMask=smoothstep(0.0,uSmoothBottom,vUv.y)*(1.0-smoothstep(uSmoothTop,1.0,vUv.y)); 
  vec3 n=normalize(vNormal); 
  vec3 viewDir=normalize(cameraPosition-localCoord); 

  float fresnel = pow(1.0-abs(dot(n,viewDir)),uFresnelPower); 
 

  vec3 vViewPos= cameraPosition-vWorldPos;
  vec3 color= uColor;

  float threshold = 10.0;
  float dist = length(vWorldPos-uCameraPosition); 
  float fogFactor=1.0-exp(-pow(dist*uFogDensity,2.0));
  fogFactor = fogFactor-( 1.0 - exp(-pow(threshold * uFogDensity, 2.0)));
    
  if (dist>threshold){
    float extra = (dist - threshold)/50.0;
    fogFactor+=extra;
  }
  fogFactor=clamp(fogFactor,0.0,1.0);
  float alpha = clamp(noiseVal*fresnel*smoothMask*(1.0-fogFactor)*1.2,0.0,1.0); 
  if(alpha<0.02){
    alpha=0.0;
  }
 



  gl_FragColor=vec4(color, alpha);
    

    


   

}
`

export default FragmentVol;
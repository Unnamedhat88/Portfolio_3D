import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {useTexture} from "@react-three/drei";
import { DirectionalLight,DirectionalLightHelper } from "three";
import { useHelper, Stats } from "@react-three/drei";

import VertexVol from "../Shaders/Vol.vert";
import FragmentVol from "../Shaders/Vol.frag"
import Object from "./Object";
import { useControls } from "leva";
import * as THREE from "three";



export default function VolumetricLights({positionofxz}){
  //   const [x,setx]=useState(0.0)
  // const [y,sety]=useState(0.0)
  // const [z,setz]=useState(0.0)
  // const [a,seta]=useState(0.0)
  // const [b,setb]=useState(0.0)
  // const [c,setc]=useState(0.0)
  // const [d,setd]=useState(0.0)



//    useControls({ 
//         x: {value:0,min:-100,max:100,step:1, onChange: (v)=>setx(v)},
//         y: {value:0,min:-100,max:100,step:1, onChange: (v)=>sety(v)},
//         z: {value:0,min:-100,max:100,step:1, onChange: (v)=>setz(v)},
//         a: {value:0.03,min:0.001,max:1.0,step:0.005, onChange: (v)=>seta(v)},
//         b: {value:0,min:-10,max:10,step:0.5, onChange: (v)=>setb(v)},
//         c: {value:0,min:-10,max:10,step:0.5, onChange: (v)=>setc(v)},
//         d: {value:3.0,min:0,max:10,step:0.1, onChange: (v)=>setd(v)},
       
// })  

        const uniforms = useRef({
          uTime:{value:0},
          uColor:{value: new THREE.Color("#ffffff")},
          uNoiseScale:{value:0.03},
          uSmoothTop:{value:0},
          uSmoothBottom:{value:0},
          uFresnelPower:{value:2.4},
          uLightDir:{value :new THREE.Vector3(2,0,0)},
          uLightPos:{value: new THREE.Vector3(-74,58,-10)}, 
          uCameraPosition: {value: new THREE.Vector3(positionofxz-4,3.5,positionofxz-4)},
          uFogColor: { value: new THREE.Color(0xe187c0) },
          uFogDensity: { value: 0.1 },
          

        });
      
   
    useFrame((state, delta, xrFrame)=>{
      uniforms.current.uTime.value+=delta;
      // uniforms.current.uNoiseScale.value=a;
      // uniforms.current.uSmoothTop.value=b;
      // uniforms.current.uSmoothBottom.value=c;
      // uniforms.current.uFresnelPower.value=d;
      uniforms.current.uLightPos.value=new THREE.Vector3(-74,58,-10);
      uniforms.current.uCameraPosition.value=new THREE.Vector3(positionofxz-4,3.5,positionofxz-4);
      

     
     
      

      })

    return(
    <>
       <mesh scale={5.4} position={[-14,24,-15]} > 
        <cylinderGeometry args={[3,5,10,64,1,true]} ></cylinderGeometry> 
        <shaderMaterial depthWrite={false} vertexShader={VertexVol} fragmentShader={FragmentVol} side={THREE.FrontSide} transparent uniforms={uniforms.current} /> 
      </mesh>
      <mesh scale={6} position={[-23,14,-23]} > 
        <cylinderGeometry args={[3,5,10,64,1,true]} ></cylinderGeometry> 
        <shaderMaterial depthWrite={false} vertexShader={VertexVol} fragmentShader={FragmentVol} side={THREE.FrontSide} transparent uniforms={uniforms.current} /> 
      </mesh>
      <mesh scale={8} position={[-40,14,-40]} > 
        <cylinderGeometry args={[3,5,10,64,1,true]} ></cylinderGeometry> 
        <shaderMaterial depthWrite={false} vertexShader={VertexVol} fragmentShader={FragmentVol} side={THREE.FrontSide} transparent uniforms={uniforms.current} /> 
      </mesh>
      <mesh scale={10} position={[-56,9,-56]} > 
        <cylinderGeometry args={[3,5,10,64,1,true]} ></cylinderGeometry> 
        <shaderMaterial depthWrite={false} vertexShader={VertexVol} fragmentShader={FragmentVol} side={THREE.FrontSide} transparent uniforms={uniforms.current} /> 
      </mesh>
      <mesh scale={10} position={[-72,10,-72]} > 
        <cylinderGeometry args={[3,5,10,64,1,true]} ></cylinderGeometry> 
        <shaderMaterial depthWrite={false} vertexShader={VertexVol} fragmentShader={FragmentVol} side={THREE.FrontSide} transparent uniforms={uniforms.current} /> 
      </mesh>
        {/* -74,58,-10
        <mesh position={[-74+x,58+y,-10+z]}>
          <sphereGeometry args={[1]}/>
          <meshBasicMaterial></meshBasicMaterial>
        </mesh> */}
 
    
        
        
    </>)
}
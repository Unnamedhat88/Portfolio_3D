import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {OrbitControls, useTexture} from "@react-three/drei";
import { DirectionalLight,DirectionalLightHelper } from "three";
import { useHelper, Stats } from "@react-three/drei";
import Vertexorb from "../Shaders/Orb.vert";
import Fragmentorb from "../Shaders/Orb.frag"
import Object from "./Object";
import { useControls } from "leva";
import * as THREE from "three";
import VolumetricLights from "./VolumetricLights";




export default function Scene({positionofxz,setpositionofxz,cameraBusy,focusObject, setFocusObject, activeDiv, zoomedin, setZoomedin,tutorial,setTutorial}) {
  
  const orbRefs= useRef(null)
  
  const orbPosition = useRef(Array.from({length:200},()=>[
    Math.random() * 200 -170,
    Math.random() * 33 +1,
    Math.random() * 200 -170,
    Math.random()*0.6+0.2, //A value
    Math.random()*2, //B value
  ]

  ))

  

  const orbuniforms = useRef({
            uFogColor: { value: new THREE.Color(0xe187c0) },
            uFogDensity: { value: 0.008 },         
            uCamPos:{ value: new THREE.Vector3(positionofxz-4,3.5,positionofxz-4) }             
  })
  

    const plane=useRef();
   
    
  const dummy=new THREE.Object3D();
  useFrame((state, delta, xrFrame)=>{
    if(plane.current){
      plane.current.material.uniforms.uTime.value+=delta*0.5;
      plane.current.material.uniforms.uScrollPos.value = positionofxz;}
    
    orbuniforms.current.uCamPos.value.set(positionofxz-4,3.5,positionofxz-4)

    const t = state.clock.getElapsedTime();

    for (let i=0; i<orbPosition.current.length;i++){
      const [x,y,z,a,b]=orbPosition.current[i];

      const s = Math.abs(Math.sin(t*a+b))

      dummy.position.set(x,y,z);
      dummy.scale.set(s,s,s);
      dummy.lookAt(new THREE.Vector3(positionofxz,3.5,positionofxz));

      dummy.updateMatrix();
      orbRefs.current.setMatrixAt(i,dummy.matrix)
    }
    orbRefs.current.instanceMatrix.needsUpdate=true;
    
  

    
  })

  

  
  
  return (<>

    {/* <Light></Light> */}
    <ambientLight intensity={1.0}></ambientLight>

    {/* <mesh ref={plane} rotation={[-1.3,0,0]} position={[0,1,0]} castShadow receiveShadow>
      <planeGeometry args={[4,4,30,30]}/>
      <shaderMaterial fragmentShader={Fragmentwater} vertexShader={Vertexwater} uniforms={uniforms.current} transparent />
    </mesh> */}

    
    <instancedMesh ref={orbRefs} args={[new THREE.PlaneGeometry(1.5,1.5), new THREE.ShaderMaterial({
      blending:THREE.AdditiveBlending,
      depthTest:true,
      depthWrite:false,
      vertexShader: Vertexorb,
      fragmentShader: Fragmentorb,
      transparent : true,
    uniforms:orbuniforms.current
    }),orbPosition.current.length]} >
    
      
    </instancedMesh>

  

    

    <Object positionofxz={positionofxz} setpositionofxz={setpositionofxz} cameraBusy={cameraBusy}focusObject={focusObject} setFocusObject={setFocusObject} activeDiv={activeDiv} zoomedin={zoomedin} setZoomedin={setZoomedin} tutorial={tutorial} setTutorial={setTutorial}></Object>

    <VolumetricLights positionofxz={positionofxz}></VolumetricLights>
 
    


    </>
  )
  }
import { act, useFrame,useLoader } from "@react-three/fiber";
import { useRef,useEffect,useState } from "react";
import { useControls } from "leva";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from "three";
import Vertexobject from "../Shaders/Object.vert";
import Fragmentobject from "../Shaders/Object.frag"
import { shaderMaterial,useGLTF,Html } from "@react-three/drei";
import { uniform } from "three/src/nodes/TSL.js";
import {useThree} from "@react-three/fiber"
import { Summary } from './Summary'
import gsap from "gsap";
import { Certs } from "./Certs";
import { Projects } from "./Projects";
import { Contact } from "./Contact";
const animateCamera=(camera,{ pos, target},cameraBusy,zoomedin)=>{
  gsap.to(camera.position,{
    x:pos.x,
    y:pos.y,
    z:pos.z,
    duration :2,
    ease: "power2.inOut"
  })

  const startLookAt= new THREE.Vector3();
  camera.getWorldDirection(startLookAt);
  startLookAt.add(camera.position)

  gsap.to(startLookAt,{
    x:target.x,
    y:target.y,
    z:target.z,
    duration :2,
    ease: "power2.inOut",
    onUpdate:()=>{
      camera.lookAt(startLookAt.x,startLookAt.y,startLookAt.z)
    },
    onComplete:()=>{
      if(zoomedin==true)cameraBusy.current=false;
    }

  })

}
export default function Object({positionofxz,setpositionofxz,cameraBusy,focusObject, setFocusObject,activeDiv, zoomedin, setZoomedin,tutorial, setTutorial}){
    const {camera}=useThree()
    const looped= useRef(false)
    const gltf = useLoader(GLTFLoader, 'images/models/environment.glb')
    const { nodes, materials } = useGLTF('images/models/environment.glb')

    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    
    useEffect(()=>{
      if(gltf && gltf.scene) setTutorial(prev=>[0,0,0,0])
    },[gltf])

    const tempArray= new THREE.Vector3();
    camera.getWorldDirection(tempArray);
    tempArray.add(camera.position)
    const originalLookAt=useRef(tempArray.clone())
    const originalCameraPosition=useRef(camera.position.clone())

    const size=new THREE.Vector3()
    nodes.tvscreen001.geometry.computeBoundingBox()
    nodes.tvscreen001.geometry.boundingBox.getSize(size)
    console.log(size)

    const size2=new THREE.Vector3()
    nodes.vendingscreen.geometry.computeBoundingBox()
    nodes.vendingscreen.geometry.boundingBox.getSize(size2)

    const size3=new THREE.Vector3()
    nodes.laptopscreen.geometry.computeBoundingBox()
    nodes.laptopscreen.geometry.boundingBox.getSize(size3)

    const size4=new THREE.Vector3()
    nodes.phonescreen.geometry.computeBoundingBox()
    nodes.phonescreen.geometry.boundingBox.getSize(size4)
    

        const uniforms = useRef({
          uTime:{value:0},
          uCausticSpeed:{value:1.0},
          uCausticColor:{value: new THREE.Color("#ffffff")},
          uCausticScale:{value:27.4},
          uCausticOffset:{value:0.66},
          uCausticThickness:{value:0.5},
          uCausticIntensity:{value: 0.28},
          uFogColor: { value: new THREE.Color("#EBA2CC") },
          uFogDensity: { value: 0.06 },         
          uCamPos:{ value: new THREE.Vector3(positionofxz-4,3.5,positionofxz-4) }             

        });
      
    useEffect(()=>{
      if(!gltf || !gltf.scene) return;
     
      gltf.scene.traverse((child)=>{
     
        
        if(!child.isMesh){
          return
        }
        

        // else if(child.isMesh && child.name.toLocaleLowerCase().includes("screen")&&!looped.current){
        //   child.visible=false;
        //   return
        // }
     
        if(child.isMesh){
          child.userData.onClick=(currActiveDiv)=>{
          
            if(child.parent.name.toLocaleLowerCase()=="tvbody001"||child.name.toLocaleLowerCase()=="tvscreen001"){
              if(currActiveDiv!=0)return;
              cameraBusy.current=true;
              setZoomedin(true)
              animateCamera(camera, {pos : {x:( 13.182)/2, y: 3.388/2, z: (12.800)/2},target:{x: (-3.879+12.1043)/2, y: 3.388/2, z: (15.40533-4.128)/2}}, positionofxz )
              setTutorial(prev=>{
                const newTutorial=[...prev]
                newTutorial[0]=1;
                return newTutorial
              })
            }
            else if(child.parent.name.toLocaleLowerCase()=="vendingbody"||child.name.toLocaleLowerCase()=="vendingscreen"){
              if(currActiveDiv!=1)return;
              cameraBusy.current=true;
              setZoomedin(true)
              animateCamera(camera, {pos : {x:-16.676/2, y:10.641/2, z:-19.908/2},target:{x: -21.514/2,y:10.641/2,z:-25.978/2}}, positionofxz )
              setTutorial(prev=>{
                const newTutorial=[...prev]
                newTutorial[1]=1;
                return newTutorial
              })
            }
            else if(child.parent.name.toLocaleLowerCase()=="laptopbody"||child.name.toLocaleLowerCase()=="laptopscreen"){
              if(currActiveDiv!=2)return;
              cameraBusy.current=true;
              setZoomedin(true)
              animateCamera(camera, {pos : {x:-57.656/2, y:9.940/2,  z:-54.5/2},target:{x:(-68.707+5.597)/2,y:9.240/2,z:(-50.891-5.706)/2}}, positionofxz )
              setTutorial(prev=>{
                const newTutorial=[...prev]
                newTutorial[2]=1;
                return newTutorial
              })
            }
            else if(child.parent.name.toLocaleLowerCase()=="phonebody"||child.name.toLocaleLowerCase()=="phonescreen"){
              if(currActiveDiv!=3)return;
              cameraBusy.current=true;
              setZoomedin(true)
              animateCamera(camera, {pos : {x:-83.1390/2, y: 4.025/2, z:-84.188/2},target:{x:-84.834/2, y:3.85/2, z:-86.583/2}}, positionofxz )
              setTutorial(prev=>{
                const newTutorial=[...prev]
                newTutorial[3]=1;
                return newTutorial
              })
            }

            

            //for vending
            // camera.position.set(-16.676/2,  10.641/2,  -19.908/2)
            // camera.lookAt(-21.514/2,10.641/2,-25.978/2)
            
            //for laptop
            // camera.position.set(-63.8099/2,  9.440/2,  -48.985/2)
            // camera.lookAt(-68.707/2,9.240/2,-50.891/2)

            //for phone
            // camera.position.set(-83.1390/2,  4.025/2, -84.188/2)
            // camera.lookAt(-84.834/2,  3.85/2, -86.583/2)

            camera.updateMatrixWorld();
            
            //TVBody: -4.323,3.273,15.388
            //VENDINGBODY: -21.514, y: 10.641, z: -25.978
            //LAPTOPBODY: -68.707,  9.240,  -50.891
            //PHONEBODY:-84.834,  4.025,  -86.583
            //TVCAM :  -4.323,  3.273,  15.388
            //VENDINGCAM:-21.514, 10.641, -25.978
            //LAPTOPCAM: -68.707,  9.240,-50.891
            //PHONECAM: -84.834,  4.025, -86.583
            
          }
          
        }
        
        
        if(child.isMesh && child.material && child.material.color && child.parent){
          const cloneduniforms ={
            ...uniforms.current, uColor:{value: child.material.color.clone()}
          };
          
          const clonedshaderMaterial= new THREE.ShaderMaterial({
            vertexShader: Vertexobject,
            fragmentShader: Fragmentobject,
            uniforms:cloneduniforms,
            // side: THREE.DoubleSide
          })
        
          child.material=clonedshaderMaterial
          
          
        }
      })
      looped.current=true;
  },[gltf])

   
    useFrame((state, delta, xrFrame)=>{
      uniforms.current.uTime.value+=delta*0.5
      uniforms.current.uCamPos.value.set(positionofxz-4,3.5,positionofxz-4)
    })

    return(
    <>
    <primitive scale={0.5} object={gltf.scene} onClick={(e)=>{
      e.stopPropagation();
      
      let obj=e.object;
      let currActiveDiv=activeDiv
      if(cameraBusy.current==true)return;
      if (obj.userData.onClick){
        obj.userData.onClick(currActiveDiv);
       
      }
      
      }}>
      {/* for TV */}
      <group position={[6.1243, 6.309, 10.135]} rotation={[0, 1.27, 0]} scale={!isMobile?[1.01, 0.834, 0.959]:[1.01, 0.894, 0.959]} >
        {(zoomedin&&activeDiv==0)&&<Html distanceFactor={!isMobile?1.0:1.0} transform center position={isMobile?[-0.98,-3.39,2.29]:[-0.9,-3.5,2.29]} scale={[3,3.4,3]} style={{transition:"opacity 200ms",opacity:(zoomedin&&activeDiv==0)?"1":"0" }} >
          <div style={{width:"860px", height:"670px"}} className=" bg-red-100">
            <Summary animateCamera={animateCamera} cameraBusy={cameraBusy} originalCameraPosition={originalCameraPosition} originalLookAt={originalLookAt} camera={camera} positionofxz={positionofxz} setZoomedin={setZoomedin} zoomedin={zoomedin}></Summary>
          </div>
        </Html> }
      </group>

      
      {/* for vending machine */}
     
      <group position={[-33.589, 5.86, -41.283]} rotation={[0, 0.095, 0]} scale={isMobile?[1.24, 0.76, 1.23]:[1.23, 0.76, 1.23]}>
        
          {(zoomedin&&activeDiv==1)&&<Html center style={{ transition:"opacity 1.4s", opacity: activeDiv==1?1:0}} distanceFactor={!isMobile?1:1.05} transform position={[8.57,6.4,13.4]} scale={[4,6.3,4]} rotation={[0,0.577,0]}>
          <div style={{width:size3.x*300, height:size3.y*170}} className="">
              <Projects animateCamera={animateCamera} cameraBusy={cameraBusy} originalCameraPosition={originalCameraPosition} originalLookAt={originalLookAt} camera={camera} positionofxz={positionofxz} setZoomedin={setZoomedin}  zoomedin={zoomedin}></Projects>
          </div>
          
          
          </Html>}
      
        
      </group>

      
      {/* for laptop */}
      {/* old -68.604, 9.075, -51.037
      new -63.007, 9.075, -56.743 */}
      <group  position={[-62.901+0.206, 9.075, -56.713+0.10]} rotation={[1.508+0.035, 0.163-0.088, -1.199-0.001]} scale={[3.413+0.05, 1.0, 2.526+0.05]}>
       
        {(zoomedin&&activeDiv==2)&&<Html center style={{ transition:"opacity 1.4s", opacity: activeDiv==2?1:0, pointerEvents:"auto"}} distanceFactor={!isMobile?1.01:1.03} transform position={isMobile?[-0.002,0,-0.08]:[0.002,0,-0.04]} scale={isMobile?[1.17,1.55,1.17]:[1.15,1.5,1.15]} rotation={[-(Math.PI)/2,0,0]}>
          <div style={{width:size2.x*140, height:size2.y*33,pointerEvents:"auto"}} className="">
            <Certs animateCamera={animateCamera} cameraBusy={cameraBusy} originalCameraPosition={originalCameraPosition} originalLookAt={originalLookAt} camera={camera} positionofxz={positionofxz} setZoomedin={setZoomedin}  zoomedin={zoomedin}></Certs>
          </div>
          
          
        </Html>}

       
      </group>

    {/* for phone */}
    <group position={[-88.15, 5.86, -90.755]} scale={[1.866, 1.153, 1.866]} >
     
      {(zoomedin&&activeDiv==3)&&<Html center style={{ transition:"opacity 1.4s", opacity: activeDiv==3?1:0}} distanceFactor={isMobile?1.015:1.0} transform position={isMobile?[1.73,-2.05,2.275]:[1.73,-1.76,2.2]} scale={[1.2,1.9,1.5]} rotation={[Math.PI-0.050,-Math.PI-0.61,-Math.PI+0.03]}>
          <div style={{width:size3.x*193, height:size3.y*132}} className="">
            <Contact animateCamera={animateCamera} cameraBusy={cameraBusy} originalCameraPosition={originalCameraPosition} originalLookAt={originalLookAt} camera={camera} positionofxz={positionofxz} setZoomedin={setZoomedin}  zoomedin={zoomedin}></Contact>
          </div>
          
          
        </Html>}
      
    
      </group>


    </primitive> 
    
    </>)
}
import { act, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { useControls } from "leva";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from "three";
import Vertexobject from "../Shaders/Object.vert";
import Fragmentobject from "../Shaders/Object.frag"
import VertexTutorial from "../Shaders/Tutorial.vert";
import FragmentTutorial from "../Shaders/Tutorial.frag";
import { shaderMaterial, useGLTF, Html } from "@react-three/drei";
import { uniform } from "three/src/nodes/TSL.js";
import { useThree } from "@react-three/fiber"
import { Summary } from './Summary'
import gsap from "gsap";
import { Certs } from "./Certs";
import { Projects } from "./Projects";
import { Contact } from "./Contact";

const animateCamera = (camera, { pos, target }, cameraBusy, zoomedin) => {

  gsap.to(camera.position, {
    x: pos.x,
    y: pos.y,
    z: pos.z,
    duration: 2,
    ease: "power2.inOut"
  })

  const startLookAt = new THREE.Vector3();
  camera.getWorldDirection(startLookAt);
  startLookAt.add(camera.position)

  gsap.to(startLookAt, {
    x: target.x,
    y: target.y,
    z: target.z,
    duration: 2,
    ease: "power2.inOut",
    onUpdate: () => {
      camera.lookAt(startLookAt.x, startLookAt.y, startLookAt.z)
    },
    onComplete: () => {
      if (zoomedin == true) cameraBusy.current = false;
    }

  })

}
export default function Object({ positionofxz, setpositionofxz, cameraBusy, focusObject, setFocusObject, activeDiv, zoomedin, setZoomedin, tutorial, setTutorial, text }) {
  const { camera } = useThree()
  const looped = useRef(false)
  const gltf = useLoader(GLTFLoader, 'images/models/environment.glb')
  const { nodes, materials } = useGLTF('images/models/environment.glb')
  // Caching references to avoid expensive searching in useFrame
  const tutorialMeshes = useRef({ tv: null, vending: null, laptop: [], phone: null, hand: null });

  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)

  useEffect(() => {
    if (gltf && gltf.scene) setTutorial(prev => [0, 0, 0, 0])
  }, [gltf])

  const tempArray = new THREE.Vector3();
  camera.getWorldDirection(tempArray);
  tempArray.add(camera.position)
  const originalLookAt = useRef(tempArray.clone())
  const originalCameraPosition = useRef(camera.position.clone())

  const uniforms = useRef({
    uTime: { value: 0 },
    uCausticSpeed: { value: 1.0 },
    uCausticColor: { value: new THREE.Color("#ffffff") },
    uCausticScale: { value: 27.4 },
    uCausticOffset: { value: 0.66 },
    uCausticThickness: { value: 0.5 },
    uCausticIntensity: { value: 0.28 },
    uFogColor: { value: new THREE.Color("#EBA2CC") },
    uFogDensity: { value: 0.06 },
    uCamPos: { value: new THREE.Vector3(positionofxz - 4, 3.5, positionofxz - 4) }
  });

  useEffect(() => {
    if (!gltf || !gltf.scene) return;

    gltf.scene.traverse((child) => {
      if (!child.isMesh) return;

      // Logic for regular object clicks
      child.userData.onClick = (currActiveDiv) => {
        if (child.parent.name.toLowerCase() == "tvbody001" || child.name.toLowerCase() == "tvscreen001") {
          if (currActiveDiv != 0) return;
          cameraBusy.current = true;
          setZoomedin(true)
          // animateCamera(camera, { pos: { x: (13.182) / 2, y: 3.388 / 2, z: (12.800) / 2 }, target: { x: (-3.879 + 12.1043) / 2, y: 3.388 / 2, z: (15.40533 - 4.128) / 2 } }, positionofxz)

          const tvScreenPos = new THREE.Vector3(8.12 * 0.5, 3.40 * 0.5, 11.6 * 0.5); // group pos × scale
          const tvNormal = new THREE.Vector3(Math.sin(1.27), 0, Math.cos(1.27)); // from rotation Y = 1.27
          const camDistance = 4.5; // tune this one value for both devices

          const camPos = tvScreenPos.clone().add(tvNormal.clone().multiplyScalar(camDistance));

          animateCamera(camera, {
            pos: { x: camPos.x, y: tvScreenPos.y, z: camPos.z },
            target: { x: tvScreenPos.x, y: tvScreenPos.y, z: tvScreenPos.z }
          }, cameraBusy, zoomedin);
          setTutorial(prev => [1, prev[1], prev[2], prev[3]]);
        }
        else if (child.parent.name.toLowerCase() == "vendingbody" || child.name.toLowerCase() == "vendingscreen") {
          if (currActiveDiv != 1) return;
          cameraBusy.current = true;
          setZoomedin(true)
          animateCamera(camera, { pos: { x: -16.676 / 2, y: 10.641 / 2, z: -19.908 / 2 }, target: { x: -21.514 / 2, y: 10.641 / 2, z: -25.978 / 2 } }, positionofxz)
          setTutorial(prev => [prev[0], 1, prev[2], prev[3]]);
        }
        else if (child.parent.name.toLowerCase() == "laptopbody" || child.name.toLowerCase() == "laptopscreen") {
          if (currActiveDiv != 2) return;
          cameraBusy.current = true;
          setZoomedin(true)
          animateCamera(camera, { pos: { x: -57.656 / 2, y: 9 / 2, z: -54.5 / 2 }, target: { x: (-68.707 + 5.597) / 2, y: 9.240 / 2, z: (-50.891 - 5.706) / 2 } }, positionofxz)
          setTutorial(prev => [prev[0], prev[1], 1, prev[3]]);
        }
        else if (child.parent.name.toLowerCase() == "phonebody" || child.name.toLowerCase() == "phonescreen") {
          if (currActiveDiv != 3) return;
          cameraBusy.current = true;
          setZoomedin(true)
          animateCamera(camera, { pos: { x: -83.1390 / 2, y: 4.025 / 2, z: -84.188 / 2 }, target: { x: -84.834 / 2, y: 3.85 / 2, z: -86.583 / 2 } }, positionofxz)
          setTutorial(prev => [prev[0], prev[1], prev[2], 1]);
        }
        camera.updateMatrixWorld();
      }

      // Assign standard shader to non-tutorial objects
      if (child.material && child.material.color && !child.name.toLowerCase().includes("tutorial")) {
        const cloneduniforms = { ...uniforms.current, uColor: { value: child.material.color.clone() } };
        child.material = new THREE.ShaderMaterial({
          vertexShader: Vertexobject,
          fragmentShader: Fragmentobject,
          uniforms: cloneduniforms,
        })
      }

      // Logic for Tutorial objects
      if (child.name.toLowerCase().includes("tutorial")) {
        child.raycast = () => null; // Let clicks pass through
        child.material = new THREE.ShaderMaterial({
          vertexShader: VertexTutorial,
          fragmentShader: FragmentTutorial,
          uniforms: {
            MAX_OPACITY: { value: 0.3 },
            uFogColor: { value: new THREE.Color("#EBA2CC") },
            uFogDensity: { value: 0.06 },
            uTime: { value: 0.0 },
          },
          transparent: true,
        });

        const name = child.name.toLowerCase();
        if (name.includes("tv")) tutorialMeshes.current.tv = child;
        if (name.includes("vending")) tutorialMeshes.current.vending = child;
        if (name.includes("phone")) tutorialMeshes.current.phone = child;
        if (name.includes("hand")) tutorialMeshes.current.hand = child;
        if (name.includes("laptop")) {
          tutorialMeshes.current.laptop.push(child);
        }
      }
    })
    looped.current = true;
  }, [gltf])


  useFrame((state, delta) => {
    uniforms.current.uTime.value += delta * 0.5;
    uniforms.current.uCamPos.value.set(positionofxz - 4, 3.5, positionofxz - 4);

    // Update tutorials directly from the ref cache
    const { tv, vending, laptop, phone, hand } = tutorialMeshes.current;

    if (tv) {
      tv.visible = tutorial[0] === 0;
      tv.material.uniforms.uTime.value += delta;
      hand.visible = tutorial[0] === 0;
    }
    if (vending) {
      vending.visible = tutorial[1] === 0;
      vending.material.uniforms.uTime.value += delta;
    }
    if (laptop.length > 0) {
      laptop.forEach((mesh) => {
        mesh.visible = tutorial[2] === 0;
        mesh.material.uniforms.uTime.value += delta;
      });
    }
    if (phone) {
      phone.visible = tutorial[3] === 0;
      phone.material.uniforms.uTime.value += delta;
    }
  })
  const { x, y, z, distFactor } = useControls("TV Position", {
    x: { value: 8.12, min: -20, max: 20, step: 0.001 },
    y: { value: 3.40, min: -20, max: 20, step: 0.001 },
    z: { value: 11.6, min: -20, max: 20, step: 0.001 },
    distFactor: { value: 3.9, min: 0.1, max: 20, step: 0.1 }
  });

  return (
    <>
      <primitive scale={0.5} object={gltf.scene} onClick={(e) => {
        e.stopPropagation();

        let obj = e.object;
        let currActiveDiv = activeDiv
        if (cameraBusy.current == true) return;
        if (obj.userData.onClick) {
          obj.userData.onClick(currActiveDiv);

        }

      }}>
        {/* for TV */}
        {/* scale mobile[1.01, 0.835, 0.959] */}
        {/* group displacement mobile [6.1243, 6.4, 10.255] */}
        <group position={[8.12, 3.5, isMobile ? 11.8 : 11.6]} rotation={[0, 1.27, 0]}>
          {(zoomedin && activeDiv == 0) && <Html transform center style={{ transition: "opacity 200ms", opacity: (zoomedin && activeDiv == 0) ? "1" : "0" }} distanceFactor={isMobile ? 2.45 : 2.4} >
            <div
              style={{
                width: "1100px",
                height: "790px",
                pointerEvents: "auto"
              }} className="flex flex-col">
              <Summary animateCamera={animateCamera} cameraBusy={cameraBusy} originalCameraPosition={originalCameraPosition} originalLookAt={originalLookAt} camera={camera} positionofxz={positionofxz} setZoomedin={setZoomedin} zoomedin={zoomedin} text={text}></Summary>
            </div>
          </Html>}
        </group>


        {/* for vending machine */}

        <group position={[-33.589 + 11.6, 5.86 + 4.9, -41.283 + 15.0]} rotation={[0, 0.095 + 0.577, 0]} scale={isMobile ? [1.24 * 3, 0.76 * 6.3, 1.23 * 3] : [1.23 * 4.4, 0.76 * 7.3, 1.23 * 4.4]}>

          {(zoomedin && activeDiv == 1) && <Html center style={{ transition: "opacity 1.4s", opacity: activeDiv == 1 ? 1 : 0 }} distanceFactor={!isMobile ? 1 : 1.05} transform>
            <div style={{ width: "620px", height: "870px" }} className="">
              <Projects animateCamera={animateCamera} cameraBusy={cameraBusy} originalCameraPosition={originalCameraPosition} originalLookAt={originalLookAt} camera={camera} positionofxz={positionofxz} setZoomedin={setZoomedin} zoomedin={zoomedin} text={text}></Projects>
            </div>


          </Html>}


        </group>


        {/* for laptop */}
        {/* old -68.604, 9.075, -51.037
      new -63.007, 9.075, -56.743 */}
        <group position={[-62.901 + 0.200, 9.075, -56.713 + 0.08]} rotation={[-0.071, 0.025 + 3 * (Math.PI) / 8, 0.068]} scale={[3.463 * 0.81, 1.0 * 2.5, 2.576 * 0.81]}>

          {(zoomedin && activeDiv == 2) && <Html center style={{ transition: "opacity 1.4s", opacity: activeDiv == 2 ? 1 : 0, pointerEvents: "auto" }} distanceFactor={!isMobile ? 1.01 : 1.03} transform>
            <div style={{ width: "910px", height: "750px", pointerEvents: "auto" }} className="">
              <Certs animateCamera={animateCamera} cameraBusy={cameraBusy} originalCameraPosition={originalCameraPosition} originalLookAt={originalLookAt} camera={camera} positionofxz={positionofxz} setZoomedin={setZoomedin} zoomedin={zoomedin} text={text}></Certs>
            </div>


          </Html>}


        </group>

        {/* for phone */}
        <group position={[-88.15 + 1.73 + 1.44, 5.93 - 2.05, -90.755 + 4.02]} scale={[1.866, 1.853, 1.866]} rotation={[-0.12, 0.61, 0.07]} >

          {(zoomedin && activeDiv == 3) && <Html center style={{ transition: "opacity 1.4s", opacity: activeDiv == 3 ? 1 : 0 }} distanceFactor={isMobile ? 1.015 : 1.0} transform >
            <div style={{ width: "450px", height: "890px" }} className="">
              <Contact animateCamera={animateCamera} cameraBusy={cameraBusy} originalCameraPosition={originalCameraPosition} originalLookAt={originalLookAt} camera={camera} positionofxz={positionofxz} setZoomedin={setZoomedin} zoomedin={zoomedin} text={text}></Contact>
            </div>


          </Html>}


        </group>


      </primitive>

    </>)
}
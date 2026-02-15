import { useControls } from 'leva'
import { Canvas,useFrame,useThree } from '@react-three/fiber'
import { useRef,useEffect,useState } from 'react'
import { Summary } from './assets/Summary'
import { Projects } from './assets/Projects'
import { Certs } from './assets/Certs'
import {OrbitControls} from '@react-three/drei'
import Scene from './assets/Scene'
import * as THREE from 'three'
import { Contact } from './assets/Contact'
import gsap from 'gsap'
import { Toolbar } from './assets/Toolbar'
import {Warning} from './assets/Warning'
 
function CameraAdjust({scrollProgress,setpositionofxz, cameraBusy, zoomedin,setZoomedin}){

  const {camera} = useThree()

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  const isMobile= /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
  
  camera.updateProjectionMatrix();
  

  useFrame(()=>{
    if(cameraBusy.current) return;
    if(zoomedin) return;
    
    const val = scrollProgress.current.value;
    const posxz=(-49*(scrollProgress.current.value))+11
    camera.position.set(posxz,5,posxz);
    camera.lookAt(new THREE.Vector3(posxz-4,3.5,posxz-4));
    
    setpositionofxz(posxz)
    //11
    //-5.17
    //-21.34
    //-37.51
  })
  return null;
}

function App() {
  const [warning, setWarning]=useState(false)
  useEffect(()=>{
    const isMobile= /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    if(isMobile){
      setWarning(true);
    }
  },[])
  const [tutorial,setTutorial]=useState([1,1,1,1])
  const [zoomedin,setZoomedin]=useState(false);
  
  const [focusObject, setFocusObject]=useState(0)
  const cameraBusy=useRef(false)
  const [viewportHeight, setViewportHeight]=useState(window.innerHeight);

  

  //for handling device resize
  useEffect(()=>{
    const handleResize = () =>{
      setViewportHeight(window.innerHeight)
    }

    window.addEventListener("resize",handleResize);
    return ()=> window.removeEventListener("resize", handleResize);
  },[]);


  const scrollprogress=useRef({value: 0})
  const [positionofxz,setpositionofxz]=useState(0)
  const [activeDiv, setActiveDiv]=useState(0)
  const [animationFinished, setAnimatioFinished]=useState(true)

  useEffect(()=>{
    let isScrollCooldown=false;
    //for desktop
    const handleWheel = (e) =>{
      if(zoomedin){
        e.preventDefault();
        return
      }
      e.preventDefault()

      if(isScrollCooldown || Math.abs(e.deltaY)<20) return;
      let target
      let divInt
    
      if(e.deltaY>0 ){
        if(scrollprogress.current.value+0.33>1.0) return;
        target =scrollprogress.current.value+0.33
        setActiveDiv(prev=> { 
          const newval=Math.min(3,prev+1);
       
          window.scrollTo({top:viewportHeight*newval, behavior:"smooth" })
          return newval
        })
    
      }
      else{
        if(scrollprogress.current.value-0.33<-0.01) return;
        target =scrollprogress.current.value-0.33
        setActiveDiv(prev=> { 
          const newval=Math.max(0,prev-1);
          
          window.scrollTo({top:viewportHeight*newval, behavior:"smooth" })
          return newval
        })
         
      
        
      }
      setAnimatioFinished(false);
      
      
      gsap.to(scrollprogress.current,{
        value: target,
        duration:1.7,
        ease:"power3.out",
        onUpdate:()=>{
          const val=scrollprogress.current.value;
        }, 
        onComplete:()=>{
          setAnimatioFinished(true);

        }
      })
      isScrollCooldown=true;
      setTimeout(()=>{
        isScrollCooldown=false
      },1700)
      
    }

//     // let startY = 0;
//     // const handleTouchStart=(e)=>{
//     //   startY=e.touches[0].clientY;
//     // }
//     // const handleTouchMove=(e)=>{
//     //   e.preventDefault();
//     //   const deltaY=startY-e.touches[0].clientY;
//     //   window.scrollBy({
//     //     top:deltaY*0.5,
//     //     behavior:"auto",
//     //   })
//     //   startY=e.touches[0].clientY;
//     // }
  

  window.addEventListener("wheel", handleWheel,{passive:false});
//   // window.addEventListener("touchstart", handleTouchStart,{passive:true});
//   // window.addEventListener("touchmove", handleTouchMove,{passive:false});
  return () => {
    window.removeEventListener("wheel",handleWheel)
//     // window.removeEventListener("touchstart",handleTouchStart)
//     // window.removeEventListener("touchmove",handleTouchMove)
    };
},[zoomedin]);

  return (<>

    
  
    <div className="relative" >
    {!zoomedin&&<Toolbar viewportHeight={viewportHeight} setActiveDiv={setActiveDiv} scrollprogress={scrollprogress} activeDiv={activeDiv} zoomedin={zoomedin} setZoomedin={setZoomedin}></Toolbar>}
    {warning&&<Warning setWarning={setWarning}></Warning>}
    
    
   
    <Canvas className="" dpr={[1,2]} style={{height:"100vh", position:"fixed", background:"#e187c0", touchAction:"pan-y"}}
    shadows>
      <CameraAdjust scrollProgress={scrollprogress} setpositionofxz={setpositionofxz} cameraBusy={cameraBusy}  zoomedin={zoomedin} setZoomedin={setZoomedin}></CameraAdjust>
      <Scene positionofxz={positionofxz} setpositionofxz={setpositionofxz} cameraBusy={cameraBusy} focusObject={focusObject} setFocusObject={setFocusObject} activeDiv={activeDiv} zoomedin={zoomedin} setZoomedin={setZoomedin} tutorial={tutorial} setTutorial={setTutorial}/>
      {/* <OrbitControls></OrbitControls> */}
    </Canvas>
    
    </div>
    </>
  )
}

export default App

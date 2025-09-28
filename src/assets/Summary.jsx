import Text from "./Text.json"
export function Summary({animateCamera,cameraBusy,originalCameraPosition,originalLookAt,camera, positionofxz,setZoomedin,zoomedin}){
    const lang="English"
    return (
        <div className={` grid bg-green-200` } style={{width:"100%", height:"100%", pointerEvents:zoomedin?"auto":"none"}}>
            
                <div className="relative z-20 mx-4 ">
                    <div className="flex mx-4">
                        <div className=" md:text-5xl pt-4 md:pt-6" style={{fontWeight:"600",letterSpacing:"-1px", fontSize:"50px"}}>{Text[lang].greeting}</div>
                        <img className="z-50 ml-auto pt-2 md:pt-4 cursor-pointer w-[60px]  h-auto object-contain" src="/images/AWSCloudPractitioner.webp" style={{width:"120px"}} onClick={()=>window.open("https://www.credly.com/badges/e75079a6-a347-4a90-8cda-166e5c0dc61e/public_url","_blank")}></img>
                        <img className="z-50 pt-2 md:pt-4 cursor-pointer w-[60px] h-auto object-contain" src="/images/AWSAIPractitioner.webp" style={{width:"120px"}} onClick={()=>window.open("https://www.credly.com/badges/98f22b06-b4dd-4dcd-a219-db0d2c32aa81/public_url","_blank")}></img>
                    </div>
                    <div className="mt-4 md:mt-6 mx-4 md:mx-10 text-lg md:text-2xl">
                    <div className="" style={{fontSize:"23px"}}>{Text[lang].summary}</div>
                    <div className="mt-4 md:mt-6 " style={{fontSize:"24px"}}><span className="font-bold">{Text[lang].Tech_Stack}</span>   Python, Java, Html, Css, Javascript, React, Three.js, React Three Fiber, Tailwind, GLSL, Typescript</div>
                    <div className="mt-4  md:pb-4" style={{fontSize:"24px"}}><span className="font-bold">{Text[lang].Other_Skills}</span>   Figma, Blender</div>
                </div>
                </div>
                <div className="z-50 border cursor-pointer bg-red-200 rounded-xl w-32 h-16 flex justify-center items-center absolute" style={{bottom:"60px", right:"60px"}}
                onClick={()=>{
                    if(cameraBusy.current==false)return;
                    animateCamera(camera,{pos:{x:positionofxz,y:5,z:positionofxz}, target:{x:positionofxz-4,y:3.5,z:positionofxz-4}},cameraBusy,zoomedin)
                    setZoomedin(false)
                }}> Back </div>
                


            
           
        </div>
    )
}
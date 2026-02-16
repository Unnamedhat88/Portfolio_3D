import Text from "./Text.json"
export function Contact({animateCamera,cameraBusy,originalCameraPosition,originalLookAt,camera, positionofxz,zoomedin,setZoomedin}){
    const lang="English"
    const n=3
    
    const links=[
        {   
            img:""
            ,link:"https://github.com/Unnamedhat88",
            title:"Github",
            color:"lightgray"
        
        },
        {
            img:""
            ,link:"https://www.linkedin.com/in/brandon-pratama-kwee-354576302/",
            title:"LinkedIn",
            color:"#7092ff"
          
        },
        
            

        

    ]
    
    return (<div className={` grid rounded-2xl` } style={{width:"100%", height:"100%", pointerEvents:zoomedin?"auto":"none", backgroundImage:"url('/images/phonewp.webp')"}}>
         
             
                <div className="absolute h-full w-full rounded-xl " style={{opacity:"0.6"}}></div>
                <div className="relative z-20  my-4  flex-col justify-center items-center">
                    <div className="text-5xl mx-8" style={{fontWeight:"600",letterSpacing:"-1px"}}>{Text[lang].Contact}</div>
                    <div className="relative items-center gap-4 mt-10 flex flex-col justify-center items-center">
                       {links.map((item,index)=>(
                             <div className="rounded-xl cursor-pointer bg-red-100 flex items-center justify-center py-4 border-4 border-black" key={index} style={{height:"90px",width:"320px", backgroundColor:links[index].color}} 
                             onClick={()=>{ 
                                window.open(item.link,"_blank")}}>
                                <p className="text-3xl">{item.title}</p>
                             </div>   
                        ))}
                        <div className="rounded-xl cursor-pointer bg-red-100 flex items-center justify-center py-4 border-4 border-black bg-blue-100" style={{height:"90px",width:"320px"}}
                        onClick={() => {
                            const link = document.createElement("a");
                            link.href = "https://dl.brandonpratama.com/Brandon_Kwee_Resume.pdf";
                            link.setAttribute("download", "Brandon_Kwee_Resume.pdf");
                            link.target = "_blank";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            }}>
                             
                                <p className="text-2xl">Download Resume</p>
                             </div>   
                        
                        
                    </div>
                    
             

                <div className="absolute rounded-xl cursor-pointer bg-red-200 flex items-center justify-center py-4"  style={{height:"80px",width:"300px", bottom:"20px", left:"6.5%"}} 
                             onClick={()=>{
                                if(cameraBusy.current==false)return;
                                animateCamera(camera,{pos:{x:positionofxz,y:5,z:positionofxz}, target:{x:positionofxz-4,y:3.5,z:positionofxz-4}},cameraBusy,zoomedin)
                                setZoomedin(false)
                                }}>
                            <p className="text-3xl">Go back</p>
                </div>  

            </div>
           
                

                
              

               


            
           
        </div>

    )
}
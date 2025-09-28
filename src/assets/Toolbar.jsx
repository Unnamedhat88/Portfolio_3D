import SummaryIcon from "/images/Summary.svg";
import ProjectIcon from "/images/Project.svg";
import CertIcon from "/images/Awards.svg";
import ContactIcon from "/images/Contacts.svg";
import gsap from "gsap";

export function Toolbar({viewportHeight,setActiveDiv,scrollprogress,activeDiv,zoomedin, setZoomedin}){
    const array=['0.8rem','4.3rem','8.1rem','11.8rem']
    const jumpSection = (targetIndex) =>{
        if(zoomedin)return;
        let target=targetIndex*0.33
        setActiveDiv(targetIndex)

      gsap.to(scrollprogress.current,{
        value: target,
        duration:1.7,
        ease:"power3.out",
        onUpdate:()=>{
          const val=scrollprogress.current.value;
        }, 
    })
    window.scrollTo({top:viewportHeight*targetIndex, behavior:"smooth" })
    }
    
    return (<>
    {/*Glass effect adapted from tutorial: [https://www.youtube.com/watch?v=3HRvb2tLqF4] */}
        <style>{`
            .toolbar{
                background: linear-gradient(135deg, rgba(128,128,128,0.1),rgba(128,128,128,0));
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border-radius:45px;
                border:1px solid rgba(255,255,255,0.18);
                box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
        
            }
            
        `}
        </style>
        <div className="fixed z-20 ml-6 mt-6 w-16 h-64 bg-green-400 flex flex-col toolbar gap-5 justify-center items-center">
            <div className="absolute rounded-full  " style={{width:"3.75rem",height:"3.75rem",top:`${array[activeDiv]}`, backgroundColor:"rgba(253, 232, 255, 1)"}}/>
            <img src={SummaryIcon} className="w-8 z-30 cursor-pointer" onClick={()=>jumpSection(0)}/>
            <img src={ProjectIcon} className="w-10 z-30 cursor-pointer" onClick={()=>jumpSection(1)}/>
            <img src={CertIcon} className="w-10 z-30 cursor-pointer" onClick={()=>jumpSection(2)}/>
            <img src={ContactIcon} className="w-10 z-30 cursor-pointer" onClick={()=>jumpSection(3)}/>
        </div>
        </>
    )
}
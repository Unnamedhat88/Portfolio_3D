import Text from "./Text.json"
export function Certs({animateCamera,cameraBusy,originalCameraPosition,originalLookAt,camera, positionofxz,zoomedin,setZoomedin}){
    const lang="English"
    // const n=2
    
    const CertsData=[
        {title:"AWS Certified Cloud Practitioner", 
            desc:`Gained foundational knowledge of AWS cloud concepts, including core services such as EC2, S3, RDS, and Lambda.
            Also learned about cloud architecture best practices, security, cost management and basic deployment and monitoring strategies. `
            , img:"/images/AWSCloudPractitioner.webp"
            ,link:"https://www.credly.com/badges/e75079a6-a347-4a90-8cda-166e5c0dc61e/public_url"
            },
        {title:"AWS Certified AI Practitioner", 
            desc:`Learned the foundational knowledge of using Amazon's AI services such as Rekognition, Polly, Amazon Q.
             I also learned some foundational AI knowledge such as bias and variance, and retrieval-augmented learning(RAG).`
            , img:"/images/AWSAIPractitioner.webp"
            ,link:"https://www.credly.com/badges/98f22b06-b4dd-4dcd-a219-db0d2c32aa81/public_url"
            },
    ]
    const Cert_icon = ({cert}) =>{
        return(<>
        <div className="z-50 flex flex-col items-center cursor-pointer grid mx-5 " style={{width:"160px", height:"220px"}} onClick={()=>window.open(`${cert.link}`,"_blank")}>
            <img className="w-full h-auto " src={cert.img}></img>
            <p className="text-xl mt-2 flex justify-center font-300 text-center text-white">{cert.title}</p>
        </div>
        
        
       
        </>)
    }

    
    return (
        <div className={` grid ` } style={{width:"100%", height:"100%", pointerEvents:zoomedin?"auto":"auto", backgroundColor:"rgb(14,176,176)"}}>
                <div className="mx-4 my-4 flex ">
                <Cert_icon cert={CertsData[0]}></Cert_icon>
                <Cert_icon cert={CertsData[1]}></Cert_icon>
                </div>

                
                <div className="text-xl z-50 border cursor-pointer bg-red-200 rounded-xl w-32 h-16 flex justify-center items-center absolute" style={{bottom:"60px", right:"60px"}}
                onClick={()=>{
                    if(cameraBusy.current==false)return;
                    animateCamera(camera,{pos:{x:positionofxz,y:5,z:positionofxz}, target:{x:positionofxz-4,y:3.5,z:positionofxz-4}},cameraBusy,zoomedin)
                    setZoomedin(false)
                }}> Back </div>

                <div className="absolute bottom-0 h-10 w-full border-4 border-white" style={{backgroundColor:"rgb(224,224,224)"}}> </div>
                


            
           
        </div>

    )
}
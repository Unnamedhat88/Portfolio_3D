import { useState } from "react"
export function Projects({ animateCamera, cameraBusy, originalCameraPosition, originalLookAt, camera, positionofxz, zoomedin, setZoomedin, text }) {
    const [informationIndex, setInformationIndex] = useState(0)

    const ProjectsData = [
        {
            title: text.projectsData[0].title,
            desc: text.projectsData[0].desc,
            img: "/images/proj1.webp",
            prototypeLink: "NA",
            Sprite: "jasminetea.svg"
        },
        {
            title: text.projectsData[1].title,
            desc: text.projectsData[1].desc,
            img: "/images/proj2.webp",
            prototypeLink: "NA",
            Sprite: "portfolio.svg"
        },
        {
            title: text.projectsData[2].title,
            desc: text.projectsData[2].desc,
            img: "/images/proj3.webp",
            prototypeLink: "NA",
            Sprite: "cicada.svg"
        },
        {
            title: text.projectsData[3].title,
            desc: text.projectsData[3].desc,
            img: "TBA",
            prototypeLink: "NA",
            Sprite: "soldout.svg"
        },
    ]
    const Project_card = ({ ProjectsData, index }) => {
        return (
            <div className="z-50 mt-8 border-4 rounded-xl flex flex-col justify-center items-center  shadow-lg cursor-pointer" style={{ width: "180px", height: "350px", backgroundColor: "rgba(212, 227, 255, 1)" }} onClick={() => { setInformationIndex(index + 1) }}>
                <div className=" mt-2 grid place-items-center" style={{ width: "110px", height: "240px" }}>
                    <img className="object-contain" style={{ height: "250px" }} src={`/images/drinks/${ProjectsData[index].Sprite}`}></img>
                </div>
                <div className="mt-4 text-center font-semibold text-xl">{ProjectsData[index].title}</div>
            </div>
        )
    }


    return (<>
        {(informationIndex < 1) && <><div className="grid grid-cols-3 w-full h-full justify-items-center " style={{ pointerEvents: zoomedin ? "auto" : "none", backgroundColor: "rgba(176, 204, 255, 1)" }}>

            <Project_card ProjectsData={ProjectsData} index={0}></Project_card>
            <Project_card ProjectsData={ProjectsData} index={1}></Project_card>
            <Project_card ProjectsData={ProjectsData} index={2}></Project_card>
            <Project_card ProjectsData={ProjectsData} index={3}></Project_card>
        </div>
            <div className="text-xl z-50 border cursor-pointer bg-red-200 rounded-xl w-32 h-16 flex justify-center items-center absolute" style={{ bottom: "60px", right: "60px" }}
                onClick={() => {
                    if (cameraBusy.current == false) return;
                    animateCamera(camera, { pos: { x: positionofxz, y: 5, z: positionofxz }, target: { x: positionofxz - 4, y: 3.5, z: positionofxz - 4 } }, cameraBusy, zoomedin)
                    setZoomedin(false)
                }}> {text.back} </div>
        </>}

        {(informationIndex >= 1) && <>
            <div className=" w-full h-full justify-items-center pt-4 flex flex-col justify-center items-center " style={{ pointerEvents: zoomedin ? "auto" : "none", backgroundColor: "rgba(176, 204, 255, 1)" }}>
                <div className="pt-2 px-2 rounded-xl bg-gray-200" style={{ width: "600px", height: "350px" }}>
                    {(ProjectsData[informationIndex - 1].img != "TBA") && <img className="rounded-xl object-cover w-full h-full " src={ProjectsData[informationIndex - 1].img} style={{ height: "330px" }}></img>}
                    {(ProjectsData[informationIndex - 1].img == "TBA") && <div className="rounded-xl object-cover w-full h-full flex items-center justify-center" style={{ height: "330px", fontSize: "25px" }}>{text.workInProgress}</div>}
                </div>
                <div className="bg px-2 bg-blue-200 rounded-xl mt-4 py-4 px-4" style={{ width: "600px", height: "390px", fontSize: "23px", whiteSpace: "pre-line" }}>
                    {ProjectsData[informationIndex - 1].desc}
                </div>
                <div className="bg px-2 rounded-xl mt-2 justify-center flex items-center gap-12" style={{ width: "640px", height: "80px" }}>
                    {(ProjectsData[informationIndex - 1].prototypeLink != "NA") && <div className="bg-green-200 rounded-xl font-semibold flex items-center justify-center px-6 cursor-pointer text-center" style={{ width: "190px", height: "75px", fontSize: "22px" }}>
                        {text.navigateToWebsite}
                    </div>}
                    {(ProjectsData[informationIndex - 1].prototypeLink == "NA") && <div className="bg-gray-200 rounded-xl font-semibold flex items-center justify-center px-6 text-center" style={{ width: "190px", height: "75px", fontSize: "22px" }}>
                        {text.currentlyUnavailable}
                    </div>}
                    <div className="bg-red-200 rounded-xl font-semibold flex items-center justify-center px-6 cursor-pointer text-center" style={{ width: "190px", height: "75px", fontSize: "22px" }} onClick={() => { setInformationIndex(0) }}>
                        {text.goBack}
                    </div>
                </div>
            </div>
        </>}
    </>
    )
}
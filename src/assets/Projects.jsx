import { useState } from "react";

export function Projects({ animateCamera, cameraBusy, camera, positionofxz, zoomedin, setZoomedin, text }) {
    const [informationIndex, setInformationIndex] = useState(0);

    const ProjectsData = [
        { title: text.projectsData[0].title, desc: text.projectsData[0].desc, img: "/images/proj1.webp", prototypeLink: "NA", Sprite: "jasminetea.svg", code: "A1", price: "¥120" },
        { title: text.projectsData[1].title, desc: text.projectsData[1].desc, img: "/images/proj2.webp", prototypeLink: "NA", Sprite: "portfolio.svg", code: "A2", price: "¥150" },
        { title: text.projectsData[2].title, desc: text.projectsData[2].desc, img: "/images/proj3.webp", prototypeLink: "NA", Sprite: "cicada.svg", code: "B1", price: "¥100" },
        { title: text.projectsData[3].title, desc: text.projectsData[3].desc, img: "TBA", prototypeLink: "NA", Sprite: "soldout.svg", code: "B2", price: "---" },
        { title: text.projectsData[3].title, desc: text.projectsData[3].desc, img: "TBA", prototypeLink: "NA", Sprite: "soldout.svg", code: "B2", price: "---" },
        { title: text.projectsData[3].title, desc: text.projectsData[3].desc, img: "TBA", prototypeLink: "NA", Sprite: "soldout.svg", code: "B2", price: "---" }
    ]

    const slots = [...ProjectsData];
    const row1 = slots.slice(0, 3);
    const row2 = slots.slice(3, 6);

    const SlotCell = ({ proj, globalIndex }) => {
        const isSoldOut = proj?.img === "TBA";
        return (
            <div className="group relative flex flex-1 flex-col border-r border-white/5 last:border-r-0 cursor-pointer" onClick={() => proj && !isSoldOut && setInformationIndex(globalIndex + 1)}>
                {/* Slot Highlight on Hover */}
                <div className="pointer-events-none absolute inset-0 z-20 border border-cyan-400/25 bg-cyan-400/5 opacity-0 transition-opacity duration-100 group-hover:opacity-100" />

                {/* Glass area */}
                <div
                    className="relative flex flex-1 flex-col items-center justify-end pb-[20px]"

                >
                    {proj && (
                        <>
                            <img
                                src={`/images/drinks/${proj.Sprite}`}
                                alt={proj.title}
                                className="relative z-10 h-[200px] object-contain"

                            />
                        </>
                    )}
                    {/* Shelf Plank */}
                    <div className="absolute bottom-0 left-0 right-0 z-[5] h-3 border-t-2 border-[#e8e8e8] bg-gradient-to-b from-[#d0d0d0] via-[#a8a8a8] to-[#888] shadow-[0_4px_8px_rgba(0,0,0,0.6)]" />
                </div>

                {/* Yellow Label panel */}
                {proj ? (
                    <div className="flex flex-col border-t-[3px] border-[#e8e8e8] bg-[#c8c8c8]">
                        <div className="border-b border-[#a09800] bg-gradient-to-r from-[#e8e000] to-[#d4cc00] px-1 py-0.5 text-center font-mono text-sm font-bold text-black">
                            {proj.title.toUpperCase().slice(0, 14)}
                        </div>

                        {/* Cold Label (tsumeta~i) */}
                        <div className="flex h-8 items-center justify-center border-b border-black/20 bg-[#0066ff]">
                            <div className="font-sans text-[20px] font-black text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                                {text.coldDrink}
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-[#1a1a1a] px-2 py-1">
                            <div
                                className="select-none border-b-2 border-r-2 border-black border-l-2 border-t-2 border-gray-600 bg-gray-900 px-2 font-mono text-base tracking-widest text-cyan-400"
                                onClick={(e) => { e.stopPropagation(); !isSoldOut && setInformationIndex(globalIndex + 1); }}
                            >
                                SEL
                            </div>
                            <span className="font-mono text-base tracking-widest text-yellow-300">{proj.price}</span>
                        </div>
                    </div>
                ) : (
                    <div className="h-10 flex-shrink-0 border-t-[3px] border-[#e8e8e8] bg-[#b8b8b8]" />
                )}
            </div>
        );
    };

    const handleBack = () => {
        if (cameraBusy.current === false) return;
        animateCamera(camera, { pos: { x: positionofxz, y: 5, z: positionofxz }, target: { x: positionofxz - 4, y: 3.5, z: positionofxz - 4 } }, cameraBusy, zoomedin);
        setZoomedin(false);
    };

    // Shared machine casing style
    const machineCasing = "flex h-full w-full flex-col overflow-hidden font-mono border-t-[5px] border-l-[5px] border-[#eeeeee] border-r-[5px] border-b-[5px] border-[#585858]";

    return (
        <>
            {/* ── MAIN VIEW ── */}
            {informationIndex < 1 && (
                <div
                    className={`${machineCasing} bg-gradient-to-br from-[#d4d4d4] via-[#b4b4b4] to-[#9a9a9a]`}
                    style={{ pointerEvents: zoomedin ? "auto" : "none" }}
                >
                    {/* Header */}
                    <div className="flex flex-shrink-0 items-center border-b-[3px] border-black bg-gradient-to-r from-[#1a1a2e] to-[#2a2a4a] px-4 py-1">
                        <span className="font-mono text-xl tracking-widest text-white">WELCOME !</span>
                    </div>

                    {/* Glass window */}
                    <div className="relative mx-2 mt-2 flex flex-1 flex-col overflow-hidden border-b-4 border-r-4 border-[#d8d8d8] border-l-4 border-t-4 border-[#585858] bg-gradient-to-b from-[#1c2c3c] to-[#0e1c2a]">
                        {/* Glass glare */}
                        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-[40%] bg-gradient-to-r from-white/5 to-transparent" />

                        <div className="relative flex flex-1 flex-row">
                            {row1.map((proj, i) => <SlotCell key={i} proj={proj} globalIndex={i} />)}
                        </div>

                        <div className="h-1 flex-shrink-0 bg-[#888]" />

                        <div className="relative flex flex-1 flex-row">
                            {row2.map((proj, i) => <SlotCell key={i} proj={proj} globalIndex={3 + i} />)}
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex flex-shrink-0 justify-end border-t-[3px] border-[#e0e0e0] bg-[#b8b8b8] px-3 py-2">
                        <div
                            className="cursor-pointer select-none border-b-[3px] border-r-[3px] border-[#505050] border-l-[3px] border-t-[3px] border-[#f0f0f0] bg-gradient-to-b from-[#d0d0d0] to-[#b0b0b0] px-4 py-1 font-mono text-xl text-black "
                            onClick={handleBack}
                        >
                            ◀ {text.back}
                        </div>
                    </div>
                </div>
            )}

            {/* ── DETAIL VIEW ── */}
            {informationIndex >= 1 && (
                <div
                    className={`${machineCasing} bg-gradient-to-br from-[#d4d4d4] via-[#b4b4b4] to-[#9a9a9a]`}
                    style={{ pointerEvents: zoomedin ? "auto" : "none" }}
                >
                    {/* Title bar */}
                    <div className="flex flex-shrink-0 items-center justify-between border-b-[3px] border-black bg-gradient-to-r from-[#1a1a2e] to-[#2a2a4a] px-4 py-1">
                        <span className="font-mono text-lg tracking-widest text-white">
                            [Proj] {ProjectsData[informationIndex - 1].title.toUpperCase()}
                        </span>
                        <span className="border-2 border-[#880000] bg-[#cc0000] px-2 py-0.5 font-mono text-base text-yellow-300">
                            {ProjectsData[informationIndex - 1].price}
                        </span>
                    </div>

                    {/* Screenshot */}
                    <div className="flex-shrink-0 px-2 pb-1 pt-2">
                        <div className="h-[300px] overflow-hidden border-b-4 border-r-4 border-[#e8e8e8] border-l-4 border-t-4 border-[#606060] bg-black">
                            {ProjectsData[informationIndex - 1].img !== "TBA" ? (
                                <img src={ProjectsData[informationIndex - 1].img} className="h-full w-full object-cover" alt="Screenshot" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center font-mono text-2xl tracking-widest text-green-400">
                                    ⚙ {text.workInProgress} ⚙
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mx-2 flex-1 border-b-4 border-r-4 border-[#e8e8e8] border-l-4 border-t-4 border-[#606060] bg-white p-3 font-mono text-xl leading-relaxed text-black whitespace-pre-line">
                        {ProjectsData[informationIndex - 1].desc}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-shrink-0 justify-center gap-2 border-t-[3px] border-[#e0e0e0] bg-[#b8b8b8] px-3 py-1">
                        {ProjectsData[informationIndex - 1].prototypeLink !== "NA" ? (
                            <div className="cursor-pointer select-none border-b-[3px] border-r-[3px] border-[#505050] border-l-[3px] border-t-[3px] border-[#f0f0f0] bg-gradient-to-b from-[#d0d0d0] to-[#b0b0b0] px-4 py-1 font-mono text-xl text-green-900 ">
                                ▶ {text.navigateToWebsite}
                            </div>
                        ) : (
                            <div className="border-b-4 border-r-4 border-[#e8e8e8] border-l-4 border-t-4 border-[#606060] bg-[#b0b0b0] px-4 py-1 font-mono text-xl text-gray-500">
                                ✕ {text.currentlyUnavailable}
                            </div>
                        )}
                        <div
                            className="cursor-pointer select-none border-b-[3px] border-r-[3px] border-[#505050] border-l-[3px] border-t-[3px] border-[#f0f0f0] bg-gradient-to-b from-[#d0d0d0] to-[#b0b0b0] px-4 py-1 font-mono text-xl text-black "
                            onClick={() => setInformationIndex(0)}
                        >
                            ◀ {text.goBack}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

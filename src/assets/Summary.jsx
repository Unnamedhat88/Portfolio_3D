export function Summary({ animateCamera, cameraBusy, camera, positionofxz, setZoomedin, zoomedin, text }) {
    const badges = [
        {
            id: 'CLF',
            src: "/images/AWSCloudPractitioner.webp",
            url: "https://www.credly.com/badges/e75079a6-a347-4a90-8cda-166e5c0dc61e/public_url",
            label: "CLOUD_ARCH"
        },
        {
            id: 'AIF',
            src: "/images/AWSAIPractitioner.webp",
            url: "https://www.credly.com/badges/98f22b06-b4dd-4dcd-a219-db0d2c32aa81/public_url",
            label: "AI_CORE"
        }
    ];
    return (
        // bg
        <div
            className="relative flex flex-col w-full h-full p-8 md:p-10 overflow-hidden"
            style={{
                background: 'linear-gradient(to bottom, #0a2e2e 0%, #051414 100%)',
                color: '#76ff7a',
                pointerEvents: zoomedin ? "auto" : "none",
            }}
        >


            {/*Header */}
            <header className="relative z-20 mb-6">
                <h1
                    className="text-3xl md:text-4xl font-black uppercase"
                    style={{
                        textShadow: '3px 3px 0px #2d5a27, -1px -1px 0px #afffab',
                        filter: 'blur(0.2px)'
                    }}
                >
                    {text.greeting}
                </h1>
                {/* seperator */}
                <div className="w-full h-[2px] bg-[#76ff7a] opacity-30 mt-2 shadow-[0_0_10px_#76ff7a]" />
            </header>

            {/*Content Area */}
            <main className="relative z-20 flex flex-col ">
                {/* text+badge */}
                <div className="relative w-full flex mb-8">
                    <p className="text-xl md:text-2xl leading-relaxed opacity-80 italic max-w-2xl font-serif pr-32">
                        {text.summary}
                    </p>
                    {/* badge */}
                    <div className="absolute top-0 right-0 flex flex-col gap-8 items-end z-30">
                        {badges.map((badge) => (
                            <div key={badge.id} className="group relative flex items-center">


                                <div className="relative">
                                    <img
                                        src={badge.src}
                                        alt={badge.label}
                                        className="w-24 md:w-32 h-auto object-contain cursor-pointer transition-all duration-500 hover:scale-110 active:scale-95 z-10"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevents 3D scene from intercepting click
                                            window.open(badge.url, "_blank");
                                        }}
                                    />
                                    <div className="absolute inset-0 rounded-full border border-[#76ff7a]/10 scale-125 pointer-events-none" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* seperator */}
                <div className="w-full h-[2px] bg-[#76ff7a] opacity-30 mt-2 shadow-[0_0_10px_#76ff7a]" />
                {/* tech stack + extra tools */}
                <div className="grid grid-cols-1 gap-4 text-md font-mono uppercase pt-2">
                    <div>
                        <span className="text-[#ffb347] font-bold block mb-1 text-md">
                            [ TECH_STACK ]
                        </span>
                        <p className="opacity-60 ">{text.techStack}</p>
                    </div>
                    <div>
                        <span className="text-[#ffb347] font-bold block mb-1 text-md">
                            [ EXTERNAL_MODULES ]
                        </span>
                        <p className="opacity-60">{text.otherSkills}</p>
                    </div>
                </div>



            </main>



            {/*back button*/}
            <button
                className="absolute z-30 bottom-10 right-10 px-10 py-4 border-2 border-[#76ff7a] text-lg font-bold uppercase tracking-[0.3em] hover:bg-[#76ff7a] hover:text-[#051414] transition-all shadow-[0_0_30px_rgba(118,255,122,0.3)]"
                onClick={() => {
                    if (!cameraBusy.current) return;
                    animateCamera(camera, {
                        pos: { x: positionofxz, y: 5, z: positionofxz },
                        target: { x: positionofxz - 4, y: 3.5, z: positionofxz - 4 }
                    }, cameraBusy, zoomedin);
                    setZoomedin(false);
                }}
            >
                EXIT
            </button>
        </div>
    );
}
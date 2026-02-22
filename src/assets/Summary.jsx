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
        <div
            className="relative flex flex-col items-center p-12 overflow-hidden"
            style={{
                // LOCK the internal resolution
                width: '1100px',
                height: '790px',
                background: 'linear-gradient(to bottom, #0a2e2e 0%, #051414 100%)',
                color: '#76ff7a',
                pointerEvents: zoomedin ? "auto" : "none",
                border: "5px solid red"
            }}
        >
            {/* Header - Fixed sizes, no md: */}
            <header className="relative z-20 mb-8">
                <h1
                    className="text-5xl font-black uppercase"
                    style={{
                        textShadow: '3px 3px 0px #2d5a27, -1px -1px 0px #afffab',
                        filter: 'blur(0.2px)'
                    }}
                >
                    {text.greeting}
                </h1>
                <div className="w-full h-[3px] bg-[#76ff7a] opacity-30 mt-4 shadow-[0_0_15px_#76ff7a]" />
            </header>

            {/* Content Area */}
            <main className="relative z-20 flex flex-col flex-1">
                <div className="relative w-full flex mb-12">
                    {/* Increased font size for the 1024px canvas */}
                    <p className="text-3xl leading-relaxed opacity-80 italic font-serif pr-48">
                        {text.summary}
                    </p>

                    {/* Badges - Absolute positioning works perfectly in a fixed-width container */}
                    <div className="absolute top-0 right-0 flex flex-col gap-10 items-end z-30">
                        {badges.map((badge) => (
                            <div key={badge.id} className="relative">
                                <img
                                    src={badge.src}
                                    alt={badge.label}
                                    className="w-32 h-auto object-contain cursor-pointer transition-all duration-500 hover:scale-110 active:scale-95"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(badge.url, "_blank");
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full h-[2px] bg-[#76ff7a] opacity-20 mb-8" />

                {/* Tech Stack - Mono font */}
                <div className="grid grid-cols-1 gap-8 text-xl font-mono uppercase">
                    <div>
                        <span className="text-[#ffb347] font-bold block mb-2">
                            [ {text.techStackLabel || 'TECH_STACK'} ]
                        </span>
                        <p className="opacity-70 leading-relaxed">{text.techStack}</p>
                    </div>
                    <div>
                        <span className="text-[#ffb347] font-bold block mb-2">
                            [ {text.otherSkillsLabel || 'EXTERNAL_MODULES'} ]
                        </span>
                        <p className="opacity-70 leading-relaxed">{text.otherSkills}</p>
                    </div>
                </div>
            </main>

            {/* Exit Button - Fixed bottom right position */}
            <button
                className="absolute z-30 bottom-12 right-12 px-12 py-5 border-2 border-[#76ff7a] text-2xl font-bold uppercase tracking-[0.3em] hover:bg-[#76ff7a] hover:text-[#051414] transition-all shadow-[0_0_30px_rgba(118,255,122,0.3)]"
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
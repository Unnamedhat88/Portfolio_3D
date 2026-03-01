export function Certs({ animateCamera, cameraBusy, originalCameraPosition, originalLookAt, camera, positionofxz, zoomedin, setZoomedin, text }) {
    const CertsData = [
        {
            title: text.certsData[0].title,
            desc: text.certsData[0].desc,
            img: "/images/AWSCloudPractitioner.webp",
            link: "https://www.credly.com/badges/e75079a6-a347-4a90-8cda-166e5c0dc61e/public_url"
        },
        {
            title: text.certsData[1].title,
            desc: text.certsData[1].desc,
            img: "/images/AWSAIPractitioner.webp",
            link: "https://www.credly.com/badges/98f22b06-b4dd-4dcd-a219-db0d2c32aa81/public_url"
        },
    ]

    const Cert_icon = ({ cert }) => {
        return (
            <div
                className="flex flex-col items-center cursor-pointer"
                style={{
                    width: "370px",
                    margin: "16px 2px",
                }}
                onClick={() => window.open(`${cert.link}`, "_blank")}
            >
                {/* Icon window frame */}
                <div style={{
                    border: "2px solid #000",
                    boxShadow: "2px 2px 0px #000",
                    backgroundColor: "#fff",
                    padding: "8px",
                    width: "160px",
                    height: "160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "box-shadow 0.05s, transform 0.05s",
                }}
                    onMouseDown={e => {
                        e.currentTarget.style.boxShadow = "0px 0px 0px #000"
                        e.currentTarget.style.transform = "translate(2px,2px)"
                    }}
                    onMouseUp={e => {
                        e.currentTarget.style.boxShadow = "2px 2px 0px #000"
                        e.currentTarget.style.transform = "translate(0,0)"
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = "2px 2px 0px #000"
                        e.currentTarget.style.transform = "translate(0,0)"
                    }}
                >
                    <img src={cert.img} style={{ width: "140px", height: "140px", objectFit: "contain" }} />
                </div>
                {/* Label */}
                <p style={{
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: "21px",
                    textAlign: "center",
                    marginTop: "8px",
                    color: "#000",
                    lineHeight: "1.4",
                    maxWidth: "370px",
                    wordBreak: "break-word",
                }}>
                    {cert.title}
                </p>
            </div>
        )
    }

    return (
        <div style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(14, 155, 155, 1)", // classic teal desktop
            fontFamily: "'Courier New', Courier, monospace",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
        }}>

            {/* Title bar */}
            <div style={{
                backgroundColor: "#000080",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "3px 6px",
                borderBottom: "2px solid #000",
                flexShrink: 0,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {/* tiny icon */}
                    <div style={{ width: "14px", height: "14px", backgroundColor: "#fff", border: "1px solid #000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px" }}>🏆</div>
                    <span style={{ fontSize: "28px", fontWeight: "bold", letterSpacing: "0.5px" }}>Certifications.exe</span>
                </div>
                {/* Window controls */}
                <div style={{ display: "flex", gap: "2px" }}>
                    {["_", "□", "✕"].map((s, i) => (
                        <div key={i}
                            onClick={() => {
                                if (s === "✕") {
                                    if (cameraBusy.current == false) return;
                                    animateCamera(camera, { pos: { x: positionofxz, y: 5, z: positionofxz }, target: { x: positionofxz - 4, y: 3.5, z: positionofxz - 4 } }, cameraBusy, zoomedin)
                                    setZoomedin(false)
                                }
                            }}
                            style={{
                                width: "30px", height: "30px",
                                backgroundColor: "#c0c0c0",
                                border: "1px solid #000",
                                boxShadow: "1px 1px 0 #fff inset, -1px -1px 0 #808080 inset",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "20px", cursor: s === "✕" ? "pointer" : "default", userSelect: "none",
                            }}>{s}</div>
                    ))}
                </div>
            </div>

            {/* Menu bar */}
            <div style={{
                backgroundColor: "#c0c0c0",
                borderBottom: "2px solid #000",
                padding: "4px 0px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "2px",
                flexShrink: 0,
                boxShadow: "0 1px 0 #fff inset",
            }}>
                {["File", "Edit", "View", "Help"].map(item => (
                    <span key={item} className="border-2 py-2 px-4" style={{ fontSize: "22px", cursor: "default", color: "#000", userSelect: "none", boxShadow: "1px 1px 0 #fff inset, -1px -1px 0 #808080 inset" }}>{item}</span>
                ))}
            </div>

            {/* Main content area */}
            <div style={{
                flex: 1,
                display: "flex",
                flexWrap: "wrap",
            }}>
                {CertsData.map((cert, i) => (
                    <Cert_icon key={i} cert={cert} />
                ))}
            </div>

            {/* Status bar */}
            <div style={{
                backgroundColor: "#c0c0c0",
                borderTop: "2px solid #000",
                boxShadow: "0 1px 0 #fff inset",
                padding: "2px 8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexShrink: 0,
            }}>
                <span style={{ fontSize: "20px", color: "#000" }}>{CertsData.length} object(s)</span>
                <span style={{ fontSize: "20px", color: "#000" }}>Ready</span>
            </div>

            {/* Back button — retro style */}
            <div className="cursor-pointer"
                onClick={() => {
                    if (cameraBusy.current == false) return;
                    animateCamera(camera, { pos: { x: positionofxz, y: 5, z: positionofxz }, target: { x: positionofxz - 4, y: 3.5, z: positionofxz - 4 } }, cameraBusy, zoomedin)
                    setZoomedin(false)
                }}
                style={{
                    position: "absolute",
                    bottom: "44px",
                    right: "16px",
                    backgroundColor: "#c0c0c0",
                    border: "2px solid #000",
                    boxShadow: "2px 2px 0 #fff inset, -2px -2px 0 #808080 inset",
                    padding: "4px 18px",
                    fontSize: "22px",
                    userSelect: "none",
                    transition: "box-shadow 0.05s, transform 0.05s",
                }}
                onMouseDown={e => {
                    e.currentTarget.style.boxShadow = "-2px -2px 0 #fff inset, 2px 2px 0 #808080 inset"
                    e.currentTarget.style.transform = "translate(1px,1px)"
                }}
                onMouseUp={e => {
                    e.currentTarget.style.boxShadow = "2px 2px 0 #fff inset, -2px -2px 0 #808080 inset"
                    e.currentTarget.style.transform = "translate(0,0)"
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "2px 2px 0 #fff inset, -2px -2px 0 #808080 inset"
                    e.currentTarget.style.transform = "translate(0,0)"
                }}
            >
                {text.back}
            </div>
        </div>
    )
}
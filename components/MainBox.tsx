import "@/app/globals.css"

function MainBox() {
    return (
        <main className="border border-gray-500 rounded-3xl p-8 w-5/12 h-70 bg-zinc-900 drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
            <img src="/pfp.png" className="rounded-[50%] w-24 border border-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
            <br />
            <strong><p className="text-3xl">zarcotech</p></strong>
            <p style={{paddingTop: "15px"}}>14 yr old dev. enjoys web, api, and ai development <br /> also super addicted to f1 🏎️</p>
        </main>
    )
}

export default MainBox;
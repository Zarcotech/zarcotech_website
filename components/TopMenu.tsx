"use client";

interface TopMenuProps {
    page: string;
    setPage: (page: string) => void;
}

const tabs = [
    { label: "home", page: "home" },
    { label: "projects", page: "projects" },
    { label: "socials", page: "socials" },
    { label: "github", page: "github" },
    { label: "acknowledgements", page: "thankyous" },
];

function TopMenu({ setPage, page }: TopMenuProps) {
    const activeIndex = tabs.findIndex((tab) => tab.page === page);

    return (
        <nav className="absolute top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-[1400px] h-16 px-2 border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] z-50 overflow-hidden" style={{background: "transparent", backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(10px)"}}>
            <div className="relative flex h-full">
                <div
                    className="absolute bottom-1 h-10 rounded-xl hover:cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                        width: `${100 / tabs.length}%`,
                        left: `${activeIndex * (100 / tabs.length)}%`,
                    }}
                />

                <div
                    className="absolute bottom-0 h-[2px] rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                        width: `${100 / tabs.length}%`,
                        left: `${activeIndex * (100 / tabs.length)}%`,
                    }}
                />

                {tabs.map((tab) => (
                    <button
                        key={tab.page}
                        onClick={() => setPage(tab.page)}
                        className={`relative z-10 flex flex-1 items-center justify-center rounded-xl text-lg font-semibold tracking-tight transition-all duration-300 ${page === tab.page
                            ? "text-white"
                            : "text-zinc-400 hover:text-white"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </nav>
    );
}

export default TopMenu;

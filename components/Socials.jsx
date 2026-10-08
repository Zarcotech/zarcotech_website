"use client";

import React from "react";

function Socials() {
  const socials = [
    {
      name: "GitHub",
      link: "https://github.com/Zarcotech",
      icon: "/github.png",
    },
    {
      name: "Cash App",
      link: "https://cash.app/$zarcotech",
      icon: "/cashapp.png",
    },
  ];

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${socials.length}, minmax(0, 1fr))` }}>
      {socials.map(({ name, link, icon }) => (
        <a
          key={name}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 p-2">
            <img
              src={icon}
              alt={name}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <h2 className="w-fit text-lg font-semibold text-white underline-offset-4 transition-all duration-300">
              {name}
            </h2>

            <p className="mt-1 truncate text-sm text-white/50">
              {link.replace("https://", "")}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default Socials;
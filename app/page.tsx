"use client";

import { useState } from "react";
import BgCanvas from "@/components/BgCanvas";
import MainBox from "@/components/MainBox";
import Github from "@/components/Github";
import ThankYous from "@/components/ThankYous";
import TopMenu from "@/components/TopMenu";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";

export default function Home() {
  const [page, setPage] = useState("home");

  const components = {
    home: MainBox,
    projects: Projects,
    socials: Socials,
    github: Github,
    thankyous: ThankYous,
  };


  const CurrentComponent = components[page as keyof typeof components];

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <div className="z-10">
        <TopMenu setPage={setPage} page={page} />
      </div>

      <div className="absolute inset-0 bg -z-10">
        <BgCanvas />
      </div>

      <div className="absolute inset-0 flex flex-col flex-1 items-center justify-center font-sans">
        <CurrentComponent />
      </div>
    </div>
  );
}
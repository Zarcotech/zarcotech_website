"use client";

import { useState, useEffect } from "react";

const COLOR_MAP = {
  HTML: "#DD4B25",
  CSS: "#1E4ADE",
  JavaScript: "#EFD81D",
  TeX: "#FFFFFF",
  Python: "#3D74A1",
  PowerShell: "#4477D0",
  Hack: "#E08201",
  Java: "#507E9C",
  Batchfile: "#0BACE6",
  Shell: "whitesmoke",
  PHP: "#7A8CC6",
  Dockerfile: "#2391E6",
};

function LanguageStats({ languages, active }) {
  const [values, setValues] = useState({});
  useEffect(() => {
    if (!active) {
      setValues({});
      return;
    }
    const entries = Object.entries(languages || {});
    if (!entries.length) {
      setValues({});
      return;
    }
    const maxPercentage = Math.max(
      ...entries.map(([, percentage]) => Number(percentage)),
    );
    const dominant = entries.findIndex(
      ([, percentage]) => Number(percentage) === maxPercentage,
    );
    const start = performance.now();
    const duration = 900;
    const dominantDelay = 100;
    let animationFrame;
    const animate = (time) => {
      const elapsed = time - start;
      const nextValues = {};
      entries.forEach(([language, percentage], index) => {
        const target = Number(percentage);
        const isDominant = index === dominant;
        const delay = isDominant ? dominantDelay : 0;
        const progress = Math.min(Math.max((elapsed - delay) / duration, 0), 1);
        const eased = isDominant
          ? 1 - Math.pow(1 - progress, 2.5)
          : 1 - Math.pow(1 - progress, 3);
        nextValues[language] = Math.round(target * eased);
      });
      setValues(nextValues);
      if (elapsed < duration + dominantDelay) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [active, languages]);
  return (
    <div
      className={`grid transition-all duration-300 ease-out ${active ? "grid-rows-[1fr] translate-y-0 opacity-100" : "grid-rows-[0fr] -translate-y-2 opacity-0"}`}
    >
      
      <div className="overflow-hidden">
        
        <div className="mb-5">
          
          <div className="mb-2 text-sm font-medium"></div>
          <div className="space-y-2">
            
            {Object.entries(languages || {}).map(([language, percentage]) => {
              const current = values[language] || 0;
              return (
                <div key={language}>
                  
                  <div className="mb-1 flex justify-between text-xs text-white/60">
                    
                    <span style={{ color: "white" }}>
                      
                      <strong>{language}</strong>
                    </span>
                    <span>{current}%</span>
                  </div>
                  <div
                    className="h-1.5 overflow-hidden rounded-full hover:-translate-y-1"
                    style={{
                      background: "transparent",
                      backdropFilter: "blur(2px)",
                      WebkitBackdropFilter: "blur(10px)",
                    }}
                  >
                    
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${current}%`,
                        backgroundColor: COLOR_MAP[language] || "white",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}



function Projects() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/github");

        if (!response.ok) {
          throw new Error(`error: status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>err: {error}</p>;
  }

  return (
    <div className="pt-30 min-h-screen w-full overflow-x-hidden px-6 py-10 md:px-10">
      <h1 className="mb-8 text-4xl font-bold">
        projects
      </h1>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data.repositories.map((project) => {
          const isHovered = hoveredProject === project.name;

          return (
            <div
              key={project.name}
              onMouseEnter={() =>
                setHoveredProject(project.name)
              }
              onMouseLeave={() =>
                setHoveredProject(null)
              }
              className="group flex min-w-0 flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-[2px] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
            >
              <div className="mb-4 flex min-w-0 items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="relative truncate w-min text-xl font-semibold no-underline after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.name}
                    </a>
                  </h2>

                  <p className="mt-2 break-words text-sm text-white/60">
                    {project.description ||
                      "No description provided."}
                  </p>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap gap-5 text-sm text-white/60">
                <span>
                  <svg
                    aria-label="star"
                    role="img"
                    fill="rgba(145,152,161,1)"
                    style={{
                      display: "inline",
                    }}
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                  >
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z" />
                  </svg>
                  <div className="pl-1 inline-block">{project.stars}</div>
                </span>

                <span>
                  <svg
                    aria-label="fork"
                    role="img"
                    fill="rgba(145,152,161,1)"
                    style={{
                      display: "inline",
                    }}
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                  >
                    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 0 1.5Z" />
                  </svg>
                  <div className="pl-1 inline-block">{project.forks}</div>
                </span>

                <span
                  style={{
                    color:
                      COLOR_MAP[
                      project.primaryLanguage
                      ] || "white",
                    paddingRight: "10px"
                  }}
                >
                  <span
                    style={{
                      borderRadius: "50%",
                      width: "12px",
                      height: "12px",
                      display: "inline-block",
                      position: "relative",
                      top: "1px",
                      backgroundColor:
                        COLOR_MAP[
                        project.primaryLanguage
                        ] || "white",
                      border:
                        ".0625rem solid #ffffff26",
                      
                    }}
                  />
                  <strong><div style={{display: "inline-block", paddingLeft: "5px", color: "white"}}>{project.primaryLanguage || "Unknown"}</div></strong>
                </span>
              </div>

              <LanguageStats
                languages={project.languages}
                active={isHovered}
              />

              <div className="mt-auto border-t border-white/10 pt-4">
                <div className="mt-2 flex justify-between text-xs text-white/40">
                  <span>last push</span>

                  <span>
                    {project.activity?.lastPush
                      ? new Date(
                        project.activity.lastPush
                      ).toLocaleDateString()
                      : "never"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;
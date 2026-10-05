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
  Dockerfile: "#2391E6"
}

function Projects() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>loading...</p>;
  if (error) return <p>err: {error}</p>;

  return (
    <div className="min-h-screen w-full overflow-x-hidden px-6 py-10 md:px-10 mt-30">
      <h1 className="mb-8 text-4xl font-bold">projects</h1>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data.repositories.map((project) => (
          <div
            key={project.name}
            className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-[2px] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
          >
            <div className="mb-4 flex min-w-0 items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="truncate text-xl font-semibold">
                  <a href={project.url} target="_blank">{project.name}</a>
                </h2>

                <p className="mt-2 break-words text-sm text-white/60">
                  {project.description || "No description provided."}
                </p>
              </div>
            </div>

            <div className="mb-5 flex flex-wrap gap-5 text-sm text-white/60">
              <span>★ {project.stars}</span>
              <span>⑂ {project.forks}</span>
              <span style={{ color: COLOR_MAP[project.primaryLanguage] || "white"}}>{project.primaryLanguage || "Unknown"}</span>
            </div>

            <div className="mb-5">
              <div className="mb-2 text-sm font-medium">
                languages
              </div>

              <div className="space-y-2">
                {Object.entries(project.languages || {}).map(
             
                  ([language, percentage]) => (
                    <div key={language}>
                      <div className="mb-1 flex justify-between text-xs text-white/60">
                        <span style={{ color: COLOR_MAP[language] || "white"}}>{language}</span>
                        <span>{percentage}%</span>
                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full" style={{background: "transparent", backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(10px)"}}>
                        <div
                          className="h-full rounded-full bg-white"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

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
        ))}
      </div>
    </div>
  );
}

export default Projects;
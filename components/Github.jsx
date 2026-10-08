import { useState, useEffect } from 'react';
import {GitHubCalendar} from 'react-github-calendar';
import "../app/globals.css"

export default function Github() {
  const [customLoading, setCustomLoading] = useState(true);

  useEffect(() => {
    setCustomLoading(false);
  }, []);

  return (
    <div className="[&_.react-activity-calendar]:bg-transparent bg-transparent" style={{ backgroundColor: 'transparent', padding: '20px', borderRadius: '6px', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: "blur(2px)" }}>
      {customLoading ? (
        <div style={{ color: '#8b949e'}}>loading...</div>
      ) : (
        <GitHubCalendar
          username="Zarcotech"
          theme={{
            dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
          }}
          fontSize={16}
          blockMargin={5}
          blockSize={16}
        />
      )}
    </div>
  );
}

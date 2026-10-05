import { useState, useEffect } from 'react';
import {GitHubCalendar} from 'react-github-calendar';

export default function Github() {
  const [customLoading, setCustomLoading] = useState(true);

  useEffect(() => {
    setCustomLoading(false);
  }, []);

  return (
    <div style={{ backgroundColor: '#0d1117', padding: '20px', borderRadius: '6px', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {customLoading ? (
        <div style={{ color: '#8b949e' }}>loading...</div>
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

const USERNAME = "Zarcotech";

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "zarcotech.dev"
};

async function getRepoLanguages(repoName) {
  const response = await fetch(
    `https://api.github.com/repos/${USERNAME}/${repoName}/languages`,
    {
      headers,
      next: { revalidate: 300 }
    }
  );

  if (!response.ok) return {};

  const languageBytes = await response.json();

  const totalBytes = Object.values(languageBytes).reduce(
    (sum, bytes) => sum + bytes,
    0
  );

  if (!totalBytes) return {};

  return Object.fromEntries(
    Object.entries(languageBytes).map(([language, bytes]) => [
      language,
      Number(((bytes / totalBytes) * 100).toFixed(2))
    ])
  );
}

async function getRepoActivity(repoName, repo) {
  const now = Date.now();
  const pushedAt = new Date(repo.pushed_at).getTime();
  const updatedAt = new Date(repo.updated_at).getTime();

  const daysSincePush = Math.max(
    0,
    (now - pushedAt) / (1000 * 60 * 60 * 24)
  );

  const daysSinceUpdate = Math.max(
    0,
    (now - updatedAt) / (1000 * 60 * 60 * 24)
  );

  let score = 0;

  if (daysSincePush <= 1) {
    score += 100;
  } else if (daysSincePush <= 7) {
    score += 75;
  } else if (daysSincePush <= 30) {
    score += 50;
  } else if (daysSincePush <= 90) {
    score += 25;
  } else if (daysSincePush <= 180) {
    score += 10;
  }

  if (daysSinceUpdate <= 1) {
    score += 25;
  } else if (daysSinceUpdate <= 7) {
    score += 15;
  } else if (daysSinceUpdate <= 30) {
    score += 10;
  }

  score += repo.stargazers_count * 2;
  score += repo.forks_count * 3;
  score += repo.open_issues_count;

  return {
    score,
    lastPush: repo.pushed_at,
    lastUpdate: repo.updated_at
  };
}

export async function GET() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&type=public&sort=updated`,
      {
        headers,
        next: { revalidate: 300 }
      }
    );

    if (!response.ok) {
      return Response.json(
        {
          error: "Failed to fetch GitHub repositories",
          status: response.status
        },
        { status: response.status }
      );
    }

    const repos = await response.json();

    const repositories = await Promise.all(
      repos.map(async (repo) => {
        const [languages, activity] = await Promise.all([
          getRepoLanguages(repo.name),
          getRepoActivity(repo.name, repo)
        ]);

        return {
          name: repo.name,
          url: repo.html_url,
          description: repo.description,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          primaryLanguage: repo.language,
          languages,
          activity
        };
      })
    );

    repositories.sort((a, b) => {
      if (b.activity.score !== a.activity.score) {
        return b.activity.score - a.activity.score;
      }

      return (
        new Date(b.activity.lastPush || 0) -
        new Date(a.activity.lastPush || 0)
      );
    });

    return Response.json({
      username: USERNAME,
      repositories
    });
  } catch (error) {
    return Response.json(
      {
        error: "Internal server error",
        message: error.message
      },
      { status: 500 }
    );
  }
}
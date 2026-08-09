import { useState, useEffect } from 'react';

export function useGithubProjects(username, projectNames) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username || !projectNames || projectNames.length === 0) {
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        const cacheKey = `gh_projects_${username}`;
        const cached = sessionStorage.getItem(cacheKey);
        
        if (cached) {
          const parsed = JSON.parse(cached);
          const filtered = parsed.filter(repo => projectNames.includes(repo.name));
          setProjects(filtered);
          setLoading(false);
          return;
        }

        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        if (!res.ok) throw new Error('Failed to fetch GitHub projects');
        
        const data = await res.json();
        
        // Cache the raw GitHub response
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
        
        const filtered = data.filter(repo => projectNames.includes(repo.name));
        setProjects(filtered);
      } catch (err) {
        console.warn('Failed to fetch GitHub projects:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [username, projectNames.join(',')]);

  return { projects, loading, error };
}

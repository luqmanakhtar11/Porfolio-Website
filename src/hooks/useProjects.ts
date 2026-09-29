import { useCallback, useEffect, useState } from 'react';
import { fetchProjects, type Project } from '../lib/supabaseClient';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchProjects()
      .then(setProjects)
      .catch((e) => setError(e instanceof Error ? e.message : 'Could not load projects.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { projects, loading, error, refresh };
}

import { useEffect, useState } from 'react'
import { fetchProjects } from '@/app/lib/data';
import {Project} from "@/app/lib/definitions";

const useFetchProjects = (sortBy:string|null): [Project[], boolean, Error|null] => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error|null>(null)

  useEffect( () => {
    const retrieveProjects = async () => {
      try {
        setProjects(await fetchProjects(sortBy));
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    retrieveProjects();
  }, [sortBy]);

  return [projects, loading, error];
}

export default useFetchProjects

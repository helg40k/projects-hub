import { useMemo } from 'react';
import { Project } from "@/app/lib/constants/definitions";
import useListenDocument from '@/app/lib/services/firebase/hooks/use-listen-document';
import {PROJECTS} from "@/app/lib/constants/collections";

const useGetProjectStatus = (projectId:string):[Project|null, boolean, Error|undefined] => {
  const query = useMemo(
    () => ({
      ref: `${PROJECTS}/${projectId}`
    }),
    [projectId]
  );

  const [value, loading, error] =
    useListenDocument(query);

  const project = value as Project;
  return [project || null, loading as boolean, error as Error|undefined];
};

export default useGetProjectStatus;

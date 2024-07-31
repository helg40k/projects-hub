import { useMemo } from 'react';
import { ProjectStatus } from "@/app/lib/constants/definitions";
import useListenDocument from '@/app/lib/services/firebase/hooks/use-listen-document';
import {PROJECT_STATUSES} from "@/app/lib/constants/collections";

const useGetProjectStatus = (projectStatusId:string|undefined):[ProjectStatus|null, boolean, Error|undefined] => {
  const query = useMemo(
    () => ({
      ref: `${PROJECT_STATUSES}/${projectStatusId}`
    }),
    [projectStatusId]
  );

  const [value, loading, error] =
    useListenDocument(query);

  const projectStatus = value as ProjectStatus;
  return [projectStatus || null, loading as boolean, error as Error|undefined];
};

export default useGetProjectStatus;

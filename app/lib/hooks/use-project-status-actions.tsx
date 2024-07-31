import { useState } from 'react';
import {PROJECT_STATUSES} from '@/app/lib/constants/collections';
import {ProjectStatus} from "@/app/lib/constants/definitions";
import createDocument from "@/app/lib/services/firebase/helpers/createDocument";
import updateDocument from "@/app/lib/services/firebase/helpers/updateDocument";

const useProjectStatusActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const saveProjectStatus = async (projectStatus: ProjectStatus): Promise<void> => {
    try {
      setLoading(true);
      if (projectStatus?._id) {
        await updateDocument(PROJECT_STATUSES, projectStatus._id, projectStatus);
      } else {
        await createDocument(PROJECT_STATUSES, projectStatus);
      }
    } catch (error:any) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, saveProjectStatus, error };
};

export default useProjectStatusActions;

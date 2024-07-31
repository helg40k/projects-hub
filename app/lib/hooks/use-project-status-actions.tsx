import { useState } from 'react';
import {PROJECTS, PROJECT_STATUSES} from '@/app/lib/constants/collections';
import {ProjectStatus} from "@/app/lib/constants/definitions";
import createDocument from "@/app/lib/services/firebase/helpers/createDocument";
import updateDocument from "@/app/lib/services/firebase/helpers/updateDocument";
import useUser from "@/app/lib/hooks/use-user";

const useProjectStatusActions = (projectId:string|undefined) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const { userId } = useUser();

  const saveProjectStatus = async (projectStatusId:string|undefined, projectStatus: ProjectStatus): Promise<void> => {
    try {
      setLoading(true);
      console.log('Saving: ' + projectStatusId);

      if (projectId) {
        projectStatus.projectId = projectId;
      } else {
        throw Error('Project not found!');
      }

      let data: ProjectStatus;
      let currentProjectStatusId;
      if (projectStatusId) {
        projectStatus._updatedBy = userId;
        data = await updateDocument(PROJECT_STATUSES, projectStatusId, projectStatus) as ProjectStatus;
        currentProjectStatusId = projectStatusId;
      } else {
        projectStatus._createdBy = userId;
        projectStatus.reporterId = userId;
        data = await createDocument(PROJECT_STATUSES, projectStatus) as ProjectStatus;
        currentProjectStatusId = data?._id;
      }

      if (data?.projectId) {
        await updateDocument(PROJECTS, projectId as string, { statusId: currentProjectStatusId, _updatedBy: userId });
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

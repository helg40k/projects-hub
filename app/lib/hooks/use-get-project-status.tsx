import {useEffect, useState} from 'react';
import { ProjectStatus } from "@/app/lib/constants/definitions";
import getDocument from '@/app/lib/services/firebase/helpers/getDocument';
import {PROJECT_STATUSES} from "@/app/lib/constants/collections";
import {DocumentData} from "firebase/firestore";

const useGetProjectStatus = (projectStatusId:string|undefined):[ProjectStatus|null, boolean, Error|undefined] => {
  const [state, setState] = useState<{data:DocumentData|null|undefined, loading:boolean, error:Error|null}>({ data: null, loading: true, error: null })

  useEffect(() => {
    const get = async () => {
      if (!projectStatusId) {
        const error = Error('Empty project status ID!');
        setState({ data: null, loading: false, error });
        return;
      }

      try {
        const data = await getDocument(PROJECT_STATUSES, projectStatusId);
        setState({ data, loading: false, error: null })
      } catch (error:any) {
        setState({ data: null, loading: false, error })
      }
    }
    get();
  }, [projectStatusId]);

  const projectStatus = state.data as ProjectStatus;
  return [projectStatus || null,state.loading as boolean, state.error as Error|undefined];
};

export default useGetProjectStatus;

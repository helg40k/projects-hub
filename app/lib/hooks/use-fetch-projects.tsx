import {useMemo, useEffect, useState} from 'react';
import {DocumentData, OrderByDirection} from "firebase/firestore";
import {PROJECTS} from '@/app/lib/constants/collections';
import getCollectionData from '@/app/lib/services/firebase/helpers/getCollectionData';
import { Project } from "@/app/lib/constants/definitions";
import {NONE_NAME, ASC_DIRECTION, DESC_DIRECTION} from "@/app/lib/constants/sorting";

// import { fetchProjects } from '@/app/lib/data';
// import { projects } from "@/app/lib/placeholder-data";

const useFetchProjects = (sortBy:string|null): [Project[], boolean, Error|undefined] => {
  const [state, setState] = useState<{data:DocumentData[], loading:boolean, error:Error|null}>({ data: [], loading: true, error: null })

  const orderBy = useMemo(
    () => convertSortBy(sortBy),
    [sortBy]
  );

  const options = useMemo(
    () => ({
      // ref: PROJECTS,
      // sort: orderBy && orderBy[0] === 'name' ? orderBy : null
      sort: orderBy
    }),
    [orderBy]
  );

  useEffect(() => {
    const get = async () => {
      try {
        const data = await getCollectionData(PROJECTS, options as any);
        setState({ data, loading: false, error: null })
      } catch (error:any) {
        setState({ data: [], loading: false, error })
      }
    }
    get();
  }, [options]);

  // const projects:Project[] = (data as Project[]);
    // .map((project) => {
    //   project.key = project.code ? project.code : project._id;
    //   // project.manager =
    //   // project.customer =
    //   // project.upwork =
    //   // project.status =
    //   return project;
    // });

  // let sortedProjects: Project[];
  // if (orderBy && orderBy[0] !== 'name') {
  //   const [column, direction] = orderBy;
  //   sortedProjects = projects.toSorted((a: any, b: any) => {
  //     const stringDirection = direction as string;
  //     const f1 = a[column]
  //     const f2 = b[column]
  //     if (f1 === f2) {
  //       console.log(`${f1} === ${f2}`);
  //       return 0;
  //     } else if (!f1 || f1 < f2) {
  //       console.log(`${f1} < ${f2}`);
  //       return ASC_DIRECTION === stringDirection ? -1 : 1;
  //     } else if (!f2 || f1 > f2) {
  //       console.log(`${f1} > ${f2}`);
  //       return DESC_DIRECTION === stringDirection ? -1 : 1;
  //     }
  //     return 0;
  //   });
  // } else {
  //   sortedProjects = projects;
  // }

  return [state.data as Project[], state.loading as boolean, state.error as Error|undefined];
}

const convertSortBy = (sortBy:string|null):[string, OrderByDirection]|null => {
  if (!sortBy || sortBy.includes(NONE_NAME)) {
    return ['active', 'desc' as OrderByDirection];
    // return null;
  }

  const [column, direction] = sortBy.split('-');
  return [column, direction as OrderByDirection];
};

export default useFetchProjects

import { Project } from './definitions';
import { projects } from './placeholder-data';
import { unstable_noStore as noStore } from 'next/cache';
import {NONE_NAME, ASC_DIRECTION, DESC_DIRECTION} from "@/app/lib/constants/sorting";

const fetchProjects = async (sortBy:string|null) => {
  noStore();
  try {
    if (!sortBy || sortBy.includes(NONE_NAME)) {
      return Array.from(projects);
    }

    const [column, direction] = sortBy.split('-');

    return projects.toSorted((a:any, b:any) => {
      const f1 = a[column]
      const f2 = b[column]
      if (f1 === f2) {
        return 0;
      } else if (!f1 || f1 < f2) {
        return ASC_DIRECTION === direction ? -1 : 1;
      } else if (!f2 || f1 > f2) {
        return DESC_DIRECTION === direction ? -1 : 1;
      }
      return 0;
    });
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch projects.');
  }
}

export {
  fetchProjects
}

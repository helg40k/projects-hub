import {AsyncListData, useAsyncList} from "@react-stately/data";
import {SortDescriptor} from "@nextui-org/react";
import {useState} from "react";
import getCollectionData from "@/app/lib/services/firebase/helpers/getCollectionData";
import {PROJECT_STATUSES, PROJECTS} from "@/app/lib/constants/collections";
import {NA} from "@/app/lib/constants/rag-statuses";
import getDocument from "@/app/lib/services/firebase/helpers/getDocument";

const useLoadProjectList = () => {
  const [state, setState] = useState<{loading:boolean, error:Error|null}>({ loading: true, error: null })

  const options = {
    filters: undefined,
    sort: undefined,
    limit: undefined,
    pagination: undefined
  };

  const projects:AsyncListData<any> = useAsyncList({
    async load() {
      try {
        const readStatus = async (statusId:string) => {
          try {
            const status = await getDocument(PROJECT_STATUSES, statusId);
            return status?.rag || null;
          } catch (error) {
            console.error(`Cannot read the project status with ID: ${statusId}`, error);
          }
          return NA;
        };

        const data = await getCollectionData(PROJECTS, options);
        await Promise.allSettled(data.map((project) => {
              const defineStatus = async () => {
                if(project.statusId) {
                  project.status = await readStatus(project.statusId);
                } else {
                  project.status = NA;
                }
              }
              return defineStatus();
            })
        );
        setState({ loading: false, error: null });
        return {
          items: data
        };
      } catch (error:any) {
        setState({ loading: false, error });
        return {
          items: []
        };
      }
    },
    async sort({items, sortDescriptor}:{items:any[], sortDescriptor:SortDescriptor}) {
      console.log(sortDescriptor);
      return {
        items: items.sort((a, b) => {
          const direction = sortDescriptor?.direction as string;
          const column = sortDescriptor?.column as string;
          const first = column ? a[column] : null;
          const second = column ? b[column] : null;

          if (first === second) {
            return 0;
          } else if (!first || first < second) {
            return "ascending" === direction ? -1 : 1;
          } else if (!second || first > second) {
            return "descending" === direction ? -1 : 1;
          }
          return 0;
        }),
      };
    }
  });

  return [projects, state.loading, state.error] as [AsyncListData<any>, boolean, Error|undefined];
}

export default useLoadProjectList;

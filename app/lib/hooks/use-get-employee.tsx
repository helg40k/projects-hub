import { useMemo } from 'react';
import { Employee } from "@/app/lib/definitions";
import useListenDocument from '@/app/lib/services/firebase/hooks/use-listen-document';
import {EMPLOYEES} from "@/app/lib/constants/collections";

const useGetEmployee = (employeeId:string|undefined):[Employee|null, boolean, Error|undefined] => {
  const query = useMemo(
    () => ({
      ref: `${EMPLOYEES}/${employeeId}`
    }),
    [employeeId]
  );

  const [value, loading, error] =
    useListenDocument(query);

  const employee = value as Employee;
  return [employee || null, loading as boolean, error as Error|undefined];
};

export default useGetEmployee;

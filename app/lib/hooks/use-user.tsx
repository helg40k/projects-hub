'use client';

import {useSession} from "next-auth/react";
import {useMemo, useEffect, useState} from "react";
import {EMPLOYEES} from '@/app/lib/constants/collections';
import getDocuments from "@/app/lib/services/firebase/helpers/getDocuments";

const useUser = () => {
  const [userId, setUserId] = useState<string>('anonymous');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const {data, status, update } = useSession();

  const isAuthenticated = useMemo(
    () => 'authenticated' === status,
    [status]);
  const userName = useMemo(
    () => isAuthenticated && data?.user?.name ? data.user.name : 'anonymous',
    [isAuthenticated, data]);
  const iconURL = useMemo(
    () => isAuthenticated && data?.user?.image ? data.user.image : null,
    [isAuthenticated, data]);
  const email = useMemo(
    () => isAuthenticated && data?.user?.email ? data.user.email : null,
    [isAuthenticated, data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const employees = await getDocuments(EMPLOYEES, [['email', '==', email]])
        if (employees.length === 0) {
          setUserId(`UNAUTHORIZED: ${userName} - ${email}`);
        } else if (employees.length > 1) {
          setError(
            new Error(`More than one employee with ${email} email was fetched (${employees.length}): 
            ${employees.map((item) => item.id).reduce((id1, id2) => !id1 ?  id2 : id1 + ', ' + id2)}`)
          );
        }
        setUserId(employees[0].id);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userName, email]);

  return { isAuthenticated, userId, userName, iconURL, email, loading, error };
}

export default useUser;

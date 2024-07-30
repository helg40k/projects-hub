import {useEffect, useState} from "react";
import firestore from '@/app/lib/services/firebase/utils/firestore'
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
  OrderByDirection,
  QueryConstraint,
  Firestore,
  WhereFilterOp,
  DocumentData
} from 'firebase/firestore';

type Props = {
  ref: string,
  where?: Array<[string, WhereFilterOp, any]>,
  orderBy?: [string, OrderByDirection]|null,
  limit?: number
};
const baseSortRule:[string, OrderByDirection] = ['_createdAt', 'desc'];
const baseLimitRule:number = 100;

const useCollection = (props:Props) => {
  const [value, setValue] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>();
  const [error, setError] = useState<Error>();
  const [lastVisible, setLastVisible] = useState();
  const [loadMoreAvailable, setLoadMoreAvailable] = useState<boolean>(true);

  useEffect(() => {
    if (props.where?.length) {
      setLoadMoreAvailable(false);
    }
  }, [props.where]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const documents:any[] = [];
      try {
        const queryExtraParams:QueryConstraint[] = [props.orderBy ? orderBy(...(props.orderBy)) : orderBy(...baseSortRule)];
        if (props.limit) {
          queryExtraParams.push(limit(props.limit));
        }
        const querySnapshot = props.where?.length
          ? query(
            collection(firestore as Firestore, props.ref as string),
            ...(props.where?.map?.((rule) => where(...rule)) || [])
          )
          : query(collection(firestore as Firestore, props.ref as string), ...queryExtraParams);
        const unsubscribe = onSnapshot(querySnapshot, (data) => {
          setValue(data.docs.map((item) => item?.data()));
          setLoading(false);
        })
        return () => {
          unsubscribe?.()
        }
      } catch (err:any) {
        console.error(err);
        setError(err);
      }
      setLastVisible(documents?.[documents?.length - 1]);
    };
    fetchData();
  }, [props.where, props.orderBy, props.limit, props.ref]);

  const next = async () => {
    if (lastVisible) {
      setLoadingMore(true);
      const documents:any[] = [];
      try {
        const queryExtraParams:QueryConstraint = props.orderBy ? orderBy(...(props.orderBy)) : orderBy(...baseSortRule);
        const querySnapshot = await getDocs(
          query(
            collection(firestore as Firestore, props.ref as string),
            queryExtraParams,
            startAfter(lastVisible),
            limit(props.limit || baseLimitRule)
          )
        );
        querySnapshot.forEach((doc) => {
          documents.push(doc)
        })
      } catch (err:any) {
        setError(err);
      }
      setValue((oldValue) => [
        ...oldValue,
        ...documents.map((doc) => doc.data())
      ])
      setLastVisible(documents?.[documents?.length - 1])
      setLoadingMore(false)
    }
  };

  return [value, loading as boolean, error as Error|undefined, next, loadingMore as boolean, loadMoreAvailable as boolean];
};

export default useCollection;

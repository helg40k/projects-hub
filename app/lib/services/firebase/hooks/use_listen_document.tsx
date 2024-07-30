import {useEffect, useState} from "react";
import firestore from '@/app/lib/services/firebase/utils/firestore'
import {
  doc,
  onSnapshot,
  WhereFilterOp,
  DocumentData
} from 'firebase/firestore';

type Props = {
  ref: string,
  where?: Array<[string, WhereFilterOp, any]>
};

const useListenDocument = (props:Props) => {
  const [value, setValue] = useState<DocumentData>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error>()

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(doc(firestore, props.ref), (doc) => {
        setValue(doc.data())
        setLoading(false)
      })
      return () => {
        unsubscribe?.()
      }
    } catch (err:any) {
      setError(err);
    }
  }, [props.ref])

  return [value, loading, error]
};

export default useListenDocument;

import {collection, DocumentData, getDocs, WhereFilterOp, query, where, onSnapshot} from 'firebase/firestore';

import firestore from '@/app/lib/services/firebase/utils/firestore';

/**
 * It gets documents from a collection in Firestore used conditions
 * @param collectionPath - The path to the collection you want to get the document from.
 * @param whereCondition - The condition(s).
 * @returns The data from the documents
 */
const getDocuments = async (collectionPath:string, whereCondition: Array<[string, WhereFilterOp, any]>):Promise<DocumentData[]> => {
  const queryData = query(
    collection(firestore, collectionPath),
    ...(whereCondition?.map?.((rule) => where(...rule)) || []));

  const querySnapshot = await getDocs(queryData);
  return querySnapshot.docs.map((doc) => doc?.data());
}

export default getDocuments

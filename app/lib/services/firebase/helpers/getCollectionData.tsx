import {
  collection,
  getDocs,
  limit,
  // or,
  orderBy,
  query,
  startAfter,
  where,
  OrderByDirection,
  WhereFilterOp,
  DocumentSnapshot, DocumentData,
} from 'firebase/firestore'

import firestore from '@/app/lib/services/firebase/utils/firestore';

type Props = {
  filters: Array<[string, WhereFilterOp, any]> | undefined,
  sort: [string, OrderByDirection] | undefined,
  limit: number | undefined,
  pagination: DocumentSnapshot<any, any> | unknown[] | undefined
};

const baseSortRule:[string, OrderByDirection] = ['_createdAt', 'desc'];
const baseLimitRule:number = 100;

/**
 * Retrieves a big amount of data from a Firestore collection based on the provided parameters.
 *
 * @param collectionPath - The path to the collection you want to get the document from.
 * @param options - Additional options for filtering, sorting, limiting, and pagination.
 *
 * @returns A promise that resolves to an array of documents from the collection.
 */
const getCollectionData = async (collectionPath:string, { filters, sort, limit: limitCount, pagination }:Props):Promise<DocumentData[]> => {
  const collRef = collection(firestore, collectionPath);
  let q = query(collRef);

  // for future: add groups for OR implementing
  // filters.forEach((filterGroup) => {
  //   if (Array.isArray(filterGroup)) {
  //     const conditions = filterGroup
  //     .map((filter) => {
  //       if (filter.field && filter.operator && filter.value !== undefined) {
  //         return where(filter.field, filter.operator, filter.value)
  //       }
  //     })
  //     .filter(Boolean) // remove any undefined values
  //
  //     if (conditions.length > 0) {
  //       q = query(q, or(...conditions))
  //     }
  //   }
  if (filters) {
    filters.forEach((filter) => {
      if (filter[0] && filter[1] && filter[2] !== undefined) {
        q = query(q, where(...filter));
      }
    });
  }

  if (sort && sort[0] && sort[1]) {
    q = query(q, orderBy(...sort));
  }

  if (limitCount) {
    q = query(q, limit(limitCount));
  }

  if (pagination) {
    q = query(q, startAfter(pagination));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
}

export default getCollectionData;

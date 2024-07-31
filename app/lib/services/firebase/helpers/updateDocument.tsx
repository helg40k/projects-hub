import { doc, updateDoc } from 'firebase/firestore';

import firestore from '@/app/lib/services/firebase/utils/firestore';
// import { LOG_TYPES } from '__constants__'
// import { createLog } from 'services/logs'

/**
 * It updates a document in a collection
 * @param collectionPath - The path to the collection you want to update.
 * @param id - The _id of the document you want to update.
 * @param data - The data to be updated.
 * @returns A promise that resolves to the data that was updated.
 */
const updateDocument = async (collectionPath:string, id:string, data:object):Promise<object> => {
  const ref = doc(firestore, collectionPath, id);
  await updateDoc(ref, data);
  // createLog(LOG_TYPES.UPDATE, collectionPath, { ...data, _id })

  return { ...data, _id: id }; // FIXME change the object
}

export default updateDocument;

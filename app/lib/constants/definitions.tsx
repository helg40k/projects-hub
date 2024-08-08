import firebase from 'firebase/compat/app';

export declare type RagStatus = 'N/A' | 'RED' | 'AMBER' | 'GREEN';

export interface Presentable {
  _id: string;
  _createdAt: firebase.firestore.Timestamp;
  _updatedAt: firebase.firestore.Timestamp;
  _createdBy: string;
  _updatedBy: string|null;
  _isUpdated: boolean;
}

export interface RemotePresentable extends Presentable {
  _idNative: string;
}

export interface Project extends RemotePresentable {
  code: string|null;
  name: string;
  manager: string|null;
  customer: string|null;
  upwork: boolean|null;
  statusId: string|null;
  status: string|null;
  meta: Metadata|null;
}

export interface Employee extends RemotePresentable {
  fullName: string;
}

export interface Team extends Presentable {
  teamLeadId: string;
}

export interface ProjectStatus extends Presentable {
  actions: string|null;
  projectId: string;
  rag: RagStatus|null;
  reporterId: string;
  status: string|null;
}

export interface Metadata {
  [key: string]: MetadataBlock;
}

export interface MetadataBlock {
  name: string;
  card: number;
  order: number;
  fields: {
    [key: string]: MetadataField;
  };
}

export interface MetadataField {
  name: string;
  value: string|number|boolean|null;
  order: number;
  type: string;
  URL: string|null;
}

const test:Metadata = {
  general: {
    name: 'Test name',
    card: 0,
    order: 0,
    fields: {
      status: {
        name: 'Test field name',
        value: 'Active',
        order: 0,
        type: 'string',
        URL: null
      }
    }
  }
}
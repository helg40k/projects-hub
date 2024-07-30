import firebase from 'firebase/compat/app';

export declare type RagStatus = 'N/A' | 'RED' | 'AMBER' | 'GREEN';

export interface Presentable {
  _id: string;
  _createdAt: firebase.firestore.Timestamp;
  _updatedAt: firebase.firestore.Timestamp;
  _updatedBy: string;
  _isUpdated: boolean;
}

export interface Project extends Presentable {
  _idNative: string;
  code: string;
  name: string;
  manager: string;
  customer: string;
  upwork: boolean;
  statusId: string;
}

export interface Team extends Presentable {
  _idNative: string;
  teamLeadId: string;
}

export interface Employee extends Presentable {
  _idNative: string;
  fullName: string;
}

export interface ProjectStatus extends Presentable {
  actions: string;
  projectId: string;
  rag: RagStatus;
  reporterId: string;
  status: string;
}

import firebase from 'firebase/compat/app';

export declare type RagStatus = 'N/A' | 'RED' | 'AMBER' | 'GREEN';

export interface Presentable {
  _id: string;
  _createdAt: firebase.firestore.Timestamp;
  _updatedAt: firebase.firestore.Timestamp;
  _updatedBy: string;
  _isUpdated: boolean;
}

export interface RemotePresentable extends Presentable {
  _idNative: string;
}

export interface Project extends RemotePresentable {
  code: string;
  name: string;
  manager: string;
  customer: string;
  upwork: boolean;
  statusId: string;
}

export interface Employee extends RemotePresentable {
  fullName: string;
}

export interface Team extends Presentable {
  teamLeadId: string;
}

export interface ProjectStatus extends Presentable {
  actions: string;
  projectId: string;
  rag: RagStatus;
  reporterId: string;
  status: string;
}

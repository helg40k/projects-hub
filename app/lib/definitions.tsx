export interface Presentable {
  _id: string
}

export interface Project extends Presentable {
  code: string;
  name: string;
  manager: string;
  customer: string;
  upwork: boolean;
  statusId: string;
}

export interface Team extends Presentable {
  teamLeadId: string
}

export interface Employee extends Presentable {
  fullName: string
}

export interface ProjectStatus extends Presentable {
  actions: string;
  projectId: string;
  rag: 'RED' | 'AMBER' | 'GREEN';
  reporterId: string;
  status: string;
}

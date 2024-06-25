export interface Presentable {
  id: string
}

export interface Project extends Presentable {
  code: string;
  name: string;
  manager: string;
  customer: string;
  upwork: boolean;
  status: 'red' | 'amber' | 'green';
}

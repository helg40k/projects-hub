import { Project } from './definitions';

const projects:Project[] = [
  {
    id: 'AT-DWT',
    code: 'AT-DWT',
    name: 'Digital Wallet',
    manager: 'Vlasyslav Vovkodav',
    customer: 'AT',
    upwork: true,
    status: 'green'
  },
  {
    id: 'TN-TNL',
    code: 'TN-TNL',
    name: 'TinyUrl',
    manager: 'Maryna Horielova',
    customer: 'TinyUrl',
    upwork: false,
    status: 'red'
  },
  {
    id: 'ADM-001',
    code: 'ADM-001',
    name: 'Adomik',
    manager: 'Maryna Horielova',
    customer: 'ADM',
    upwork: true,
    status: 'green'
  },
  {
    id: 'PHR-MDK',
    code: 'PHR-MDK',
    name: 'Madicart',
    manager: 'Serhii Semenchenko',
    customer: 'PHR',
    upwork: true,
    status: 'green'
  },
  {
    id: 'UPW-QWK',
    code: 'UPW-QWK',
    name: 'Qwikfone',
    manager: 'Vlasyslav Vovkodav',
    customer: 'UPW',
    upwork: true,
    status: 'green'
  }
];

export {
  projects
};
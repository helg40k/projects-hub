import { Project } from './definitions';

const projects:Project[] = [
  {
    id: '1',
    code: 'PRJ-21-02',
    name: 'Project 21-02',
    manager: 'Super Manager',
    customer: 'Good Customer',
    upwork: false,
    status: 'red'
  },
  {
    id: '2',
    code: 'PRJ-65-mln',
    name: 'Project 65 mln',
    manager: 'Super Mario Mario',
    customer: 'Goombas Customer',
    upwork: true,
    status: 'amber'
  },
  {
    id: '3',
    code: 'PRJ-007',
    name: 'Project 007',
    manager: 'Bond Manager',
    customer: 'Skyfall Customer',
    upwork: false,
    status: 'green'
  }
];

export {
  projects
};
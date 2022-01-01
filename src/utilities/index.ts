import { Ticket, Project } from '../types/services';

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getProject = (ticket: Ticket, projects: Project[]): Project | undefined => {
  return projects.find(p => p._id === ticket.projectId);
};

import { Reducer } from 'redux';
import { Ticket, Workflow, Sprint, TicketType } from '../../types/services';
import { ActionTypes } from '../actions';

interface Action {
  type: ActionTypes;
  payload: any
}

export interface ProjectState {
   backlog: {
     data: Ticket[];
     count: number;
   },
   workflow: Workflow[];
   sprints: Sprint[];
   ticketType: TicketType[];
}

const INITIAL_STATE: ProjectState = {
  backlog: {
    data: [],
    count: 0,
  },
  workflow: [],
  sprints: [],
  ticketType: [],
};

export const projectReducer: Reducer<ProjectState, Action> = (state = INITIAL_STATE, { type, payload }) => {
  switch(type) {
    case ActionTypes.SET_BACKLOG:
      return {
        ...state,
        backlog: payload,
      };

    case ActionTypes.SET_WORKFLOW:
      return {
        ...state,
        workflow: payload,
      };

    case ActionTypes.SET_SPRINTS:
      return {
        ...state,
        sprints: payload,
      };

    case ActionTypes.SET_TICKET_TYPES:
      return {
        ...state,
        ticketType: payload,
      };

    default:
      return state;
  }
};

import { Reducer } from 'redux';
import { Ticket, Workflow } from '../../types/services';
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
}

const INITIAL_STATE: ProjectState = {
  backlog: {
    data: [],
    count: 0,
  },
  workflow: [],
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

    default:
      return state;
  }
};

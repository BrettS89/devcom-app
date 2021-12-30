import { Reducer } from 'redux';
import { Ticket, Workflow, Sprint } from '../../types/services';
import { ActionTypes } from '../actions';

interface Action {
  type: ActionTypes;
  payload: any
}

export interface FilterState {
   backlog: {
     sprint?: string;
     status: {
       _id: string;
       name: string;
     }[];
     priorities: number[];
   },
}

const INITIAL_STATE: FilterState = {
  backlog: {
    sprint: undefined,
    status: [],
    priorities: [],
  },
};

export const filterReducer: Reducer<FilterState, Action> = (state = INITIAL_STATE, { type, payload }) => {
  switch(type) {
    case ActionTypes.SET_BACKLOG_FILTER:
      return {
        ...state,
        backlog: payload,
      };

    default:
      return state;
  }
};

import { Reducer } from 'redux';
import { ActionTypes } from '../actions';

interface Action {
  type: ActionTypes;
  payload: any
}

export interface FilterState {
   backlog: {
     sprint: {
       _id: string;
       name: string;
     }[];
     status: {
       _id: string;
       name: string;
     }[];
     priorities: number[];
     type: {
       _id: string;
       name: string;
     }[];
   },
}

const INITIAL_STATE: FilterState = {
  backlog: {
    sprint: [],
    status: [],
    priorities: [],
    type: [],
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

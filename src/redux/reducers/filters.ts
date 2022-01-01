import { Reducer } from 'redux';
import { ActionTypes } from '../actions';

interface Action {
  type: ActionTypes;
  payload: any
}

interface GenericFilterType {
  _id: string;
  name: string;
}

export interface FilterState {
   backlog: {
     project: GenericFilterType[];
     sprint: GenericFilterType[];
     status: GenericFilterType[];
     priorities: number[];
     type: GenericFilterType[];
   },
}

const INITIAL_STATE: FilterState = {
  backlog: {
    project: [],
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

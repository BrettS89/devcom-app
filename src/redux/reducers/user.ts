import { Reducer } from 'redux';
import { User } from '../../types/services';
import { ActionTypes } from '../actions';

interface Action {
  type: ActionTypes;
  payload: User
}

export interface UserState {
   details?: User;
}

const INITIAL_STATE: UserState = {
  details: undefined,
};

export const userReducer: Reducer<UserState, Action> = (state = INITIAL_STATE, { type, payload }) => {
  switch(type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        details: payload,
      };

    default:
      return state;
  }
};

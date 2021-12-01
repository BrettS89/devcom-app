import { Reducer } from 'redux';
import { ActionTypes } from '../actions';

interface Action {
  type: ActionTypes;
  payload: any;
}

export interface AppState {
  initialized: boolean;
  loading: {
    status: boolean;
    message?: string;
  };
  error: {
    message: string;
  };
  info: {
    message: string;
  };
  snackbarOpen: boolean;
  dealModalOpen: boolean;
  createTicketModalOpen: boolean;
}

const INITIAL_STATE: AppState = {
  initialized: false,
  loading: {
    status: false,
    message: undefined,
  },
  error: {
    message: '',
  },
  info: {
    message: ''
  },
  snackbarOpen: false,
  dealModalOpen: false,
  createTicketModalOpen: false,
};

export const appReducer: Reducer<AppState, Action> = (state = INITIAL_STATE, { type, payload }) => {
  switch(type) {
    case ActionTypes.SET_APP_LOADING:
      return {
        ...state,
        loading: {
          status: payload.status,
          message: payload.message,
        },
      };

    case ActionTypes.SET_APP_ERROR:
      return {
        ...state,
        snackbarOpen: true,
        error: {
          message: payload,
        },
      };

    case ActionTypes.SET_APP_INFO:
      return {
        ...state,
        snackbarOpen: true,
        info: {
          message: payload,
        },
      };

    case ActionTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpen: false,
        error: {
          message: '',
        },
        info: {
          message: '',
        },
      };

    case ActionTypes.SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };

    case ActionTypes.SET_CREATE_TICKET_MODAL_OPEN:
      return {
        ...state,
        createTicketModalOpen: payload,
      };

    default:
      return state;
  }
};

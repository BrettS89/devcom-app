import { Reducer } from 'redux';
import { Ticket, Channel, DM } from '../../types/services';
import { ActionTypes } from '../actions';

interface Action {
  type: ActionTypes;
  payload: any
}

export interface CommunicationState {
   tickets: Ticket[];
   channels: Channel[];
   dms: DM[];
   active: {
     type: string;
     value: string;
     label?: string;
   };
}

const INITIAL_STATE: CommunicationState = {
  active: {
    type: 'channel',
    value: 'General',
    label: 'General',
  },
  channels: [],
  dms: [],
  tickets: [],
};

export const communicationReducer: Reducer<CommunicationState, Action> = (state = INITIAL_STATE, { type, payload }) => {
  switch(type) {
    case ActionTypes.SET_COMMUNICATION_TICKETS:
      return {
        ...state,
        tickets: payload,
      };

    case ActionTypes.SET_COMMUNICATION_CHANNELS:
      return {
        ...state,
        channels: payload,
      };

    case ActionTypes.SET_COMMUNICATION_ACTIVE:
      return {
        ...state,
        active: payload,
      };

    case ActionTypes.SET_COMMUNICATION_DMS:
      return {
        ...state,
        dms: payload,
      };

    default:
      return state;
  }
};

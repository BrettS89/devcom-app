import {
  call, put, takeLatest, select, fork,
} from 'redux-saga/effects';
import _ from 'lodash';
import api from '../../api';
import { ActionTypes, communicationSelector, StoreState } from '../index';
import { Ticket } from '../../types/services';

export default [
  patchTicketWatcher,
];

function * patchTicketWatcher() {
  yield takeLatest(ActionTypes.PATCH_TICKET, patchTicketHandler);
}

interface PatchTicketProps {
  type: ActionTypes;
  payload: {
    id: string;
    patch: {
      ['string']: any;
    }
  }
}

function * patchTicketHandler({ payload }: PatchTicketProps) {
  try {
    const communication: StoreState['communication'] = yield select(communicationSelector);

    const patchTicket = () => api
      .service('project/ticket')
      .patch(payload.id, payload.patch, {
        query: {
          $resolve: {
            assigner: true,
            assignee: true,
            tester: true,
            messages: true,
          }
        }
      });

    const patchedTicket: Ticket = yield call(patchTicket);

    const tickets = _.cloneDeep(communication.tickets);

    const updatedTickets = tickets.map(ticket => {
      return ticket._id === patchedTicket._id
        ? patchedTicket
        : ticket;
    });

    yield put({
      type: ActionTypes.SET_COMMUNICATION_TICKETS,
      payload: updatedTickets,
    });
  } catch(e) {
    console.log(e);
  }
}


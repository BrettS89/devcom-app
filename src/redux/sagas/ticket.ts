import {
  call, put, takeLatest, select, fork,
} from 'redux-saga/effects';
import _ from 'lodash';
import api from '../../api';
import { ActionTypes, communicationSelector, userSelector, StoreState } from '../index';
import { Ticket } from '../../types/services';

export default [
  createTicketWatcher,
  patchTicketWatcher,
];

function * patchTicketWatcher() {
  yield takeLatest(ActionTypes.PATCH_TICKET, patchTicketHandler);
}

function * createTicketWatcher() {
  yield takeLatest(ActionTypes.CREATE_TICKET, createTicketHandler);
}

interface CreateTicketProps {
  type: ActionTypes;
  payload: {
    name: string;
    description: string;
    assigneeUserId?: string;
    testerUserId?: string;
  }
}

function * createTicketHandler ({ payload }: CreateTicketProps) {
  try {
    const user: StoreState['user'] = yield select(userSelector);
    const communication: StoreState['communication'] = yield select(communicationSelector);

    const data = {
      accountId: user?.details?.accountId,
      name: payload.name,
      description: payload.description,
      assignerUserId: user?.details?._id,
      assigneeUserId: payload.assigneeUserId,
      testerUserId: payload.testerUserId,
      status: 'Ready to Begin',
    };

    console.log(data);

    const createTicket = () => api
      .service('project/ticket')
      .create(data, {
        query: {
          $resolve: {
            assigner: true,
            assignee: true,
            tester: true,
            messages: true,
          },
        }
      });

    const createdTicket: Ticket = yield call(createTicket);

    const tickets = _.cloneDeep(communication.tickets);

    tickets.unshift(createdTicket);

    yield put({
      type: ActionTypes.SET_CREATE_TICKET_MODAL_OPEN,
      payload: false,
    });

    yield put({
      type: ActionTypes.SET_COMMUNICATION_TICKETS,
      payload: tickets,
    });

  } catch(e) {

  }
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


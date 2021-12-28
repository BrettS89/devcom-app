import {
  call, put, takeLatest, select, fork,
} from 'redux-saga/effects';
import _ from 'lodash';
import api from '../../api';
import { ActionTypes, communicationSelector, userSelector, StoreState, projectSelector } from '../index';
import { Ticket, Tickets } from '../../types/services';

export default [
  createTicketWatcher,
  patchTicketWatcher,
  fetchMoreTicketsWatcher,
];

function * patchTicketWatcher() {
  yield takeLatest(ActionTypes.PATCH_TICKET, patchTicketHandler);
}

function * createTicketWatcher() {
  yield takeLatest(ActionTypes.CREATE_TICKET, createTicketHandler);
}

function * fetchMoreTicketsWatcher() {
  yield takeLatest(ActionTypes.FETCH_MORE_TICKETS, fetchMoreTicketsHandler);
}

interface CreateTicketProps {
  type: ActionTypes;
  payload: {
    name: string;
    description: string;
    assigneeUserId?: string;
    testerUserId?: string;
    priority?: number;
    statusId: string;
    sprintId: string;
  }
}

function * createTicketHandler ({ payload }: CreateTicketProps) {
  try {
    const user: StoreState['user'] = yield select(userSelector);
    const communication: StoreState['communication'] = yield select(communicationSelector);
    const project: StoreState['project'] = yield select(projectSelector);

    const data = {
      accountId: user?.details?.accountId,
      name: payload.name,
      description: payload.description,
      assignerUserId: user?.details?._id,
      assigneeUserId: payload.assigneeUserId,
      testerUserId: payload.testerUserId,
      statusId: payload.statusId,
      sprintId: payload.sprintId,
      priority: payload.priority || 3,
    };

    const createTicket = () => api
      .service('project/ticket')
      .create(data, {
        query: {
          $resolve: {
            assigner: true,
            assignee: true,
            tester: true,
            messages: true,
            sprint: true,
            status: true,
          },
        }
      });

    const createdTicket: Ticket = yield call(createTicket);
    const tickets = _.cloneDeep(communication.tickets);
    tickets.unshift(createdTicket);

    const backlog = _.cloneDeep(project.backlog);
    backlog.data.unshift(createdTicket);
    backlog.count++;

    yield put({
      type: ActionTypes.SET_CREATE_TICKET_MODAL_OPEN,
      payload: false,
    });

    yield put({
      type: ActionTypes.SET_COMMUNICATION_TICKETS,
      payload: tickets,
    });

    yield put({
      type: ActionTypes.SET_BACKLOG,
      payload: backlog,
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
    const project: StoreState['project'] = yield select(projectSelector);

    const patchTicket = () => api
      .service('project/ticket')
      .patch(payload.id, payload.patch, {
        query: {
          $resolve: {
            assigner: true,
            assignee: true,
            tester: true,
            messages: true,
            sprint: true,
            status: true,
          },
        },
      });

    const patchedTicket: Ticket = yield call(patchTicket);
    const tickets = _.cloneDeep(communication.tickets);
    const backlog = _.cloneDeep(project.backlog);

    const updatedTickets = tickets.map(ticket => {
      return ticket._id === patchedTicket._id
        ? patchedTicket
        : ticket;
    });

    const updatedBacklog = backlog.data.map(ticket => {
      delete ticket.messages;

      return ticket._id === patchedTicket._id
        ? patchedTicket
        : ticket
    });

    yield put({
      type: ActionTypes.SET_COMMUNICATION_TICKETS,
      payload: updatedTickets,
    });

    yield put({
      type: ActionTypes.SET_BACKLOG,
      payload: {
        data: updatedBacklog,
        count: backlog.count,
      },
    });
  } catch(e) {
    console.log(e);
  }
}

interface FetchMoreProps {
  type: ActionTypes;
  payload: number;
}

function * fetchMoreTicketsHandler({ payload }: FetchMoreProps) {
  try {
    const user: StoreState['user'] = yield select(userSelector);
    const project: StoreState['project'] = yield select(projectSelector);

    if (project.backlog.data.length === project.backlog.count) {
      return;
    }

    const fetchMore = () => api
      .service('project/ticket')
      .find({
        query: {
          accountId: user?.details?.accountId,
          $skip: project.backlog.data.length,
          $limit: payload,
          $sort: { _id: -1 },
        },
      });

    const tickets: Tickets = yield call(fetchMore);
    const backlog = _.cloneDeep(project.backlog);
    backlog.data.push(...tickets.data);

    yield put({
      type: ActionTypes.SET_BACKLOG,
      payload: backlog,
    });
  } catch(e) {
    console.log(e);
  }
}

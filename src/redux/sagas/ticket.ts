import {
  call, put, takeLatest, select, fork,
} from 'redux-saga/effects';
import _ from 'lodash';
import api from '../../api';
import { ActionTypes, communicationSelector, filterSelector, userSelector, StoreState, projectSelector } from '../index';
import { Ticket, Tickets } from '../../types/services';

export default [
  createTicketWatcher,
  fetchBacklogWatcher,
  patchTicketWatcher,
  fetchMoreTicketsWatcher,
];

function * patchTicketWatcher() {
  yield takeLatest(ActionTypes.PATCH_TICKET, patchTicketHandler);
}

function * createTicketWatcher() {
  yield takeLatest(ActionTypes.CREATE_TICKET, createTicketHandler);
}

function * fetchBacklogWatcher() {
  yield takeLatest(ActionTypes.FETCH_BACKLOG, fetchBacklogHandler);
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
    typeId: string;
    projectId: string;
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
      typeId: payload.typeId,
      projectId: payload.projectId,
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
            type: true,
          },
        },
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
            type: true,
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
          $resolve: {
            assigner: true,
            assignee: true,
            tester: true,
            messages: true,
            sprint: true,
            status: true,
            type: true,
          },
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

function * fetchBacklogHandler() {
  try {
    const filters: StoreState['filter'] = yield select(filterSelector);

    const statusId = filters.backlog.status.map(s => s._id);
    const sprintId = filters.backlog.sprint.map(s => s._id);
    const typeId = filters.backlog.type.map(t => t._id);
    const projectId = filters.backlog.project.map(p => p._id);
    const priority = filters.backlog.priorities;

    const query = {
      priority,
      projectId: { $in: projectId },
      statusId: { $in: statusId },
      sprintId: { $in: sprintId },
      typeId: { $in: typeId },
      $resolve: {
        assigner: true,
        assignee: true,
        tester: true,
        messages: true,
        sprint: true,
        status: true,
        type: true,
      },
    };

    //@ts-ignore
    if (!statusId.length) delete query.statusId;
    //@ts-ignore
    if (!priority.length) delete query.priority;
    //@ts-ignore
    if (!sprintId.length) delete query.sprintId;
    //@ts-ignore
    if (!typeId.length) delete query.typeId;
    //@ts-ignore
    if (!projectId.length) delete query.projectId;

    const fn = () => api
      .service('project/ticket')
      .find({
        query,
      });

    const tickets: Tickets = yield call(fn);

    yield put({
      type: ActionTypes.SET_BACKLOG,
      payload: {
        data: tickets.data,
        count: tickets.data.length,
      },
    });

  } catch(e) {
    console.log(e);
  }
}
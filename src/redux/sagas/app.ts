import {
  call, put, takeLatest, select, fork,
} from 'redux-saga/effects';
import _ from 'lodash';
import api from '../../api';
import { ActionTypes } from '../actions';
import { ChannelMembers, Channels, DMs, User, Sprints, Tickets, Workflows, TicketTypes, Projects } from '../../types/services';
import { sleep } from '../../utilities';

export default [
  initializeWatcher,
];

function * initializeWatcher() {
  yield takeLatest(ActionTypes.INITIALIZE, initializeHandler);
}

interface InitializeHandlerProps {
  type: ActionTypes;
  payload: {
    navigate(path: string): void;
    path: string;
  }
}

function * initializeHandler({ payload }: InitializeHandlerProps) {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token');
    }

    const getUser = () => api
      .service('security/session')
      .find();

    const user: User = yield call(getUser);

    const getJoinedChannels = () => api
      .service('communication/channel-member')
      .find({
        query: {
          userId: user._id,
        },
      });

    const getProjects = () => api
      .service('project/project')
      .find({
        query: {
          accountId: user.accountId,
        },
      });

    const getTicketTypes = () => api
      .service('project/ticket-type')
      .find({
        query: {
          accountId: user.accountId,
        },
      });

    const getTickets = () => api
      .service('project/ticket')
      .find({
        query: {
          accountId: user.accountId,
          $or: [
            { assigneeUserId: user._id, },
            { assignerUserId: user._id, },
          ],
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

    const getBacklog = () => api
      .service('project/ticket')
      .find({
        query: {
          accountId: user.accountId,
          $limit: 100,
          $sort: { _id: -1 },
          $resolve: {
            assigner: true,
            assignee: true,
            tester: true,
            sprint: true,
            status: true,
            type: true,
          },
        },
      });

    const getChannels = (channelIds: string[]) => api
      .service('communication/channel')
      .find({
        query: {
          accountId: user.accountId,
          _id: { $in: channelIds },
          $resolve: {
            messages: true,
          }
        },
      });

    const getDms = () => api
      .service('communication/dm')
      .find({
        query: {
          $and: [
            { accountId: user.accountId },
            { userIds: user._id },
          ],
          // accountId: user.accountId,
          // userIds: user._id,
          $resolve: {
            messages: true,
            usersName: true,
          },
        },
      });

    const getWorkflow = () => api
      .service('project/workflow')
      .find({
        query: {
          accountId: user.accountId,
        },
      });

    const getSprints = () => api
      .service('project/sprint')
      .find({
        query: {
          accountId: user.accountId,
        },
      });

    const tickets: Tickets = yield call(getTickets);
    const backlog: Tickets = yield call(getBacklog);
    const memberChannels: ChannelMembers = yield call(getJoinedChannels);
    const ids = memberChannels.data.map((ch) => ch.channelId);
    const channels: Channels = yield call(() => getChannels(ids));
    const dms: DMs = yield call(getDms);
    const workflows: Workflows = yield call(getWorkflow);
    const sprints: Sprints = yield call(getSprints);
    const ticketTypes: TicketTypes = yield call(getTicketTypes);
    const projects: Projects = yield call(getProjects);

    console.log(projects)

    payload.navigate(payload.path);

    yield put({
      type: ActionTypes.SET_COMMUNICATION_TICKETS,
      payload: tickets.data,
    });

    yield put({
      type: ActionTypes.SET_COMMUNICATION_CHANNELS,
      payload: channels.data,
    });

    yield put({
      type: ActionTypes.SET_COMMUNICATION_DMS,
      payload: dms.data,
    });

    if (tickets.data.length) {
      yield put({
        type: ActionTypes.SET_COMMUNICATION_ACTIVE,
        payload: {
          type: 'ticket',
          value: tickets.data?.[0]?._id,
        },
      });
    }

    yield put({
      type: ActionTypes.SET_PROJECTS,
      payload: projects.data,
    });

    yield put({
      type: ActionTypes.SET_TICKET_TYPES,
      payload: ticketTypes.data,
    });

    yield put({
      type: ActionTypes.SET_BACKLOG,
      payload: {
        data: backlog.data,
        count: backlog.total,
      },
    });

    yield put({
      type: ActionTypes.SET_USER,
      payload: user,
    });

    yield put({
      type: ActionTypes.SET_WORKFLOW,
      payload: workflows.data,
    });

    yield put({
      type: ActionTypes.SET_INITIALIZED,
      payload: true,
    });

    yield put({
      type: ActionTypes.SET_SPRINTS,
      payload: sprints.data,
    });

  } catch(e) {
    yield put({
      type: ActionTypes.SET_INITIALIZED,
      payload: true,
    });

    console.log(e);
    payload.navigate('/');
  }
}

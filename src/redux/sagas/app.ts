import {
  call, put, takeLatest, select, fork,
} from 'redux-saga/effects';
import _ from 'lodash';
import api from '../../api';
import { ActionTypes } from '../actions';
import { ChannelMembers, Channels, DMs, User, Tickets } from '../../types/services';
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

    yield sleep(500);

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

    const getTickets = () => api
      .service('project/ticket')
      .find({
        query: {
          accountId: user.accountId,
          $or: [
            { assigneeUserId: user._id, },
            { assignerUserId: user._id, },
          ],
          $sort: {
            _id: -1,
          },
          $resolve: {
            assigner: true,
            assignee: true,
            tester: true,
            messages: true,
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

    const tickets: Tickets = yield call(getTickets);
    const memberChannels: ChannelMembers = yield call(getJoinedChannels);
    const ids = memberChannels.data.map((ch) => ch.channelId);
    const channels: Channels = yield call(() => getChannels(ids));
    const dms: DMs = yield call(getDms);

    console.log(dms);

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
      type: ActionTypes.SET_USER,
      payload: user,
    });

    yield put({
      type: ActionTypes.SET_INITIALIZED,
      payload: true,
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

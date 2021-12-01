import {
  call, put, takeLatest, select, fork,
} from 'redux-saga/effects';
import _ from 'lodash';
import api from '../../api';
import { ActionTypes, communicationSelector, StoreState, userSelector } from '../index';
import { Message } from '../../types/services';

export default [
  sendMessageWatcher,
];

function * sendMessageWatcher() {
  yield takeLatest(ActionTypes.SEND_MESSAGE, sendMessageHandler);
}

interface SendMessageProps {
  type: ActionTypes;
  payload: {
    text: string;
  }
}

function * sendMessageHandler({ payload }: SendMessageProps) {
  try {
    const { details: user }: StoreState['user'] = yield select(userSelector);
    const communication: StoreState['communication'] = yield select(communicationSelector);

    const message = {
      userId: user?._id,
      accountId: user?.accountId,
      text: payload.text,
      ticketId: communication.active.type === 'ticket' ? communication.active.value : undefined,
      channelId: communication.active.type === 'channel' ? communication.active.value : undefined,
      dmId: communication.active.type === 'dm' ? communication.active.value : undefined,
      type: communication.active.type,
    };

    const fn = () => api
      .service('communication/message')
      .create(message, {
        query: {
          $resolve: {
            user: true,
          },
        },
      });

    const createdMessage: Message = yield call(fn);

    if (message.ticketId) {
      const tickets = _.cloneDeep(communication.tickets);

      const updatedTickets = tickets.map(ticket => {
        if (ticket._id !== message.ticketId) return ticket;

        ticket.messages?.push(createdMessage);

        return ticket;
      });

      yield put({
        type: ActionTypes.SET_COMMUNICATION_TICKETS,
        payload: updatedTickets,
      });
    }

    if (message.channelId) {
      const channels = _.cloneDeep(communication.channels);

      const updatedChannels = channels.map(channel => {
        if (channel._id !== message.channelId) return channel;

        channel.messages?.push(createdMessage);

        return channel;
      });

      yield put({
        type: ActionTypes.SET_COMMUNICATION_CHANNELS,
        payload: updatedChannels,
      });
    }

    if (message.dmId) {
      const dms = _.cloneDeep(communication.dms);

      const updatedDms = dms.map(dm => {
        if (dm._id !== message.dmId) return dm;

        dm.messages?.push(createdMessage);

        return dm;
      });

      yield put({
        type: ActionTypes.SET_COMMUNICATION_DMS,
        payload: updatedDms,
      });
    }

  } catch(e) {
    console.log(e);
  }
}

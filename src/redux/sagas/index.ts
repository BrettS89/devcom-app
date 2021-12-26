import { all, fork } from 'redux-saga/effects';
import appSagas from './app';
import communicationSagas from './communication';
import ticketSagas from './ticket';
import sprintSagas from './sprint';
import userSagas from './user';

const forkList = (sagasList: any) => sagasList.map((saga: any) => fork(saga));

export function * sagas() {
  yield all([
    ...forkList(appSagas),
    ...forkList(communicationSagas),
    ...forkList(ticketSagas),
    ...forkList(sprintSagas),
    ...forkList(userSagas),
  ]);
}

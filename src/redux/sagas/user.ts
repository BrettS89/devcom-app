import {
  call, put, takeLatest, select
} from 'redux-saga/effects';
import _ from 'lodash';
import api from '../../api';
import { ActionTypes } from '../actions';
import { User } from '../../types/services';

export default [
  signInWatcher,
];

function * signInWatcher() {
  yield takeLatest(ActionTypes.SIGN_IN, signInHandler);
}

interface SignInProps {
  type: ActionTypes;
  payload: {
    navigate(path: string): void;
    email: string;
    password: string;
  }
}

interface signIn {
  user: User;
  token: string
}

function * signInHandler({ payload }: SignInProps) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: { status: true } });

    const signIn = () => api
      .service('security/session')
      .create({
        email: payload.email,
        password: payload.password,
      });

    const { user, token }: signIn = yield call(signIn);

    localStorage.setItem('token', token);

    yield put({
      type: ActionTypes.SET_USER,
      payload: user,
    });

    yield put({ type: ActionTypes.SET_APP_LOADING, payload: { status: false } });

    payload.navigate('/chat');

  } catch(e: any) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: { status: false } });
    yield put({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
  }
}

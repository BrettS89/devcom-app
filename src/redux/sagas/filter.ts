import {
  call, put, takeLatest, select, fork,
} from 'redux-saga/effects';
import _ from 'lodash';
import api from '../../api';
import { ActionTypes, filterSelector, StoreState } from '../index';

export default [
  updateBacklogFilterWatcher,
];

function * updateBacklogFilterWatcher() {
  yield takeLatest(ActionTypes.UPDATE_BACKLOG_FILTER, updateBacklogFilterHandler);
}

interface UpdateBacklogProps {
  type: ActionTypes;
  payload: {
    field: string;
    value: any;
    name: string;
  }
}

function * updateBacklogFilterHandler({ payload }: UpdateBacklogProps) {
  try {
    const filter: StoreState['filter'] = yield select(filterSelector);
    const backlogFilters = _.cloneDeep(filter.backlog);

    switch(payload.field) {
      case 'status':
        if (!backlogFilters.status.find(s => s._id === payload.value)) {
          backlogFilters.status.push({ _id: payload.value, name: payload.name });
        } else {
          const updatedStatus = backlogFilters
            .status
            .filter(status => status._id !== payload.value);

          backlogFilters.status = updatedStatus;
        }
        yield put({
          type: ActionTypes.SET_BACKLOG_FILTER,
          payload: backlogFilters,
        });
        return;

    case 'priority':
      if (!backlogFilters.priorities.includes(payload.value)) {
        backlogFilters.priorities.push(payload.value);
      } else {
        const updatedPriorities = backlogFilters
          .priorities
          .filter(p => p !== payload.value);

        backlogFilters.priorities = updatedPriorities;
      }
      yield put({
        type: ActionTypes.SET_BACKLOG_FILTER,
        payload: backlogFilters,
      });
      return;

      default:
        return backlogFilters;

    case 'sprint':
      if (!backlogFilters.sprint.find(s => s._id === payload.value)) {
        backlogFilters.sprint.push({ _id: payload.value, name: payload.name });
      } else {
        const updatedSprints = backlogFilters
          .sprint
          .filter(sprint => sprint._id !== payload.value);

        backlogFilters.sprint = updatedSprints;
      }
      yield put({
        type: ActionTypes.SET_BACKLOG_FILTER,
        payload: backlogFilters,
      });
      return;

      case 'type':
      if (!backlogFilters.type.find(s => s._id === payload.value)) {
        backlogFilters.type.push({ _id: payload.value, name: payload.name });
      } else {
        const updatedSprints = backlogFilters
          .type
          .filter(type => type._id !== payload.value);

        backlogFilters.type = updatedSprints;
      }
      yield put({
        type: ActionTypes.SET_BACKLOG_FILTER,
        payload: backlogFilters,
      });
      return;
    }


  } catch(e) {
    console.log(e);
  }
}

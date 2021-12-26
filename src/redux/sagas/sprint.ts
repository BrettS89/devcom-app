import {
  call, put, takeLatest, select, fork,
} from 'redux-saga/effects';
import _ from 'lodash';
import api from '../../api';
import { ActionTypes, StoreState, projectSelector } from '../index';
import { Sprint } from '../../types/services';

export default [
  patchSprintWatcher
];

function * patchSprintWatcher() {
  yield takeLatest(ActionTypes.PATCH_SPRINT, patchSprintHandler);
}

interface PatchSprintProps {
  type: ActionTypes;
  payload: {
    _id: string;
    data: Record<string, any>
  }
}

function * patchSprintHandler({ payload }: PatchSprintProps) {
  try {
    const project: StoreState['project'] = yield select(projectSelector);

    const patchSprint = () => api
      .service('project/sprint')
      .patch(payload._id, payload.data);

    const updatedSprint: Sprint = yield call(patchSprint);

    const sprintsClone = _.cloneDeep(project.sprints);

    const updatedSprints = sprintsClone.map(sprint => {
      return sprint._id === updatedSprint._id
        ? updatedSprint
        : sprint;
    });

    yield put({
      type: ActionTypes.SET_SPRINTS,
      payload: updatedSprints,
    });

  } catch(e) {
    console.log(e);
  }
}

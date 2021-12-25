import { combineReducers } from 'redux';
import { appReducer, AppState } from './app';
import { communicationReducer, CommunicationState } from './communication';
import { projectReducer, ProjectState } from './project';
import { userReducer, UserState } from './user';

export interface StoreState {
  app: AppState;
  communication: CommunicationState;
  project: ProjectState;
  user: UserState;
}

export const reducers = combineReducers({
  app: appReducer,
  user: userReducer,
  communication: communicationReducer,
  project: projectReducer,
});

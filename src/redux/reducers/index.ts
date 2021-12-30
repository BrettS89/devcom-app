import { combineReducers } from 'redux';
import { appReducer, AppState } from './app';
import { communicationReducer, CommunicationState } from './communication';
import { filterReducer, FilterState } from './filters';
import { projectReducer, ProjectState } from './project';
import { userReducer, UserState } from './user';

export interface StoreState {
  app: AppState;
  communication: CommunicationState;
  filter: FilterState;
  project: ProjectState;
  user: UserState;
}

export const reducers = combineReducers({
  app: appReducer,
  user: userReducer,
  communication: communicationReducer,
  filter: filterReducer,
  project: projectReducer,
});

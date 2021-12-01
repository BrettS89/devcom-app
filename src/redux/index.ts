import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import reduxReset from 'redux-reset';
import { reducers, StoreState } from './reducers';
import { sagas } from './sagas';

export * from './reducers';
export * from './actions';

const sagaMiddleware = createSagaMiddleware();

export const store = () => {
  const middlewares = [
    sagaMiddleware,
  ];

  const store = createStore(
    reducers,
    compose(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(sagas);

  return store;
};

// SELECTORS
export const appSelector = (state: StoreState) => state.app;
export const communicationSelector = (state: StoreState) => state.communication;
export const userSelector = (state: StoreState) => state.user;

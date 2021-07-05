import { createStore } from 'redux';
import { rootReducer } from './reducers/rootReducer';

export const store = createStore(
  rootReducer,
  /* eslint-disable no-underscore-dangle */
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  /* eslint-enable */
);

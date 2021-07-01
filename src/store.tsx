import { createStore } from 'redux';
import { rootReducer } from './reducers/rootReducer';

// interface IS




export const store = createStore(
  rootReducer,
  // initialState,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
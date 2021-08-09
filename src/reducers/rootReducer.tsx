import { combineReducers } from 'redux';
import { cardSet } from './card-set';

export const rootReducer = combineReducers({ cardSet });

export type RootState = ReturnType<typeof rootReducer>;

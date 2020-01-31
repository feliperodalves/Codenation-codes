import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import contacts from './contacts';

const rootPersistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({ contacts });

export default persistReducer(rootPersistConfig, rootReducer);

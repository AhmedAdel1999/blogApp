import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage'
import hardSet from 'reduxjs-toolkit-persist/lib/stateReconciler/hardSet'
import thunk from 'redux-thunk';
import userSlice from '../features/blog/userSlice';
import postSlice from '../features/blog/postSlice';
import categorySlice from '../features/blog/categorySlice';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: hardSet,
};

const reducers = combineReducers({
  user: userSlice,
  post:postSlice,
  category:categorySlice,
});

const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: [thunk]
});

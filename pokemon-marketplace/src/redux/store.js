import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootSagas from './sagas';
//import { funcTake } from './sagas/pokemons.sagas';

import DefaultReducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducers = persistReducer(persistConfig, DefaultReducers);

const store = createStore(persistedReducers, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

export { store, persistor };

sagaMiddleware.run(rootSagas);

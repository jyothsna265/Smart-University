import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
//Import root reducer
import rootReducer from './reducers/index';
import promise from "redux-promise";

const initialState={}

const middleware = [thunk];

const persistConfig = {
    key: 'root',
    storage,
  }

//middleware settings
// To resolve promise to store we use apply
//const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const enhancers = compose(
//     applyMiddleware(...middleware),
//     window.devToolsExtension ? window.devToolsExtension() : f=>f
// )
const persistedReducer = persistReducer(persistConfig, rootReducer);
//const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// const store = createStore(rootReducer, initialState, enhancers);

// if(module.hot) {
//     module.hot.accept('./reducers/',() => {
//         const nextRootReducer = require('./reducers/index').default;
//         store.replaceReducer(nextRootReducer);
//     })
// } 
  

// export default store;

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
  }
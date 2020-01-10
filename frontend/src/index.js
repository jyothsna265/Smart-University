import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';

function saveToLocalStorage(state){
    try{
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
        console.log("Storing Data into storage");
    } catch(e){
        console.log(e)
    }
}

function loadFromLocalStorage(){
    try {
        const serializedState = localStorage.getItem('state');
        console.log("Loading Data from storage");
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState)
    } catch(e){
        console.log(e)
        return undefined

    }
}

// const persistedState = loadFromLocalStorage()
const store = createStore(
    rootReducer, 
    // persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
);
// store.subscribe(() => {
//     console.log("Data changed: " + JSON.stringify(store.getState()));
//     saveToLocalStorage(store.getState())})

console.log("State: " + JSON.stringify(store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
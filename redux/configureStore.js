import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
import { promos } from './promos';
import { leaders } from './leaders';
import { comments } from './comments';

export const ConfigureStore = () => {
    const store = createStore(combineReducers({
        dishes,
        promos,
        leaders,
        comments
    }), applyMiddleware(thunk, logger));

    return store;
}
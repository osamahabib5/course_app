import { createStore, combineReducers, applyMiddleware } from 'redux';
import { favourites } from './favourites';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
import { promotions } from './promotions';
import { leaders } from './leaders';
import { comments } from './comments';

export const ConfigureStore = () => {
    const store = createStore(combineReducers({
        dishes,
        promotions,
        leaders,
        comments,
        favourites
    }), applyMiddleware(thunk, logger));

    return store;
}
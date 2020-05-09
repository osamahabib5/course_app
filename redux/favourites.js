import * as ActionTypes from './ActionTypes';

export const favourites = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVOURITE:
            if (state.some(el => el === action.payload))
                return state;
            else
                return state.concat(action.payload);
        case ActionTypes.DELETE_FAVOURITE:
            return state.filter((favorite) => favorite !== action.payload);
        //filter the dish which corresponds to payload and that dish is removed from the array
        //concatenate and send to  favourite array

        default:
            return state;
    }
};
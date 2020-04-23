import * as ActionTypes from './ActionTypes';

export const favourites = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVOURITE:
            if (state.some(el => el === action.payload))
                return state;
            else
                return state.concat(action.payload);
        //concatenate and send to  favourite array

        default:
            return state;
    }
};
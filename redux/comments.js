import * as ActionTypes from './ActionTypes';

export const comments = (state = {
    errMessage: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {
                ...state,
                errMessage: null,
                comments: action.payload  //action.payload will get the received data
            };

        case ActionTypes.COMMENTS_FAILED:
            return {
                ...state,
                dishes: [],
                errMessage: action.payload
            }
        default: return state;
    }
}
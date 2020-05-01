import * as ActionTypes from './ActionTypes';


export const comments = (state = {
    errMessage: null,
    comments: [],
    isLoading: true
}, action) => {
    switch (action.type) {

        case ActionTypes.ADD_COMMENTS:
            return {
                ...state,
                comments: state.comments.concat(action.payload),
                errMessage: null,
                isLoading: false
                //action.payload will get the received data
            };
        case ActionTypes.COMMENTS_LOADING:
            return {
                ...state,
                isLoading: true,
                errMessage: null,
                comments: []
            }
        case ActionTypes.COMMENTS_FAILED:
            return {
                ...state,
                comments: [],
                errMessage: action.payload
            }
        default: return state;
    }
}
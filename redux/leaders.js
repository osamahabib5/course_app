import * as ActionTypes from './ActionTypes';

export const leaders = (state = {
    isLoading: true,
    errMessage: '',
    leaders: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LEADERS:
            return {
                ...state,
                isLoading: false,
                errMessage: null,
                leaders: action.payload  //action.payload will get the received data
            };
        case ActionTypes.LEADERS_LOADING:
            return {
                ...state,
                isLoading: true,
                errMessage: null,
                leaders: []
            }
        case ActionTypes.LEADERS_FAILED:
            return {
                ...state,
                isLoading: false,
                leaders: [],
                errMessage: action.payload
            }
        default: return state;
    }
}
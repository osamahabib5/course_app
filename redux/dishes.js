import * as ActionTypes from './ActionTypes';

export const dishes = (state = {
    isLoading: true,
    errMessage: null,
    dishes: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
            return {
                ...state,
                isLoading: false,
                errMessage: null,
                dishes: action.payload  //action.payload will get the received data
            };
        case ActionTypes.DISHES_LOADING:
            return {
                ...state,
                isLoading: true,
                errMessage: null,
                dishes: []
            }
        case ActionTypes.DISHES_FAILED:
            return {
                ...state,
                isLoading: false,
                dishes: [],
                errMessage: action.payload
            }
        default: return state;
    }
}
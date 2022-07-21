import { ADD_TODO, UPDATE_TODO, DELETE_TODO, FILTER_TODO } from '../types';

const INITIAL_STATE = {
    val: []
};
const todoRecuder = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TODO:
            return { ...state, val: [...state.val, action.payload.todoVal] }
        // case UPDATE_TODO:
        //     return { ...state, val: action.payload.todoVal }
        case DELETE_TODO:
            return { ...state , val: action.payload.todoVal}
        case FILTER_TODO:
        default: return state;

    }
    // if(action.type === ADD_TODO){

    // }


};
export default todoRecuder; 
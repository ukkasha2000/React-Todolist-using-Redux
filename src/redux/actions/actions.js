import { ADD_TODO, DELETE_TODO, FILTER_TODO } from '../types';

export const addTodo = (val) => {
    return {

        type: ADD_TODO,
        payload: {
            todoVal : val,
        },
    };
};

// export const updateTodo = (val) => {
//     return {
        
//         type: UPDATE_TODO,
//         payload: {
//             todoVal : val,
//         },
//     };
// };

export const deleteTodo = (val) => {
    return {
        type: DELETE_TODO,
        payload: {
            todoVal : val,
        },
    };
};


export const filterTodo = (val) => {
    return {
        
        type: FILTER_TODO,
        payload: {
            todoVal : val,
        },
    };
};
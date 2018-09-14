import { combineReducers } from 'redux'

const toDoReducer = (state = {
    todos: [],
    loading: false,
    children: 0,
    todo : "",
    alert : false
}, action) => {

    var todos;

    switch (action.type) {
        case "GET_TODO": {
            todos = [...state.todos]
            todos.push(action.todo)
            state = { ...state, todos }
            return state
        }

        case "DELETE_TODO": {
            todos = [...state.todos]
            for(var i = 0; i < todos.length; i++){
                if(todos[i].id === action.id)
                    break;
            }
            todos.splice(i, 1);
            state = { ...state, todos }
            return state
        }

        case "CHANGE_TODO_VAL": {
            state = { ...state, todo : action.todo }
            return state
        }

        case "GET_CHILDREN": {
            state = { ...state, loading: true }
            return state
        }

        case "SET_CHILDREN": {
            state = { ...state, children: action.children, loading : false }
            return state
        }

        case "LOADING_COMPLETE": {
            state = { ...state, loading: false }
            return state
        }

        case "TOGGLE_ALERT" : {
            state = { ...state, alert : action.show}
            return state
        }

        default: {
            return state
        }
    }
}

export default combineReducers({
    toDo: toDoReducer
})
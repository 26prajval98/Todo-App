import {combineReducers} from 'redux'

const toDoReducer = ( state = {
    todos : [],
    loading : true,
    children : Infinity
}, action ) => {

    switch(action.type){
        case "ADD_TODO" : {
            state = {...state}
            state.todos.push(action.todo)
            return state
        }

        case "FETCH_TO_DO_COMPLETED" : {
            state = {...state, loading : false}
            return state
        }
        
        case "GET_CHILDREN_START" : {
            state = {...state }
            return state
        }

        case "GET_CHILDREN_COMPLETE" : {
            state = {...state, children : action.children }
            return state
        }

        default : {
            return state
        }
    }
}

export default combineReducers({
    toDo : toDoReducer
})
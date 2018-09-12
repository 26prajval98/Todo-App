import store from '../stores'

const addTodo = (todo) => {
    return store.dispatch({
        type : "ADD_TODO",
        todo
    })
}

export {
    addTodo
}
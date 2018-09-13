import store from '../stores'

import * as firebase from 'firebase';
import config from '../config';


if (!firebase.apps.length)
    firebase.initializeApp(config);

var db = firebase.database().ref().child('abcd-82368');
var todoRef = db.child('todolist');

const getTodo = (todo) => {
    return {
        type: "GET_TODO",
        todo
    }
}

const deleteTodo = (id) => {
    return store.dispatch({
        type: "DELETE_TODO",
        id
    })
}

const changeToDoVal = (todo) => {
    return store.dispatch({
        type: "CHANGE_TODO_VAL",
        todo
    })
}

const getChildren = () => {
    return {
        type: "GET_CHILDREN"
    }
}

const setChildren = (children) => {
    return {
        type: "SET_CHILDREN",
        children
    }
}

const loadingDone = () => {
    return {
        type: "LOADING_COMPLETE",
    }
}

const getChildrenClient = () => {
    store.dispatch((dispatch) => {
        dispatch(getChildren())
        todoRef.once("value")
            .then( snap => {
                return snap.numChildren()
            })
            .then(children =>{
                return dispatch(setChildren(children))
            })
            .then(()=>{
                addAllChildren()
            })
            .catch(err => {
                throw err
            })
    })
}

const addAllChildren = () => {
    store.dispatch((dispatch) => {
        todoRef.on('child_added', (snap) => {
            if(store.getState().toDo.children === store.getState().toDo.todos.length + 1){
                dispatch(loadingDone())
            }
            dispatch(getTodo({todo : snap.val(), id : snap.key}))            
        })
    })
}

export {
    getChildrenClient,
    addAllChildren,
    deleteTodo,
    changeToDoVal
}
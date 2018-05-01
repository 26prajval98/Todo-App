import {EventEmitter} from 'events';
import Dispatcher from '../dispatchers/dispatcher'

class TodoStore extends EventEmitter{
    constructor(){
        super();
        this.todos = [
            "Eat Food",
            "Go Top Play",
            "Play On Computer"
        ]
    }
    getAll(){
        return this.todos;
    }

    createToDo(item){
        this.todos.push(item);
        this.emit('addedToDo');
    }

    handleActions(actions){
        console.log(actions);
    }
}

var todoStore = new TodoStore();

Dispatcher.register(todoStore.handleActions.bind(todoStore));

window.check = Dispatcher;

export default todoStore;
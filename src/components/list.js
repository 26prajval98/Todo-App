import React from 'react';
import Addtodo from './addtodos';
import * as firebase from 'firebase';
import config from '../config';

  
export default class List extends React.Component{
    constructor(){
        super();
        this.state = {
            todos : []
        }
        if(!firebase.apps.length)
            firebase.initializeApp(config);
        
        this.db = firebase.database().ref().child('abcd-82368');
        this.todoRef = this.db.child('todolist');        
    }

    componentWillMount(){    
        var App = this;
        this.todoRef.on('child_added',(snap)=>{
            console.log(snap);
            var prevState = App.state.todos;
            prevState.push({todo: snap.val(), id : snap.key});
            App.setState({todos: prevState});
        })

        this.todoRef.on('child_removed', (snap)=>{
            var prevState = App.state.todos;
            for(var i = 0; i<prevState.length; i++){
                if(prevState[i].id === snap.key){
                    prevState.splice(i,1);
                    break;
                }
            }
            App.setState({todos: prevState});
        })
    }

    deletetodo(id){        
        var db = firebase.database().ref().child('abcd-82368');
        var todoRef = db.child('todolist');
        todoRef.child(id).remove();
    }

    addtodos(todo){
        var db = firebase.database().ref().child('abcd-82368');
        var todoRef = db.child('todolist');
        todoRef.push().set(todo);
    }

    render(){
        return(
            <div>
                {this.state.todos.map((value)=>{
                    return (
                        <div key={value.id} className="w3-panel w3-green w3-padding w3-center w3-hover-red"> {value.todo} <span key={value.id} className="w3-right w3-button" onClick={this.deletetodo.bind(this,value.id)}>X</span> </div>
                    )
                })}
                <Addtodo addtodos={this.addtodos.bind(this)} />
            </div>
        )
    }
}
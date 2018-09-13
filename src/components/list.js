import React from 'react';
import Addtodo from './addtodos';
import * as firebase from 'firebase';
import config from '../config';
import { connect } from 'react-redux';
import { getChildrenClient as getChildren, deleteTodo } from '../actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './list.css'

function mapStateToProps(state) {
    return {
        todos: state.toDo.todos,
        c: state.toDo.children,
        todo: state.toDo.todo,
        loading: state.toDo.loading
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);
        if (!firebase.apps.length)
            firebase.initializeApp(config);

        this.db = firebase.database().ref().child('abcd-82368');
        this.todoRef = this.db.child('todolist');
    }

    componentWillMount() {
        getChildren()

        this.todoRef.on('child_removed', (snap) => {
            deleteTodo(snap.key)
        })
    }

    deletetodo(id) {
        this.todoRef.child(id).remove();
    }

    addtodo(todo) {
        this.todoRef.push().set(todo);
    }

    render() {

        var show = () => {
            if (!this.props.loading)
                return (
                    <div className="w3-animate-opacity">
                        <h1>{this.props.c} number of children are present in the initial</h1>
                        {
                            this.props.todos.map((value) => {
                                return (
                                    <div key={value.id} className="w3-panel w3-green w3-padding w3-center w3-hover-red"> {value.todo} <span key={value.id} className="w3-right w3-button" onClick={this.deletetodo.bind(this, value.id)}>X</span> </div>
                                )
                            })
                        }
                        <Addtodo addtodos={this.addtodo.bind(this)} todoval={this.props.todo} />
                    </div>
                )
            else {
                return (
                    <div className="w3-container w3-display-container" style={{ height: window.innerHeight }}>
                        <ReactCSSTransitionGroup
                            transitionName="fade"
                            transitionLeaveTimeout={500}
                        >
                            <div className="w3-display-middle w3-center">
                                <h1>Loading</h1>
                                <div className="ball-pulse">
                                    <div style={{ backgroundColor: "yellow" }}></div>
                                    <div style={{ backgroundColor: "green" }}></div>
                                    <div style={{ backgroundColor: "red" }}></div>
                                </div>
                            </div>
                        </ReactCSSTransitionGroup>
                    </div>
                )
            }
        }

        return (
            <div>
                {show()}
            </div>
        )
    }
}

export default connect(mapStateToProps)(List)
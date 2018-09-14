import React from 'react';
import Addtodo from './addtodos';
import * as firebase from 'firebase';
import config from '../config';
import { connect } from 'react-redux';
import { getChildrenClient as getChildren, deleteTodo, toggleAlert } from '../actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './list.css'

function mapStateToProps(state) {
    return {
        todos: state.toDo.todos,
        c: state.toDo.children,
        todo: state.toDo.todo,
        loading: state.toDo.loading,
        alert: state.toDo.alert
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);
        if (!firebase.apps.length)
            firebase.initializeApp(config);

        this.db = firebase.database().ref();
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

        var alert = () => {
            if (this.props.alert)
                return (
                    <div className="w3-container">
                        <ReactCSSTransitionGroup
                            transitionName="fade"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={500}
                        >
                            <p className="w3-center w3-text-red w3-tiny" style={{ maxWidth: "1000px", margin: "auto", wordWrap: "break-word", cursor: "pointer"}} onClick={() => {
                                    toggleAlert(false)
                                }}>
                                    Max Number of characters is 40. Click on this to remove.
                            </p>
                        </ReactCSSTransitionGroup>
                    </div>
                )
        }

        var show = () => {
            if (!this.props.loading)
                return (
                    <div className="w3-animate-opacity">
                        <h1 className="w3-center">{this.props.c} number of children are present in the initial</h1>
                        <ReactCSSTransitionGroup
                            transitionName="fade"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={500}
                        >
                            {
                                this.props.todos.map((value) => {
                                    return (
                                        <div key={value.id} className="w3-panel w3-green w3-padding w3-center w3-hover-red w3-row" style={{ maxWidth: "1000px", margin: "auto", wordWrap: "break-word", marginBottom: "5px" }}>
                                            <div className="w3-col l10 m9 s12">
                                                {value.todo}
                                            </div>
                                            <div className="w3-button w3-col l2 m3 s12 w3-hover-none w3-hover-text-white" onClick={this.deletetodo.bind(this, value.id)}>X</div>
                                        </div>
                                    )
                                })
                            }
                        </ReactCSSTransitionGroup>
                        {alert()}
                        <Addtodo addtodos={this.addtodo.bind(this)} todoval={this.props.todo} />
                    </div>
                )
            else {
                return (
                    <div className="w3-container w3-display-container" style={{ height: window.innerHeight }}>
                        <ReactCSSTransitionGroup
                            transitionName="fade"
                            transitionEnterTimeout={300}
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
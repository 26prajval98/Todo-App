import React from 'react';
import {addTodo} from '../actions'

export default class Nav extends React.Component{
    constructor(){
        super();
        this.state = {
            todo : ""
        }
    }

    changetext(e){
        this.setState({todo:e.target.value})
    }

    add(){
        addTodo(this.state.todo)
        this.props.addtodos(this.state.todo);
        this.setState({todo:""});
    }

    render(){
        return(
            <div>
                <input value={this.state.todo} onChange={this.changetext.bind(this)} onBlur={this.add.bind(this)} className="w3-padding w3-input w3-margin" />
            </div>
        )
    }
}
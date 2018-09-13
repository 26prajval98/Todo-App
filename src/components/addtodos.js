import React from 'react';
import { changeToDoVal } from '../actions'

export default class Nav extends React.Component {

    changetext(e) {
        changeToDoVal(e.target.value)
    }

    add() {
        if (this.props.todoval) {
            this.props.addtodos(this.props.todoval);
        }
        changeToDoVal("")
    }

    render() {
        return (
            <div>
                <input value={this.props.todoval} onChange={this.changetext.bind(this)} onBlur={this.add.bind(this)} className="w3-padding w3-input w3-margin" />
            </div>
        )
    }
}
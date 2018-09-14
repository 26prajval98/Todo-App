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
            <div className="w3-display w3-center">
                <input value={this.props.todoval} onChange={this.changetext.bind(this)} onBlur={this.add.bind(this)}
                    onKeyDown={
                        (e) => {
                            if(e.key === "Enter")
                                this.add()
                        }
                    } className="w3-input" style={{ outline: "none", maxWidth: "1000px", display: "block", margin: "auto" }} />
            </div>
        )
    }
}
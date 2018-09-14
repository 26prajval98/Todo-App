import React from 'react';
import { changeToDoVal, toggleAlert } from '../actions'

export default class Nav extends React.Component {

    changetext(e) {
        if (e.target.value.length < 40){
            changeToDoVal(e.target.value)
            toggleAlert(false)
        }
        else{
            toggleAlert(true)
        }
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
                <input value={this.props.todoval} onChange={this.changetext.bind(this)} 
                // onBlur={this.add.bind(this)}
                    onKeyDown={
                        (e) => {
                            if (e.key === "Enter" || e.key === "Tab")
                                this.add()
                        }
                    } className="w3-input w3-center w3-padding" style={{ outline: "none", maxWidth: "1000px", display: "block", margin: "auto" }} />
            </div>
        )
    }
}
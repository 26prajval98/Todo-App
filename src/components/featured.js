import React from 'react';

export default class Featured extends React.Component{
    constructor(){
        super();
        this.state = {
            todos : [
                "Eat Food",
                "Go Top Play"
            ]
        }
    }


    render(){
        return(
            <div>
                {this.state.todos.map((value, index)=>{
                    return (
                        <div key={index} className="w3-panel w3-green w3-padding w3-center w3-hover-red" > {value} <span className="w3-right w3-button">X</span> </div>
                    )
                })}
            </div>
        )
    }
}
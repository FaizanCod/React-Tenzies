import React from "react";

function Button(props) {
    return (
        <div 
            className={`dice-btn ${props.isHeld && "heldBtn"}`}
            onClick={props.handleHold}
        >
            {props.value}
        </div>
    );
};

export default Button;
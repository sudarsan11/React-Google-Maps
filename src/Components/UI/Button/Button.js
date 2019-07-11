// A stateless component for creating buttons 
// with custom color and onClick function

import React from 'react';

import './Button.css';

const button = (props) => {

    return (
        <button className={"Button " + props.color} onClick={props.onClick}>{props.value}</button>
    );
}

export default button;
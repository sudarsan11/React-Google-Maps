// A stateless component for creating badges
// with custom color

import React from 'react';

import './Badge.css';

const badge = (props) => {

    return (
        <span className={"Badge " + props.color}>{props.value}</span>
    );
}

export default badge;
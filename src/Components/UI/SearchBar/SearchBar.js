// A stateless component for creating searchbar
// with onBlur, value and onChange events

import React from 'react';
import './Searchbar.css';

const searchBar = (props) => {

    let cssClass = '';
    if (props.autocomplete) {
        cssClass = 'autocomplete';
    }

    return (

        <div className="SearchBar">
            <input  onBlur={props.onBlur} onChange={props.onBlur} className={cssClass} type="text" name="locationSearch" value={props.value}/>
        </div>
    );
}

export default searchBar;
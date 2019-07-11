// A stateless component for setting up the layout of the app

import React from 'react';

import Aux from '../../hoc/hoc';
import './Layout.css';
import SideDrawer from '../UI/SideDrawer/SideDrawer';

const layout = (props) => {

    return (

        <Aux className="Wrapper">
            <SideDrawer />
            <main>
                {props.children}
            </main>
        </Aux>
    );

}

export default layout;
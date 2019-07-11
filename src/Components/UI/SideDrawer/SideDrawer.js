// A stateless component for creating Sidedrawer

import React from 'react';
import {Route} from 'react-router-dom';

import './SideDrawer.css';
import SearchRoutes from '../../../Containers/SearchRoutes/SearchRoutes';
import DrivingRoutes from '../../../Containers/DrivingRoutes/DrivingRoutes';

const sideDrawer = (props) => {

    return (

        <div className="SideDrawer">
            <Route path="/" component={SearchRoutes}/>
            <Route path="/search"  component={DrivingRoutes}/>
        </div>
    );
}

export default sideDrawer;
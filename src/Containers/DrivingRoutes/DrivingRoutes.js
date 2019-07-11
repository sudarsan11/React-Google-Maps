import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actionTypes from '../../Store/actions';
import './DrivingRoutes.css';
import Badge from '../../Components/UI/Badge/Badge';

class DrivingRoutes extends Component {

    // Updating redux store once the component mounts
    // To make sure state is maintained on refresh
    componentDidMount() {
        
        // Getting the query params
        const query = new URLSearchParams(this.props.location.search);
        const routes = [];
        for (let p of query.entries()) {
            routes.push(p[1]);
        }        
        
        // Updating the redux store
        this.props.onSourceUpdated(routes[0]);
        this.props.onDestinationUpdated(routes[1]);
        this.props.onTypingComplete(false);   
    }

    render() {

        // Getting the driving instructions from redux store
        const  d = this.props.drivingRoute.drivingInstructions;

        // Creating a layout for the driving instructions
        const printDrivingRoute = (

            <div>

                <div class="card-header">
                    <p><i class="fa fa-compass"></i>{this.props.drivingRoute.totalDistance}</p>
                    <p><i class="fa fa-hourglass-start"></i>{this.props.drivingRoute.totalDuration}</p>
                </div>

                <div>
                {
                    d.distance.map((key, index) => {

                        return (

                            <div class="card">

                                <div>
                                    <p>
                                        <i class="fa fa-location-arrow"></i> 
                                        {d.instructions[index]}
                                    </p>


                                    <Badge value= {d.distance[index]} color="Primary" />
                                    <Badge value= {d.duration[index]} color="Secondary" />
                                </div>
                                
                            </div>
                        );
                        
                    })
                }
                </div> 
            </div>
        );

        return (
            <div>
                {printDrivingRoute}
            </div>
        );
    }
} 


// Mapping props to redux store
const mapStateToProps = (state) => {

    return {
        source : state.source,
        destination : state.destination,
        isTyping : state.isTyping,
        drivingRoute: state.drivingRoute
        
    };
}

// Mapping functions to redux store
const mapDispatchToProps = (dispatch) => {

    return {
        
        onSourceUpdated : (newSource) => dispatch({type: actionTypes.UPDATE_SOURCE, newSource: newSource}),
        onDestinationUpdated : (newDestination) => dispatch({type: actionTypes.UPDATE_DESTINATION, newDestination: newDestination}),
        onTypingComplete: (isTyping) => dispatch({type: actionTypes.IS_TYPING, isTyping: isTyping})
    };
}
 
// Connecting redux to the component
export default connect(mapStateToProps, mapDispatchToProps)(DrivingRoutes);
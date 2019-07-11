import React, {Component } from 'react';
import { connect } from 'react-redux';

import './Map.css';
import Aux from '../../hoc/hoc';
import * as actionTypes from '../../Store/actions';


class Map extends Component {

    // For checking whether the map has loaded
    state = {
        isLoading : true,
    }
    
    // Render the map on mount
    componentDidMount() {
        this.renderMap();                  
    } 

    // If state has changed re-render map accordingly
    componentDidUpdate() {

        // If the user has finished typing
        if (!this.props.isTyping) {
            this.initMap();
        }      
    }

    // Load the Google Maps API and add a global callback
    renderMap = () =>{
        loadScript('https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&libraries=places&callback=initMap');
        window.initMap = this.initMap;
    }


    // For determining the route, driving instructions and set the map
    calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
        
        // If user has not finished typing return
        if (this.props.isTyping) {
            return;
        }
        
        // Get the route for driving
        directionsService.route({
            origin: this.props.source,
            destination: this.props.destination,
            travelMode: 'DRIVING'
        }, 
        
        (response, status) => {
            
            // Update user typing and loading state
            this.props.onTypingComplete(true);
            this.setState({isLoading:false})

            if (status === 'OK') {

                // Get driving instructions
                const route = response.routes[0].legs[0]; 
                // Update the instructions in redux store
                this.updateDrivingRoutes(route);
                // Set the driving route on map
                directionsDisplay.setDirections(response);
                
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    // Update the driving instructions on redux store
    updateDrivingRoutes = (route) => {

        const totalDistance = route.distance.text;
        const totalDuration = route.duration.text;

        const drivingInstructions = {
            distance: [],
            duration: [],
            instructions: []
        }
    

        for (let step of route.steps) {
            drivingInstructions.distance.push(step.distance.text);
            drivingInstructions.duration.push(step.duration.text);
            // Regex to remove all html tags in instruction
            drivingInstructions.instructions.push(step.instructions.replace(/<[^>]*>?/gm, ''))
        }

        const payload = {
            totalDistance: totalDistance,
            totalDuration: totalDuration,
            drivingInstructions: drivingInstructions
        }

        this.props.updateDrivingInstructions(payload);
       
    }

    // Initialize the map with directions, render and autocomplete service
    initMap = () => {

        if (typeof window.google === 'undefined') {
            return;
        }

        const directionsService = new window.google.maps.DirectionsService();
        const directionsDisplay = new window.google.maps.DirectionsRenderer();    
        this.autocomplete1 = new window.google.maps.places.Autocomplete(document.getElementsByClassName('autocomplete')[0], {types: ['(cities)']});
        this.autocomplete2 = new window.google.maps.places.Autocomplete(document.getElementsByClassName('autocomplete')[1], {types: ['(cities)']});
        
        // Set the map
        var map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 41.85, lng: -87.65}
        });

        // Render the map
        directionsDisplay.setMap(map);

        // Render route on map
        this.calculateAndDisplayRoute(directionsService, directionsDisplay);    
    }

    
    render() {
        
        const loader = this.state.isLoading ? 
            (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>) : null;

        return(
            <Aux>
                {loader}
                <div id="map"></div>
            </Aux>
        );  
    }
  
}

// Load custom scripts to index html
function loadScript(url) {

    var index = window.document.getElementsByTagName('script')[0];
    var script = window.document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);

}

// Mapping props to redux store
const mapStateToProps = (state) => {


    return {
        source: state.source,
        destination: state.destination,
        isTyping: state.isTyping,
        drivingRoute: state.drivingRoute
    };
}


// Mapping functions to redux store
const mapDispatchToProps = (dispatch) => {

    return {

        onTypingComplete: (isTyping) => dispatch({type: actionTypes.IS_TYPING, isTyping: isTyping}),
        updateDrivingInstructions : (payload) => dispatch({type: actionTypes.UPDATE_DRIVING_INSTRUCTIONS, payload: payload}),

    };
}

// Connecting redux to the component
export default connect(mapStateToProps,mapDispatchToProps)(Map);
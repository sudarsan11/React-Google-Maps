// Maintains global state and performs actions on them

import * as actionTypes from './actions';

const initialState = {
    source : '',
    destination: '',
    isTyping: true,

    drivingRoute : {
        totalDistance: 0,
        totalDuration: 0,
        drivingInstructions: {
            distance: [],
            duration: [],
            instructions: []
        }
    }
}

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case actionTypes.UPDATE_SOURCE:
            return {
                ...state,
                source: action.newSource
            };

        case actionTypes.UPDATE_DESTINATION:
            return {
                ...state,
                destination : action.newDestination,
            };

        case actionTypes.IS_TYPING:
            return {
                ...state,
                isTyping : action.isTyping
            }

        case actionTypes.UPDATE_DRIVING_INSTRUCTIONS:
            return {
                ...state,
                ...state.drivingRoute,
                ...state.drivingRoute.drivingInstructions,
                drivingRoute : {
                    totalDistance : action.payload.totalDistance,
                    totalDuration : action.payload.totalDuration,
                    drivingInstructions: action.payload.drivingInstructions
                }
            }
        
        
        default:
            return state;
    }

}

export default reducer; 
import React, {Component} from 'react';
import { connect } from 'react-redux';

import './SearchRoutes.css';
import SearchBar from '../../Components/UI/SearchBar/SearchBar';
import Button from '../../Components/UI/Button/Button';
import * as actionTypes from '../../Store/actions';

class SearchRoutes extends Component {

    // Once the user has completed typing destination location
    onDestinationBlur = () => {
        this.props.onDestinationUpdated(document.getElementsByClassName('autocomplete')[1].value);
    }

    // Once the user has completed typing source location
    onSourceBlur = () => {
        this.props.onSourceUpdated(document.getElementsByClassName('autocomplete')[0].value);
    }

    // When the user proceeds to search for route
    onClickSearch = () => {

        // Enabling the map to render
        this.props.onTypingComplete(false);

        // Updating the values in redux store
        this.props.onSourceUpdated(document.getElementsByClassName('autocomplete')[0].value);
        this.props.onDestinationUpdated(document.getElementsByClassName('autocomplete')[1].value);
        
        let routes = {
            source : document.getElementsByClassName('autocomplete')[0].value,
            destination : document.getElementsByClassName('autocomplete')[1].value,
        }

        // Creatring query string params for next route
        // Passing the data to make sure state is maintained on refresh
        let queryParams = [];

        for (let i in routes) {
            queryParams.push(encodeURIComponent(i) + '=' +  encodeURIComponent(routes[i]));
        }
        let queryString = queryParams.join('&')

        // Redirecting to driving routes component
        this.redirectToSearch(queryString);
        
    }

    // Redirecting to driving routes component
    redirectToSearch = (queryString) => {
        this.props.history.push({
            pathname:'/search',
            search: '?' + queryString
        });   
    }

    render() {

        return(
            <div className="Search">
                <SearchBar onBlur={this.onSourceBlur} autocomplete value={this.props.source}/>
                <SearchBar onBlur={this.onDestinationBlur} autocomplete value={this.props.destination}/>
                <Button value="Search" color="Primary-Button" onClick={this.onClickSearch} />
            </div>
        )
    }
}

// Mapping props to redux store
const mapStateToProps = (state) => {

    return {
        source: state.source,
        destination: state.destination,
        isTyping: state.isTyping,
    };
}

// Mapping functions to redux store
const mapDispatchToProps = (dispatch) => {

    return {

        onSourceUpdated : (newSource) => dispatch({type: actionTypes.UPDATE_SOURCE, newSource: newSource}),
        onDestinationUpdated : (newDestination) => dispatch({type: actionTypes.UPDATE_DESTINATION, newDestination: newDestination}),
        onTypingComplete: (isTyping) => dispatch({type: actionTypes.IS_TYPING, isTyping: isTyping}),
        
    }
}

// Connecting redux to the component
export default connect(mapStateToProps, mapDispatchToProps) (SearchRoutes);;
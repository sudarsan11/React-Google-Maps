import React from 'react';

import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Layout from './Components/Layout/Layout';
import Map from './Containers/Map/Map';
import reducer from './Store/reducer';

const store = createStore(reducer);

function App() {
  return (
    
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Map/>
          </Layout>
        </BrowserRouter>
      </Provider> 
    
  );
}

export default App;

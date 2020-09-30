import React, { createContext } from 'react';
import './App.css';
import Header from './Component/Header/Header';
import Shop from './Component/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './Component/Review/Review';
import Inventory from './Component/Inventory/Inventory';
import Notfound from './Component/Not found/Notfound';
import Productsditails from './Component/Productsdetailes/Productsditails';
import Shipments from './Component/Shipments/Shipments';
import Login from './Component/Login/Login';
import { useState } from 'react';
import PrivetdRoute from './Component/PrivetdRoute/PrivetdRoute';

export const UserContext = createContext();

function App(props) {
  const  [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <h3> email: {loggedInUser.email}</h3>
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
             <Shop></Shop>
          </Route>
          <Route path="/review">
             <Review></Review>
          </Route>
          <Route path="/inventory"> 
            <Inventory></Inventory>
          </Route>
          <Route path="/login"> 
            <Login></Login>
          </Route>
          <PrivetdRoute path="/shipment"> 
            <Shipments></Shipments>
          </PrivetdRoute>
          <Route exact  path="/">
          <Shop></Shop>
          </Route>
          <Route path="/product/:productkey">
            <Productsditails></Productsditails>
          </Route>
          <Route path="*">
            <Notfound></Notfound>
          </Route>

        </Switch>
      </Router>
      
      
    </UserContext.Provider>
  );
}

export default App;

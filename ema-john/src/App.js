import React from 'react';
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

function App() {
  return (
    <div>
      <Header></Header>
      <Router>
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
      
      
    </div>
  );
}

export default App;

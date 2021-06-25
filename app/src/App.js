import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductListing from "./containers/product-listing/ProductListing";
import Header from "./containers/header/Header";
import "./App.css";
import ProductDetails from "./containers/product-details/ProductDetails";
import ProductSearch from "./containers/product-search/ProductSearch";
import LoginPage from "./containers/login/LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={ProductListing} />
          <Route path="/search" exact component={ProductSearch} />
          <Route path="/products/:productId" component={ProductDetails} />
          <Route path="/login/" component={LoginPage} />
          <Route>404 Not Found!</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

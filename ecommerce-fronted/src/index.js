import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./assets/scss/style.scss";
import "./assets/css/general.css";
import "./assets/css/Override.css";
// import "react-loading-skeleton/dist/skeleton.css";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import { fetchProducts } from "./redux/actions/productActions";
import products from "./data/products.json";
import  { Toaster } from 'react-hot-toast';
// import 'bootstrap/dist/css/bootstrap.min.css';

store.dispatch(fetchProducts(products));

ReactDOM.render(
  <Provider store={store}>
    <App />
    <Toaster  position="bottom-center"/>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

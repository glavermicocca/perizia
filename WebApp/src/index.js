import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./store/configureStore";
import connectToAlerts from "./utils/socketUtils";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import App from "./containers/app/App";

import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

///////////////////////////////////////////
// jquery and tether for bootstrap to use
// alternative is to link them in index.html
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import jquery from "jquery";
window.$ = window.jQuery = jquery;
window.Popper = require("popper.js");
require("bootstrap/dist/js/bootstrap");
/////////////////////////////////////////////

const store = configureStore();
connectToAlerts(store);



ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

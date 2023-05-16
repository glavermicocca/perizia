import React from 'react'
import { Provider } from 'react-redux'

import App from './containers/app/App'
import { unregister } from './serviceWorker'
import configureStore from './store/configureStore'

import { createRoot } from 'react-dom/client';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css'

///////////////////////////////////////////
// jquery and tether for bootstrap to use
// alternative is to link them in index.html
//import 'bootstrap/dist/css/bootstrap.css'
// import jquery from "jquery";
// window.$ = window.jQuery = jquery;
// window.Popper = require("popper.js");
//require('bootstrap/dist/js/bootstrap')
/////////////////////////////////////////////

const store = configureStore()

const container = document.getElementById('root')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>
)

unregister()

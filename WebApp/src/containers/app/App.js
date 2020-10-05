import React, { Component } from "react";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
/////////////////////////////////////////////////////////////////////////
// BrowserRouter would be preferred over HashRouter, but BrowserRouter
// would require configuring the server. So we will use HashRouter here.
// Please change to BrowserRouter if you have your own backend server.
///////////////////////////////////////////////////////////////////////////
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Login from "../login/Login";
import PrivateRoute from "../misc/PrivateRoute";
import Home from "../home/Home";
import UsersPage from "../user/UsersPage";
import DataTablePerizia from "../repo/DataTablePerizia";
import About from "../about/About";
import NotFound from "../misc/NotFound";

import test from "./test";

import { logout, dati } from "../../actions/auth";
//import { postPeriziaItem } from '../../actions/crud'

//import Dati from "../dati/Dati.js";

import "./app.css";

class App extends Component {
  columns = [
    {
      dataField: "id",
      text: "Product ID",
    },
    {
      dataField: "name",
      text: "Product Name",
    },
    {
      dataField: "price",
      text: "Product Price",
    },
  ];

  products = [
    { id: 1, name: "ilmiotext1", price: "1" },
    { id: 2, name: "ilmiotext2", price: "1" },
    { id: 3, name: "ilmiotext3", price: "1" },
  ];

  handleLogout() {
    const { user } = this.props;
    this.props.dispatch(logout(user));
  }

  handleDati() {
    const { user } = this.props;
    this.props.dispatch(dati(user));
  }

  Loading = () => {
    return (
      <div style={{ background: "red", width: "200px", height: "200px" }}></div>
    );
  };

  render() {
    const { user, data } = this.props;
    const isAuthenticated = true && user;

    var showHeader = true;

    if (data.perizia != null) {
      showHeader = false;
    }

    return (
      <Router>
        <div>
          {showHeader == true && (
            <Header user={user} handleLogout={() => this.handleLogout()} />
          )}
          <div className="appContent">
            {/* <BootstrapTable
              keyField="id"
              data={this.products}
              columns={this.columns}
            /> */}
            <Switch>
              <Route path="/login" component={Login} />
              {/* <PrivateRoute
                path="/app"
                isAuthenticated={isAuthenticated}
                component={DataTablePerizia}
              /> */}
              <Route component={DataTablePerizia} path="/app" />
              <Route path="/ap" component={DataTablePerizia} />
              <Route exact={true} path="/" component={Home} />
              <Route path="/test" component={DataTablePerizia} />
              {/* <Route component={NotFound} /> */}
            </Switch>
            {/* <React.Suspense fallback={this.Loading}>
            </React.Suspense> */}
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

// App.propTypes = {
//   user: PropTypes.string,
//   dispatch: PropTypes.func.isRequired,
// };

// App.contextTypes = {
//   store: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => {
  const { auth, data } = state;
  return {
    user: auth ? auth.user : null,
    data,
  };
};

export default connect(mapStateToProps)(App);

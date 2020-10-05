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
import DataTablePerizia from "../repo/DataTablePerizia";

import { logout, dati } from "../../actions/auth";

import "./app.css";

class App extends Component {

  handleLogout() {
    const { user } = this.props;
    this.props.dispatch(logout(user));
  }

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
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute
                path="/app"
                isAuthenticated={isAuthenticated}
                component={DataTablePerizia}
              />
              <Route path="/" component={Home} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, data } = state;
  return {
    user: auth ? auth.user : null,
    data,
  };
};

export default connect(mapStateToProps)(App);

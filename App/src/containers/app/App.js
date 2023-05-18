import React, { Component } from 'react'
/////////////////////////////////////////////////////////////////////////
// BrowserRouter would be preferred over HashRouter, but BrowserRouter
// would require configuring the server. So we will use HashRouter here.
// Please change to BrowserRouter if you have your own backend server.
///////////////////////////////////////////////////////////////////////////
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import Header from '../../components/header/Header'
import Login from '../login/Login'
import PrivateRoute from '../misc/PrivateRoute'
import Home from '../home/Home'
import DataTablePerizia from '../repo/DataTablePerizia'

import { logout } from '../../actions/auth'

class App extends Component {
  handleLogout() {
    const { user } = this.props
    this.props.dispatch(logout(user))
  }

  render() {
    const { user, data } = this.props
    const isAuthenticated = true && user

    var showHeader = true

    if (data.perizia != null) {
      showHeader = false
    }

    return (
      <Router>
        <Switch>
          <Route path="/app1" component={Pippo} />
          <PrivateRoute path="/app" isAuthenticated={isAuthenticated} component={DataTablePerizia} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
        {showHeader === true && <Header user={user} handleLogout={() => this.handleLogout()} />}
      </Router>
    )
  }
}

class Pippo extends Component {
  render() {
    return <p>PIPPO</p>
  }
}

const mapStateToProps = state => {
  const { auth, data } = state
  return {
    user: auth ? auth.user : null,
    data
  }
}

export default connect(mapStateToProps)(App)

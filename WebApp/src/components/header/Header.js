import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import UserProfile from './UserProfile'

class Header extends Component {
  onLogoutClick = event => {
    event.preventDefault()
    this.props.handleLogout()
    this.props.history.replace('/login')
  }

  render() {
    const { user } = this.props
    const pathname = this.props.history.location.pathname
    const isLoginPage = pathname.indexOf('login') > -1

    return !isLoginPage && <UserProfile user={user} handleLogout={this.onLogoutClick} />
  }
}

Header.propTypes = {
  user: PropTypes.string,
  handleLogout: PropTypes.func.isRequired
}

export default withRouter(Header)

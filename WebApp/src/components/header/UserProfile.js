import React from 'react'
import PropTypes from 'prop-types'

const UserProfile = ({ user, handleLogout }) => {
  return (
    <button onClick={handleLogout} type="button" className="btn btn-outline-primary">
      Logout
    </button>
  )
}

UserProfile.propTypes = {
  user: PropTypes.string,
  handleLogout: PropTypes.func.isRequired
}

export default UserProfile

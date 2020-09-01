import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import "./home.css";

class Home extends Component {
  render() {
    return (
      <div>
                
      </div>
    );
  }
}

Home.propTypes = {
  user: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

Home.contextTypes = {
  store: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { auth } = state;
  return {
    user: auth ? auth.user : null
  };
};

export default connect(mapStateToProps)(Home);
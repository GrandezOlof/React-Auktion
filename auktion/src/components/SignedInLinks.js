import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/userActions';

class SignedInLinks extends Component {
  render() {
    return (
      <ul className="right">
        <li>
          <NavLink to="/new" className="waves-effect">
            Create New Auction
          </NavLink>
        </li>
        <li>
          <NavLink to="/list" className="waves-effect">
            List Auctions
          </NavLink>
        </li>
        <li>
          <NavLink onClick={this.props.logOut} to="/">
            Log Out User "{this.props.name}"
          </NavLink>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.user.name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logoutUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignedInLinks);

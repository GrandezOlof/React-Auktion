import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

export class SignedOutLinks extends Component {
  render() {
    return (
      <ul className="right">
        <li>
          <NavLink to="/list" className="waves-effect">
            List Auctions
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="waves-effect">
            Log In
          </NavLink>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignedOutLinks);

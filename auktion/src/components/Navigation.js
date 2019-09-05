import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import { SignedOutLinks } from './SignedOutLinks';

export class Navigation extends Component {
  render() {
    let links =
      this.props.userName === null ? <SignedOutLinks /> : <SignedInLinks />;

    return (
      <nav className="nav-wrapper blue darken-4">
        <div className="container">
          <Link to="/list" className="brand-logo left waves-effect logga">
            Nackowski 2100
          </Link>
          {links}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  userName: state.user.name
});

export default connect(mapStateToProps)(Navigation);

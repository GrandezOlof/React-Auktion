import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/userActions';

export class LogIn extends Component {
  state = {
    name: null
  };

  handleChange = e => {
    let newState = {
      name: e.target.value
    };
    this.setState(newState);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.loginUser(this.state.name);
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="container padded">
        <div className="row">
          <div className="card col s12 m6 offset-m3">
            <div className="padded-slight">
              <span className="card-title">Log in</span>

              <form onSubmit={this.handleSubmit}>
                <div className="input-field">
                  <input
                    id="first_name"
                    type="text"
                    onChange={this.handleChange}
                  />
                  <label htmlFor="first_name">Name</label>
                </div>
                <div>
                  <input
                    id="submit"
                    type="submit"
                    className="btn blue darken-4 col s6"
                    value="Log In"
                  />
                  <br />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: name => {
      dispatch(loginUser(name));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LogIn);

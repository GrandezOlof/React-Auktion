import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AdminPanel extends Component {
  render() {
    let deletebutton = null;
    console.log(this.props);
    if (this.props.bids !== undefined) {
      console.log(this.props.bids.length);

      deletebutton =
        this.props.bids.length !== 0 ? null : (
          <Link className="btn blue darken-4" to={`/delete/${this.props.auktionID}`}>
            Delete Auction
          </Link>
        );
    }

    return (
      <div>
        <Link className="btn blue darken-4" to={`/edit/${this.props.auktionID}`}>
          Edit
        </Link>
        {deletebutton}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bids: state.bids.bids
  };
};

const mapDispatchToProps = dispatch => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);

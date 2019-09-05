import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBid } from '../actions/bidActions';
import moment from 'moment';

export class AddBidForm extends Component {
  state = {
    bidAmount: 0
  };

  handleChange = event => {
    this.setState({
      bidAmount: event.target.value,
      isTooLow: false
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let bidAmount = this.state.bidAmount;
    let currentMaxBid = this.props.maxBid;
    console.log(
      currentMaxBid +
        'You have to enter a higher amount then the max bid'
    );

    if (bidAmount > currentMaxBid) {
      this.props.submitBid({
        Summa: this.state.bidAmount,
        AuktionID: this.props.auction.AuktionID
      });
      this.setState({ isTooLow: false });
    } else {
      this.setState({ isTooLow: true });
    }
  };

  render() {
    let isLoggedIn = this.props.user !== null;
    let isCreator = this.props.user === this.props.auction.SkapadAv;
    let isFinished = moment(this.props.auction.SlutDatum).isBefore(moment());

    let isDisabled = !isLoggedIn || isCreator;
    let val = isLoggedIn ? this.state.bidAmount : 'Log in to place bid';
    val = isCreator ? 'You can not bid on your own auction' : val;

    if (!isFinished) {
      return (
        <form onSubmit={this.handleSubmit}>
          {this.state.isTooLow ? (
            <p className="red-text">
              Your bid has to be higher than the current maximum bid.
            </p>
          ) : null}
          <div className="input-field row">
            <div className="col m7 s12">
              <input
                value={val}
                disabled={isDisabled}
                id="newbid"
                type="text"
                className="validate input-field"
                onChange={this.handleChange}
              />
            </div>
            <div className="col m5 s12">
              <button disabled={isDisabled} className="btn blue darken-4 input-field">
                bid
              </button>
            </div>
          </div>
        </form>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user.name,
  maxBid:
    state.bids.bids.length > 0
      ? Math.max(...state.bids.bids.map(b => b.Summa))
      : ownProps.auction.Utropspris
});

const mapDispatchToProps = dispatch => {
  return {
    submitBid: bid => dispatch(createBid(bid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBidForm);

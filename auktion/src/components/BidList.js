import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBid, loadBids } from '../actions/bidActions';
import moment from 'moment';

export class BidList extends Component {
  componentDidMount() {
    this.props.loadBids(this.props.auction.AuktionID);
  }

  state = {
    bidAmount: 0
  };

  render() {
    let isFinished = moment(this.props.auction.SlutDatum).isBefore(moment());

    let bids = this.props.bids;

    if (isFinished) {
      let finalBid = this.props.auction.Utropspris;
      if (bids.length > 0) {
        finalBid = bids[bids.length - 1].Summa;
      }
      return (
        <div>The Auction has ended. The final price was {finalBid} kr</div>
      );
    }

    let listItems = bids
      .map(e => (
        <li className="bidlistitem" key={e.BudID}>
          <h5>{e.Budgivare}:</h5>
          <h5>{e.Summa} kr</h5>{' '}
        </li>
      ))
      .reverse();

    listItems.push(
      <li className="bidlistitem" key={'utgang'}>
        <h5>Utropspris: </h5>
        <h5>{this.props.auction.Utropspris} kr</h5>
      </li>
    );

    return (
      <div>
        <ul>{listItems}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  bids: state.bids.bids,
  user: state.user.name
});

const mapDispatchToProps = dispatch => {
  return {
    submitBid: bid => dispatch(createBid(bid)),
    loadBids: id => dispatch(loadBids(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BidList);

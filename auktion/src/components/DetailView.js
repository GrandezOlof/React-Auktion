import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAuctions } from '../actions/auctionActions';
import BidList from './BidList';
import moment from 'moment';
import AdminPanel from './AdminPanel';
import AddBidForm from './AddBidForm';

export class DetailView extends Component {
  componentDidMount() {
    this.props.loadAuctions();
  }

  render() {
    let auction = this.props.auction;

    if (auction) {
      let adminpanel =
        this.props.user === auction.SkapadAv ? (
          <AdminPanel auktionID={auction.AuktionID} />
        ) : null;

      return (
        <div className="container padded ">
          <div className="card">
            <div className="card-content">
              <h4 className="">{auction.Titel}</h4>
              <p>{auction.Beskrivning}</p>
              <br />
              <p>Seller: {auction.SkapadAv}</p>
              <p>
                Start Date: {moment(auction.StartDatum).format('MMMM Do YYYY')}
              </p>
              <p>
                End Date: {moment(auction.SlutDatum).format('MMMM Do YYYY')}
              </p>
              {adminpanel}
            </div>
          </div>
          <div className="card ">
            <div className="card-content">
              <h4>Bids</h4>
              <AddBidForm auction={auction} />
              <BidList auction={auction} />
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  auction: state.auction.auctions.find(
    auc => auc.AuktionID === parseInt(ownProps.id)
  ),
  user: state.user.name
});

const mapDispatchToProps = dispatch => {
  return {
    loadAuctions: id => dispatch(loadAuctions())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailView);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuctionList from './AuctionList';
import SearchBar from './SearchBar';
import moment from 'moment';
import '../index.css';

class AuctionSummary extends Component {
  render() {
    const { auctions, filterString } = this.props;

    if (auctions.length > 0) {
      let filteredAuctions =
        filterString === ''
          ? auctions.filter(a => moment(a.SlutDatum).isAfter(moment()))
          : auctions.filter(a =>
              a.Titel.toUpperCase().includes(filterString.toUpperCase())
            );
      // auctions;

      return (
        <div className="container padded marged">
          <div className="card">
            <SearchBar />
            <AuctionList auctions={filteredAuctions} />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
const mapStateToProps = state => {
  return {
    auctions: state.auction.auctions,
    filterString: state.auction.filter
  };
};
export default connect(mapStateToProps)(AuctionSummary);

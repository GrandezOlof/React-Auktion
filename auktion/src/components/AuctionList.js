import React from 'react';
import AuctionListItem from './AuctionListItem';
import '../index.css';

const AuctionList = ({ auctions }) => {
  return (
    <div className="row">
      {auctions &&
        auctions.map(auction => {
          return <AuctionListItem auction={auction} key={auction.AuktionID} />;
        })}
    </div>
  );
};
export default AuctionList;

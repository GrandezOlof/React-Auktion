import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import '../index.css';

const AuctionListItem = ({ auction }) => {
  return (
    <div className="col s12 m6 l4">
      <div className="card ">
        <div className="card-content ">
          <span className="card-title">{auction.Titel}</span>
          <p>{auction.Utropspris} kr</p>
          <p className="grey-text">End date:</p>
          <p className="grey-text">
            {moment(auction.SlutDatum).format('MMMM Do YYYY')}
          </p>
        </div>
        <div className="card-action blue darken-4 ">
          <NavLink to={'/auction/'  + auction.AuktionID}>Bid</NavLink>
        </div>
      </div>
    </div>
  );
};

export default AuctionListItem;

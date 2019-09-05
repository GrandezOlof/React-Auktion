import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteAuction, loadAuctions } from '../actions/auctionActions';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

class DeleteAuction extends Component {
  componentDidMount() {
    this.props.loadAuctions();
  }

  handleClick = e => {
    e.preventDefault();
    if (e.target.id == 'dontDeleteCMD') {
      this.props.history.push('/list');
    } else {
      this.props.deleteAuction(this.props.auction.AuktionID);
      this.props.history.push('/list');
    }
  };

  render() {
    let auction = this.props.auction;
    let user = this.props.user;

    if (auction) {
      if (auction.SkapadAv !== user) {
        return <Redirect to="/login" />;
      } else {
        return (
          <div className="container padded">
            <div className="row ">
              <div className="col s6 offset-s3 ">
                <div className="card white darken-1">
                  <div className="card-content black-text">
                    <span className="card-title">Delete auction</span>
                    <p id="deleteQuestion">
                      Are you sure you want to delete this auction?
                    </p>
                    <div className="divider" />
                    <div className="section">
                      <label>Title</label>
                      <h4 id="deleteAucText">{auction.Titel}</h4>
                      <label>End date</label>
                      <p id="deleteAucText">
                        {moment(auction.SlutDatum).format('MMMM Do YYYY')}
                      </p>
                    </div>
                    <div className="divider" />
                    <button
                      className="btn blue darken-4"
                      onClick={this.handleClick}
                      id="deleteCMD"
                    >
                      Yes
                    </button>{' '}
                    <button
                      className="btn blue darken-4"
                      onClick={this.handleClick}
                      id="dontDeleteCMD"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else return null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  auction: state.auction.auctions.find(auc => auc.AuktionID == ownProps.id),
  user: state.user.name
});

const mapDispatchToProps = dispatch => {
  return {
    loadAuctions: id => dispatch(loadAuctions()),
    deleteAuction: id => dispatch(deleteAuction(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAuction);

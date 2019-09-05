import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAuctions, editAuction } from '../actions/auctionActions';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class EditAuction extends Component {
  componentDidMount() {
    this.props.loadAuctions();
    this.setState(this.props.auction);
  }

  constructor(props) {
    super(props);

    this.state = {
      Titel: 'loading',
      SlutDatum: '',
      Utropspris: '',
      Beskrivning: '',
      SkapadAv: '',
      AuktionID: ''
    };
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;

    if (oldProps.auction === undefined && newProps.auction !== undefined) {
      let newTime = moment(newProps.auction.SlutDatum).format('YYYY-MM-DD');
      let newState = { ...newProps.auction, SlutDatum: newTime };
      this.setState(newState);
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.editAuction(this.state);
    this.props.history.push('/auction/' + this.props.id);
  };

  handleSelect = date => {
    this.setState({
      SlutDatum: date
    });
  };

  render() {
    let startDate = new Date();
    return (
      <div className="container padded">
        <div className="row valign-wrapper">
          <div className="col s12 m8 offset-m2 valign">
            <div className="card white darken-1">
              <div className="card-content black-text">
                <span className="card-title">Edit Auction</span>
                <form onSubmit={this.handleSubmit}>
                  <div className="input-field">
                    <input
                      value={this.state.Titel}
                      type="text"
                      id="Titel"
                      onChange={this.handleChange}
                    />
                    <label className="active" htmlFor="Titel">
                      Title
                    </label>
                  </div>
                  <label htmlFor="SlutDatum">End date</label>
                  <br />
                  <DatePicker
                    selected={this.state.SlutDatum}
                    onSelect={this.handleSelect}
                    minDate={startDate}
                  />
                  <div className="input-field">
                    <input
                      value={this.state.Utropspris}
                      type="text"
                      id="Utropspris"
                      onChange={this.handleChange}
                    />
                    <label htmlFor="Utropspris" className="active">
                      Starting price
                    </label>
                  </div>
                  <div className="input-field">
                    <textarea
                      value={this.state.Beskrivning}
                      id="Beskrivning"
                      className="materialize-textarea"
                      onChange={this.handleChange}
                    />
                    <label className="active" htmlFor="Beskrivning">
                      Information about the product
                    </label>
                  </div>
                  <button id="createNewCMD" className="btn blue darken-4">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    auction: state.auction.auctions.find(
      a => a.AuktionID === parseInt(ownProps.id)
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAuctions: id => dispatch(loadAuctions()),
    editAuction: auction => dispatch(editAuction(auction))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAuction);

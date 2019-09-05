import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAuction } from '../actions/auctionActions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class CreateNewAuction extends Component {
  state = {
    Titel: null,
    SlutDatum: null,
    Utropspris: null,
    Beskrivning: null
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addAuction(this.state);
    this.props.history.push('/list/');
    console.log(this.state);
  };

  handleSelect = date => {
    this.setState({
      SlutDatum: date.setHours(date.getHours() + 2)
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
                <span className="card-title">Create new auction</span>
                <form onSubmit={this.handleSubmit}>
                  <div className="input-field">
                    <input
                      type="text"
                      id="Titel"
                      onChange={this.handleChange}
                    />
                    <label htmlFor="Titel">Title</label>
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
                      type="text"
                      id="Utropspris"
                      onChange={this.handleChange}
                    />
                    <label htmlFor="Utropspris">Starting price</label>
                  </div>
                  <div className="input-field">
                    <textarea
                      id="Beskrivning"
                      className="materialize-textarea"
                      onChange={this.handleChange}
                    />
                    <label htmlFor="Beskrivning">
                      Information about the product
                    </label>
                  </div>
                  <button id="createNewCMD" className="btn blue darken-4">
                    Create
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

const mapDispatchToProps = dispatch => {
  return {
    addAuction: auction => {
      dispatch(addAuction(auction));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateNewAuction);

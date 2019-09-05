import React, { Component } from 'react';

import AuctionSummary from './components/AuctionSummary';
import Navigation from './components/Navigation';
import CreateNewAuction from './components/CreateNewAuction';
import DeleteAuction from './components/DeleteAuction';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import DetailView from './components/DetailView';
import EditAuction from './components/EditAuction';

import { connect } from 'react-redux';
import { loadAuctions } from './actions/auctionActions';

class App extends Component {
  componentDidMount() {
    this.props.loadDatabase();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Switch>
            <Route exact path="/" component={AuctionSummary} />
            <Route path="/list" component={AuctionSummary} />
            <Route path="/new" component={CreateNewAuction} />
            <Route
              path="/delete/:id"
              render={props => (
                <DeleteAuction {...props} id={props.match.params.id} />
              )}
            />
            <Route path="/login" component={LogIn} />
            <Route
              path="/auction/:id"
              render={props => (
                <DetailView {...props} id={props.match.params.id} />
              )}
            />
            <Route
              path="/edit/:id"
              render={props => (
                <EditAuction {...props} id={props.match.params.id} />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDatabase: () => dispatch(loadAuctions())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);

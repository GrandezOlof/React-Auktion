import axios from 'axios';
import moment from 'moment';
import { deleteBid } from './bidActions';

export const loadAuctions = () => {
  return (dispatch, getState) => {
    axios
      .get('http://nackowskis.azurewebsites.net/api/Auktion/2100/')
      .then(res => {
        dispatch({ type: 'LOAD_AUCTIONS', payload: { auctions: res.data } });
      });
  };
};

export const addAuction = auction => {
  return (dispatch, getState) => {
    let postObject = {
      ...auction,
      SkapadAv: getState().user.name,
      StartDatum: moment().format(),
      SlutDatum: moment(auction.SlutDatum).format(),
      Gruppkod: 2100
    };
    console.log(postObject);

    axios({
      method: 'POST',
      url: 'http://nackowskis.azurewebsites.net/api/Auktion/2100/',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(postObject)
    }).then(res => {
      console.log(res);
      dispatch(loadAuctions());
    });
  };
};

export const deleteAuction = id => {
  return (dispatch, getState) => {
    axios({
      method: 'DELETE',
      url: `http://nackowskis.azurewebsites.net/api/Auktion/2100/${id}`,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      dispatch({ type: 'DELETE_AUCTION', payload: { id: id } });
      axios
        .get(`http://nackowskis.azurewebsites.net/api/bud/2100/${id}`)
        .then(res => {
          console.log(res);
          for (let b of res.data) {
            dispatch(deleteBid(b.BudID));
          }
        });
    });
  };
};

export const editAuction = auction => {
  return (dispatch, getState) => {
    let postObject = {
      ...auction,
      SlutDatum: moment(auction.SlutDatum).format(),
      StartDatum: moment(auction.StartDatum).format()
    };

    axios({
      method: 'PUT',
      url: `http://nackowskis.azurewebsites.net/api/Auktion/2100/${
        auction.AuktionID
      }`,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(postObject)
    }).then(res => {
      dispatch({ type: 'EDIT_AUCTION', payload: { auction: auction } });
    });
  };
};

export const editFilter = inputString => {
  return { type: 'EDIT_FILTER', payload: { filter: inputString } };
};

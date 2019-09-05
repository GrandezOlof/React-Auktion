import axios from 'axios';

export const loadBids = id => {
  return (dispatch, getState) => {
    axios
      .get(`http://nackowskis.azurewebsites.net/api/bud/2100/${id}`)
      .then(res => {
        dispatch({ type: 'LOAD_BIDS', payload: { bids: res.data } });
      });
  };
};

export const createBid = bid => {
  return (dispatch, getState) => {
    let bidObject = {
      ...bid,
      Budgivare: getState().user.name
    };

    console.log(bidObject);

    axios({
      method: 'POST',
      url: `http://nackowskis.azurewebsites.net/api/bud/2100/${bid.AuktionID}`,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(bidObject)
    }).then(res => {
      dispatch(loadBids(bid.AuktionID));
    });
  };
};

export const deleteBid = id => {
  return (dispatch, getState) => {
    axios({
      method: 'DELETE',
      url: `http://nackowskis.azurewebsites.net/api/bud/2100/${id}`,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      dispatch({ type: 'DELETE_BID', payload: { id: id } });
    });
  };
};

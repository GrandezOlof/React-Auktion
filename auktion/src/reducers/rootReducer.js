import auctionReducer from './auctionReducer';
import userReducer from './userReducer';
import { combineReducers } from 'redux';
import bidReducer from './bidReducer';

const rootReducer = combineReducers({
  auction: auctionReducer,
  user: userReducer,
  bids: bidReducer
});

export default rootReducer;

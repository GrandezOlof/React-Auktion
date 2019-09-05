const initialState = { auctions: [], filter: '' };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOAD_AUCTIONS':
      let { auctions } = payload;
      return { ...state, auctions };
    // case 'LOAD_SINGLEAUCTION':
    //     return { ...state, auctions: [...state.auctions, payload.auction] };

    case 'ADD_AUCTION':
      let { auction } = payload;
      return { ...state, auctions: [...state.auctions, auction] };
    case 'EDIT_AUCTION':
      return {
        ...state,
        auctions: state.auctions.map(a =>
          a.AuktionID === payload.auction.AuktionID ? payload.auction : a
        )
      };
    case 'DELETE_AUCTION':
      return {
        ...state,
        auctions: state.auctions.filter(a => a.AuktionID !== payload.id)
      };
    case 'EDIT_FILTER':
      return {
        ...state,
        filter: payload.filter
      };
    default:
      return state;
  }
};

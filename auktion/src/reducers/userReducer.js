const initialState = {
  name: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGIN_USER":
      return { ...state, ...payload };
    case "LOGOUT_USER":
      return { ...state, ...payload };
    default:
      return state;
  }
};

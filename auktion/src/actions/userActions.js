export const loginUser = name => {
  return { type: "LOGIN_USER", payload: { name: name } };
};

export const logoutUser = () => {
  return { type: "LOGOUT_USER", payload: { name: null } };
};

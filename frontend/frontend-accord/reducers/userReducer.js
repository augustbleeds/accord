const userReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOAD_USER':
      return action.payload;
    default:
      return state;
  }
}

export default userReducer;

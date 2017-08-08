const userReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOAD_USER':
      return action.payload;
    case 'MATCH_STATUS':
      return Object.assign({}, state, {searching: action.searching});
    default:
      return state;
  }
}

export default userReducer;

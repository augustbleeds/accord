const currentFriendReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOAD_FRIEND':
      return action.payload;
    default:
      return state;
  }
}

export default currentFriendReducer;

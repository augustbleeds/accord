const currentFriendReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOAD_FRIEND':
      return action.payload;
    default:
      return state;
  }
}

export default currentFriendReducer;

const navigatorReducer = (state = null, action) => {
  switch(action.type) {
    case 'ADD_NAVIGATOR':
      return action.payload;
    default:
      return state;
  }
}

export default navigatorReducer;

const user_reducer = (state = '', action) {
  switch(action.type) {
    case 'ADDING_USER':
      return action.addInEmail;
    default:
      return state;
  }
}


export default user_reducer;

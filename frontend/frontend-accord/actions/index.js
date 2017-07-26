// action creators
function loadUserInfo(dispatch, email, password) {
  return fetch('https://us-central1-accord-18bdf.cloudfunctions.net/route/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then((response) => {
    return response.json();
  })
  .then((userJson) => {
    // if the response is an object (if response is null, no action will be dispatched)
    if(userJson){
      dispatch({ type: 'LOAD_USER', payload: userJson});
    }
  })
}

function loadStoredUserInfo(dispatch, userJson) {
  dispatch({ type: 'LOAD_USER', payload: userJson});
}


function loadCurrentFriendInfo(dispatch, currentFriendJson){
  dispatch({ type: 'LOAD_FRIEND', payload: currentFriendJson });
}

export { loadUserInfo, loadCurrentFriendInfo, loadStoredUserInfo };

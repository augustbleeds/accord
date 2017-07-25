// action creator
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
    console.log('dispatching...');
    dispatch({ type: 'LOAD_USER', payload: userJson})
    console.log('hi hi hi');
  })
}

export {loadUserInfo};

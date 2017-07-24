// action creator
function loadUserInfo(email, password) {
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
    dispatch({ type: 'LOAD_USER', payload: userJson})
  })
}

export {loadUserInfo};

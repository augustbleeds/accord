import {combineReducers} from 'redux';
import user from './userReducer';
import navigator from './navigatorReducer';
import currentFriend from './currentFriendReducer';

const mainReducer = combineReducers({
  user, navigator, currentFriend
});

export default mainReducer;

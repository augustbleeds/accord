import {combineReducers} from 'redux';
import user from './userReducer';
import navigator from './navigatorReducer';

const mainReducer = combineReducers({
  user, navigator
});

export default mainReducer;

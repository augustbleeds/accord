import {combineReducers} from 'redux';
import addUser from './user_reducer';

const mainReducer = combineReducers({
  addUser: addUser
});

export default mainReducer;

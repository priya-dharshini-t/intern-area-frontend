import { combineReducers } from 'redux';
import userReducer from './Userslice';

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers if needed
});

export default rootReducer;

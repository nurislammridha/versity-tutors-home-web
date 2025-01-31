// reducers/index.js
import { combineReducers } from 'redux';
import CommonReducer from './_redux/CommonReducer';

const rootReducer = combineReducers({
    homeInfo: CommonReducer
});

export default rootReducer;

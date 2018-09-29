import reducer from './reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    // isme hum bohot sare reducer js ko combine krwa sakte hain our uske name hum kuch bhi rakh sakte hain filhal abhi ek hi reducer.js ki file hai to mai ek say hi kam kr rha hu
    rootReducer: reducer,
})
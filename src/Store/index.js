import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './Reducer';

const store = createStore(
    // pehla reducer lega bhale wo jitne bhi hon abhi filhal ek hi hai,
    reducer, //yaha hum sirf folder name kuch bhi name say call krwaygy baqi wo hume khud indexedDB.js k path pr lejayga
    {},
    applyMiddleware(thunk)   // isme hum wo chiz dete hain jo default pay use ho
)

export default store;
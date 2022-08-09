import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

let tempVariable = 0;

const store = configureStore({
    reducer: rootReducer,
    // middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware({
    //         thunk: {
    //             extraArguments: tempVariable
    //         }
    //     })
});
export default store;
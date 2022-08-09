import { createSlice } from '@reduxjs/toolkit';
import { APP_HEIGHT, APP_WIDTH } from '../../util/constants.js';

const initialState = {
    dimensions: {
        appWidth: 0,
        appHeight: 0,
        appScaler: 1,
    },
};

let userTotalSlice = createSlice({
    name: 'dimensions',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setDimensions: function (state, action) {
            // action.payload = dimension data (Object {height: (Number), width: (Number)})
            state.dimensions.appWidth = action.payload.width;
            state.dimensions.appHeight = action.payload.height;
            state.dimensions.appScaler = action.payload.height / APP_HEIGHT;
            // state.dimensions.appScaler = ((action.payload.height / APP_HEIGHT) < 0.7407) ? (action.payload.height / APP_HEIGHT) : (0.7407);
        },

        /*======================================*/
    },
});
export const { setDimensions } = userTotalSlice.actions;
export default userTotalSlice.reducer;
import { createSlice } from "@reduxjs/toolkit"
import * as C from '../../../helpers/constants.js'

const initialState = {
    dimensions: {
        appWidth: 0,
        appHeight: 0,
        appScaler: 1,
    }
}

let userTotalSlice = createSlice({
    name: 'dimensions',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setDimensions: function ( state, action )
        {
            // action.payload = dimension data (Object {height: (Number), width: (Number)})
            state.dimensions.appWidth  = action.payload.height
            state.dimensions.appHeight = action.payload.width
            state.dimensions.appScaler = ( action.payload.height / C.onst.appHeight )
        },

        /*======================================*/
    }
})
export const {
    setDimensions
} = userTotalSlice.actions
export default userTotalSlice.reducer
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userTotal: 1
}

let userTotalSlice = createSlice({
    name: 'userTotal',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setUserTotal: function (state, action)
        {
            // action.payload = amount/count/total (Number)
            state.userTotal = action.payload
        },

        /*======================================*/

        incrementUserTotal: function (state, action)
        {
            state.userTotal = state.userTotal + 1
        },

        /*======================================*/

        decrementUserTotal: function (state, action)
        {
            state.userTotal = state.userTotal - 1
        },

        /*======================================*/
    }
})
export const {
    setUserTotal,
    incrementUserTotal,
    decrementUserTotal
} = userTotalSlice.actions
export default userTotalSlice.reducer
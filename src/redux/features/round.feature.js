import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    round: 1
}

let roundSlice = createSlice({
    name: 'round',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setRound: function (state, action)
        {
            // action.payload = round (Number)
            state.round = action.payload
        },

        /*======================================*/

        incrementRound: function (state, action)
        {
            state.round = state.round + 1
        },

        /*======================================*/

        decrementRound: function (state, action)
        {
            state.round = state.round - 1
        },

        /*======================================*/
    }
})
export const {
    setRound,
    incrementRound,
    decrementRound,
} = roundSlice.actions
export default roundSlice.reducer
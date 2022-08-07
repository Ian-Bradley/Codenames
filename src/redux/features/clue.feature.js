import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    clue: ''
}

let clueSlice = createSlice({
    name: 'clue',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setClue: function (state, action)
        {
            // action.payload = clue (String)
            state.clue = action.payload
        },

        /*======================================*/
    }
})
export const {
    setClue,
} = clueSlice.actions
export default clueSlice.reducer
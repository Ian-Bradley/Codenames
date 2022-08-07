import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    instruction: ''
}

let instructionSlice = createSlice({
    name: 'instruction',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setInstruction: function (state, action)
        {
            // action.payload = instruction (String)
            state.instruction = action.payload
        },

        /*======================================*/
    }
})
export const {
    setInstruction,
} = instructionSlice.actions
export default instructionSlice.reducer
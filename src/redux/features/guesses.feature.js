import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    guesses: ''
}

let guessesSlice = createSlice({
    name: 'guesses',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setGuesses: function (state, action)
        {
            // action.payload = guesses (String)
            state.guesses = action.payload
        },

        /*======================================*/
    }
})
export const {
    setGuesses,
} = guessesSlice.actions
export default guessesSlice.reducer
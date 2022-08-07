import { createSlice } from "@reduxjs/toolkit"
import * as C from '../../helpers/constants.js'

const initialState = {
    teams: {
        red: {
            name: C.onst.red,
            cards: 0,
            guesses: 0,
        },
        blue: {
            name: C.onst.blue,
            cards: 0,
            guesses: 0,
        },
    },
}

let teamsSlice = createSlice({
    name: 'teams',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setRedCards: function (state, action)
        {
            // action.payload = cards (Number)
            state.teams.cards = action.payload
        },

        /*======================================*/

        setRedGuesses: function (state, action)
        {
            // action.payload = guesses (Number)
            state.teams.guesses = action.payload
        },

        /*======================================*/
        
        setBlueCards: function (state, action)
        {
            // action.payload = cards (Number)
            state.teams.cards = action.payload
        },

        /*======================================*/

        setBlueGuesses: function (state, action)
        {
            // action.payload = guesses (Number)
            state.teams.guesses = action.payload
        },

        /*======================================*/
    }
})
export const {
    setRedCards,
    setRedGuesses,
    setBlueCards,
    setBlueGuesses,
} = teamsSlice.actions
export default teamsSlice.reducer
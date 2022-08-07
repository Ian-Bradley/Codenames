import { createSlice } from "@reduxjs/toolkit"
import * as C from '../../../helpers/constants.js'

const initialState = {
    game: {
        state: C.onst.game_setup,
        clue: '',
        guesses: '',
        instruction: '',
        round: 0,
        userTotal: 1,
    },
}

let gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setGameState: function (state, action)
        {
            // action.payload = game state (String)
            state.game.state = action.payload
        },

        /*======================================*/

        setGameClue: function (state, action)
        {
            // action.payload = clue (String)
            state.game.clue = action.payload
        },

        /*======================================*/
        
        setGameGuesses: function (state, action)
        {
            // action.payload = guesses (String)
            state.game.guesses = action.payload
        },

        /*======================================*/

        setGameInstruction: function (state, action)
        {
            // action.payload = instruction (String)
            state.game.instruction = action.payload
        },

        /*======================================*/

        setRound: function (state, action)
        {
            // action.payload = round (Number)
            state.game.round = action.payload
        },

        /*======================================*/

        incrementRound: function (state, action)
        {
            state.game.round = state.game.round + 1
        },

        /*======================================*/

        decrementRound: function (state, action)
        {
            state.game.round = state.game.round - 1
        },

        /*======================================*/

        setUserTotal: function (state, action)
        {
            // action.payload = amount/count/total (Number)
            state.game.userTotal = action.payload
        },

        /*======================================*/

        incrementUserTotal: function (state, action)
        {
            state.game.userTotal = state.game.userTotal + 1
        },

        /*======================================*/

        decrementUserTotal: function (state, action)
        {
            state.game.userTotal = state.game.userTotal - 1
        },

        /*======================================*/
    }
})
export const {
    setGameState,
    setGameClue,
    setGameGuesses,
    setGameInstruction,
    setRound,
    incrementRound,
    decrementRound,
    setUserTotal,
    incrementUserTotal,
    decrementUserTotal,
} = gameSlice.actions
export default gameSlice.reducer
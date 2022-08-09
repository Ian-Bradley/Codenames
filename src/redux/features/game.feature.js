import { createSlice } from '@reduxjs/toolkit';
import { GAME_STATE_SETUP, TEXT_GAME_SETUP } from '../../util/constants.js';

const initialState = {
    game: {
        host: '',
        clue: '',
        round: 0,
        state: GAME_STATE_SETUP, // TODO: change to auth
        guesses: 0,
        userTotal: 1,
        instruction: TEXT_GAME_SETUP,
    },
};

let gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setGameState: function (state, action) {
            // action.payload = game state (String)
            state.game.state = action.payload;
        },

        /*======================================*/

        setHost: function (state, action) {
            // action.payload = user id (String)
            state.game.host = action.payload;
        },

        /*======================================*/

        setClue: function (state, action) {
            // action.payload = clue (String)
            state.game.clue = action.payload;
        },

        /*======================================*/

        seGuesses: function (state, action) {
            // action.payload = guesses (String)
            state.game.guesses = action.payload;
        },

        /*======================================*/

        setInstruction: function (state, action) {
            // action.payload = instruction (String)
            state.game.instruction = action.payload;
        },

        /*======================================*/

        setRound: function (state, action) {
            // action.payload = round (Number)
            state.game.round = action.payload;
        },

        /*======================================*/

        incrementRound: function (state, action) {
            state.game.round = state.game.round + 1;
        },

        /*======================================*/

        setUserTotal: function (state, action) {
            // action.payload = amount/count/total (Number)
            state.game.userTotal = action.payload;
        },

        /*======================================*/

        incrementUserTotal: function (state, action) {
            state.game.userTotal = state.game.userTotal + 1;
        },

        /*======================================*/

        decrementUserTotal: function (state, action) {
            state.game.userTotal = state.game.userTotal - 1;
        },

        /*======================================*/
    },
});
export const {
    setClue,
    setHost,
    setRound,
    seGuesses,
    setGameState,
    setUserTotal,
    setInstruction,
    incrementRound,
    incrementUserTotal,
    decrementUserTotal,
} = gameSlice.actions;
export default gameSlice.reducer;

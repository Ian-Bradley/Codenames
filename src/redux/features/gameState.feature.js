import { createSlice } from "@reduxjs/toolkit"
import * as C from '../../helpers/constants.js'

const initialState = {
    gameState: C.onst.gameState_setup,
}

let gameStateSlice = createSlice({
    name: 'gameState',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setGameState: function (state, action)
        {
            // action.payload = game state (String)
            state.gameState = action.payload
        },

        /*======================================*/
    }
})
export const {
    setGameState,
} = gameStateSlice.actions
export default gameStateSlice.reducer
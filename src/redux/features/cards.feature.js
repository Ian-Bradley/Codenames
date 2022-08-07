import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cards: []
}

/*
card (Object)
    id: (Number)

*/

let cardsSlice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setCards: function ( state, action )
        {
            // action.payload = cards (Array of card Objects)
            state.cards = action.payload
        },

        /*======================================*/
    }
})
export const {
    setCards,
} = cardsSlice.actions
export default cardsSlice.reducer
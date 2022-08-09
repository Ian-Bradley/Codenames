import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    highlights: [],
};

/*
highlight (Object)
    cardIndex (Number)
    userID: (String)
    name: (String)
    team: (String)
*/

let highlightsSlice = createSlice({
    name: 'highlights',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setHighlights: function (state, action) {
            // action.payload = highlights (Array of highlight Objects)
            state.highlights = action.payload;
        },

        /*======================================*/

        addHighlight: function (state, action) {
            // action.payload = highlight (Object)
            state.highlights.push(action.payload);
        },

        /*======================================*/

        deleteHighlight: function (state, action) {
            // action.payload = highlight data (Object {cardIndex: (Number), userID: (String)})
            state.highlights.filter(
                (highlight) =>
                    highlight.cardIndex !== action.payload.cardIndex &&
                    highlight.userID !== action.payload.userID
            );
        },

        /*======================================*/

        deleteUserHighlight: function (state, action) {
            // action.payload = user id (String)
            state.highlights.filter((highlight) => highlight.userID !== action.payload);
        },

        /*======================================*/

        deleteCardHighlight: function (state, action) {
            // action.payload = card index (Number)
            state.highlights.filter((highlight) => highlight.cardIndex !== action.payload);
        },

        /*======================================*/

        deleteAllHighlights: function (state, action) {
            state.highlights = [];
        },

        /*======================================*/
    },
});
export const {
    setHighlights,
    addHighlight,
    deleteHighlight,
    deleteUserHighlights,
    deleteCardHighlights,
    deleteAllHighlights,
} = highlightsSlice.actions;
export default highlightsSlice.reducer;

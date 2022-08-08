import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
};

/*
message (Object)
    name (String)
    content: (String)
*/

let messagesSlice = createSlice({
    name: 'messages',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setMessages: function (state, action) {
            // action.payload = messages (Array of message Objects)
            state.messages = action.payload;
        },

        /*======================================*/

        addMessage: function (state, action) {
            // action.payload = message (Object)
            state.messages.push(action.payload);
        },

        /*======================================*/

        deleteMessage: function (state, action) {
            // action.payload = id (String)
            state.messages.filter((message) => message.id !== action.payload);
        },

        /*======================================*/

        deleteAllMessages: function (state, action) {
            state.messages = [];
        },

        /*======================================*/
    },
});
export const { setMessages, addMessage, deleteMessage, deleteAllMessages } = messagesSlice.actions;
export default messagesSlice.reducer;

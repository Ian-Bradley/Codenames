import { createSlice } from '@reduxjs/toolkit';
import { generateRandomName } from '../../util/functions.js';

const initialState = {
    user: {
        id: '1',
        name: generateRandomName(true),
        team: '',
        position: '',
        isHost: false,
    },
};

let userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setID: function (state, action) {
            // action.payload = id (String)
            state.user.id = action.payload;
        },

        /*======================================*/

        setName: function (state, action) {
            // action.payload = name (String)
            state.user.name = action.payload;
        },

        /*======================================*/

        setTeam: function (state, action) {
            // action.payload = team (String)
            state.user.team = action.payload;
        },

        /*======================================*/

        setPosition: function (state, action) {
            // action.payload = position (String)
            state.user.position = action.payload;
        },

        /*======================================*/

        setIsHost: function (state, action) {
            // action.payload = host state (Boolean)
            state.user.IsHost = action.payload;
        },

        /*======================================*/
    },
});
export const { setID, setName, setTeam, setPosition, setIsHost } = userSlice.actions;
export default userSlice.reducer;

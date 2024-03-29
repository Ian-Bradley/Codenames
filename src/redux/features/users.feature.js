import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
};

/*
user (Object)
    id: (String)
    name: (String)
    team: (String)
    position: (String)
    isHost: (Boolean)
*/

let usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        /*======================================*/

        addUser: function (state, action) {
            // action.payload = user (Object)
            state.users.push(action.payload);
        },

        /*======================================*/

        removeUser: function (state, action) {
            // action.payload = ID (Number)
            state.users.filter((user) => user.id !== action.payload);
        },

        /*======================================*/

        setUsers: function (state, action) {
            // action.payload = users (Array of user Objects)
            state.users = action.payload;
        },

        /*======================================*/

        setUserName: function (state, action) {
            // action.payload = user data (Object {id: (String), name: (String)})
            state.users.map((user) => {
                if (user.id === action.payload.id) {
                    user.name = action.payload.name;
                }
            });
        },

        /*======================================*/

        setUserTeam: function (state, action) {
            // action.payload = user data (Object {id: (String), team: (String)})
            state.users.map((user) => {
                if (user.id === action.payload.id) {
                    user.team = action.payload.team;
                }
            });
        },

        /*======================================*/

        setUserPosition: function (state, action) {
            // action.payload = user data (Object {id: (String), position: (String)})
            state.users.map((user) => {
                if (user.id === action.payload.id) {
                    user.position = action.payload.position;
                }
            });
        },

        /*======================================*/

        setUserIsHost: function (state, action) {
            // action.payload = user id (String)
            state.users.map((user) => {
                if (user.id === action.payload) {
                    user.IsHost = true;
                } else {
                    user.IsHost = false;
                }
            });
        },

        /*======================================*/

        removeUsersIsHost: function (state, action) {
            state.users.map((user) => {
                user.IsHost = false;
            });
        },

        /*======================================*/
    },
});
export const {
    addUser,
    removeUser,
    setUsers,
    setUserName,
    setUserTeam,
    setUserPosition,
    setUserIsHost,
    removeUsersIsHost,
} = usersSlice.actions;
export default usersSlice.reducer;

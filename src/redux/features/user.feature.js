import { createSlice } from '@reduxjs/toolkit'
import * as H from '../../helpers/functions.js'

const initialState = {
    user: {
        id: '1',
        name: H.elper.generateRandomName(true),
        team: '',
        position: '',
        highlights: [],
        isHost: false,
    }
}

let userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setID: function ( state, action )
        {
            // action.payload = id (String)
            state.user.id = action.payload
        },

        /*======================================*/

        setName: function ( state, action )
        {
            // action.payload = name (String)
            state.user.name = action.payload
        },

        /*======================================*/

        setTeam: function ( state, action )
        {
            // action.payload = team (String)
            state.user.team = action.payload
        },

        /*======================================*/

        setPosition: function ( state, action )
        {
            // action.payload = position (String)
            state.user.position = action.payload
        },

        /*======================================*/

        setIsHost: function ( state, action )
        {
            // action.payload = host state (Boolean)
            state.user.IsHost = action.payload
        },
        
        /*======================================*/

        addHighlight: function ( state, action )
        {
            // action.payload = highlight (Object)
            state.user.hightlights.push( action.payload )
        },

        /*======================================*/

        deleteHighlight: function ( state, action )
        {
            // action.payload = card index (Number)
            // hightlight id's are created by using the card index of the clicked card
            state.user.hightlights.filter( hightlight => hightlight.id !== action.payload )
        },

        /*======================================*/

        deleteAllHighlight: function ( state, action )
        {
            state.user.hightlights = [];
        },

        /*======================================*/
    }
})
export const {
    setID,
    setName,
    setTeam,
    setPosition,
    setIsHost,
    addHighlight,
    deleteHighlight,
    deleteAllHighlights,
} = userSlice.actions
export default userSlice.reducer
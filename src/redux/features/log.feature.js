import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    log: []
}

/*
logItem (Object)
    id: (String)
    data: (Object)
        type (String)
        name (String)
        team (String)
        text (String)
*/

let logSlice = createSlice({
    name: 'log',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setLog: function ( state, action )
        {
            // action.payload = log (Array of logItem Objects)
            state.log = action.payload
        },

        /*======================================*/

        addLogItem: function ( state, action )
        {
            // action.payload = log item (Object)
            state.log.push( action.payload )
        },

        /*======================================*/

        deleteAllLogItems: function ( state, action )
        {
            state.log = []
        },

        /*======================================*/
    }
})
export const {
    setLog,
    addLogItem,
    deleteAllLogItems,
} = logSlice.actions
export default logSlice.reducer
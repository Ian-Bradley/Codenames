/*======================================
    BLOCK: REQUIRES
========================================*/

// const C = require('./lib/util/constants.js');
// const F = require('./lib/util/functions.js');

/*======================================
    BLOCK: CONFIGURATION
========================================*/

const express = require('express')
const SocketServer = require('ws')
const { v4: uuidv4 } = require('uuid')

const PORT = 3001
const server = express()
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`))
const WSS = new SocketServer.Server({ server })

/*================================================
    BLOCK: CLASS INITIATION
==================================================*/

const Game = require( './GameClass.js' )

/*================================================
    BLOCK: WS SERVER FUNCTIONS
==================================================*/

WSS.broadcast = ( data, wsClient ) => {
    WSS.clients.forEach( client => {
        if ( ( client.readyState === SocketServer.OPEN ) && ( wsClient !== client ) ) {
            client.send( data )
        }
    })
}

WSS.broadcast_client = ( data, wsClient ) => {
    if ( wsClient.readyState === SocketServer.OPEN ) {
        wsClient.send( data )
    }
}

WSS.broadcast_all = ( data ) => {
    WSS.clients.forEach( client => {
        if ( client.readyState === SocketServer.OPEN )
        {
            client.send( data )
        }
    })
}

/*================================================
    BLOCK: WS SERVER
==================================================*/

WSS.on('connection', ( wsClient ) => {

    /*================================================
        INNERBLOCK: > WS - INITIAL CONNECTION TO CLIENT
    ==================================================*/
    
    console.log('======= Client Connected =======')
 
    // > Set initial client data
    let clientData = {
        id:      uuidv4(), // message id
        userID:  '', // id for disconnecting user removal and determining host
        type:    'clientConnected',
        cards:   Game.state.cards,
        users:   Game.state.users,
        gameLog: Game.state.log,
    }
    
    // TODO: Send team guesses/cards remaining as well (returning users)
    
    // > Send cards, users on connection for current client
    WSS.broadcast_client( JSON.stringify( clientData ), wsClient )
    console.log('>>>>>>>>> Message Sent - Client Data >>>>>>>>>')
    console.log('======= END - Client Connected =======')


    /*================================================
        INNERBLOCK: > WS - HANDLERS
    ==================================================*/

    wsClient.on('message', function incoming( data ) {
        console.log('>>>>>>>>> Message Recieved >>>>>>>>>')
        let updateData = JSON.parse( data )
        console.log('type: ', updateData.type)

        switch ( updateData.type ) {

            /*================================================*/
            /*================================================*/

            // HANDLER: => USER CONNECTED
            case 'userConnected': {
                    // > Send new user data to all other users
                    console.log('======= MESSAGE - userConnected =======')
                    updateData.id = uuidv4()
                    clientData.userID = updateData.user.id // set id for disconnecting user removal
                    Game.addUser( updateData.user )
                    WSS.broadcast( JSON.stringify( updateData ), wsClient )
                    console.log('>>>>>>>>> Message Sent - userConnected >>>>>>>>>')

                    // > Determine/set/send host
                    if ( !Game.state.originalHost ) {
                        console.log('> Original Host')
                        Game.setOriginalHost( updateData.user.id )
                    }

                    if ( WSS.clients.size === 1 || ( Game.state.originalHost === updateData.user.id ) ) {
                        updateData.user.isHost = Game.setUserIsHost( updateData.user )

                        // Send host data to all
                        updateData.id = uuidv4()
                        updateData.type = 'updateUserIsHost'
                        WSS.broadcast_all( JSON.stringify( updateData ) )
                        console.log('>>>>>>>>> Message Sent - updateUserIsHost >>>>>>>>>')
                    }
            
                    console.log('======= END MESSAGE - userConnected =======')
                    break
                }

            /*================================================*/
            /*================================================*/

            // HANDLER: => USER NAME
            case 'updateUserName': {
                    console.log('======= MESSAGE - updateUserName =======')
                    updateData.id = uuidv4()
                    Game.setUserName( updateData.userID, updateData.newName )
                    WSS.broadcast_all( JSON.stringify( updateData ) )
                    console.log('>>>>>>>>> Message Sent - updateUserName >>>>>>>>>')
                    console.log('======= END MESSAGE - updateUserName =======')
                    break
                }
    
            /*================================================*/
            /*================================================*/

            // HANDLER: => USER TEAM
            case 'updateUserTeam': {
                    console.log('======= MESSAGE - updateUserTeam =======')
                    updateData.id = uuidv4()
                    Game.setUserTeam( updateData.userID, updateData.newTeam )
                    WSS.broadcast_all( JSON.stringify( updateData ) )
                    console.log('>>>>>>>>> Message Sent - updateUserTeam >>>>>>>>>')
                    console.log('======= END MESSAGE - updateUserTeam =======')
                    break
                }

            /*================================================*/
            /*================================================*/

            // HANDLER: => USER POSITION
            case 'updateUserPosition': {
                    console.log('======= MESSAGE - updateUserPosition =======')
                    updateData.id = uuidv4()
                    Game.setUserPosition( updateData.userID, updateData.newPosition )
                    WSS.broadcast_all( JSON.stringify( updateData ) )
                    console.log('>>>>>>>>> Message Sent - updateUserPosition >>>>>>>>>')
                    console.log('======= END MESSAGE - updateUserPosition =======')
                    break
                }

            /*================================================*/
            /*================================================*/

            // HANDLER: => ADD HIGHLIGHT
            case 'updateAddHighlight': {
                    console.log('======= MESSAGE - updateAddHighlight =======')
                    updateData.id = uuidv4()
                    Game.addHighlight( updateData.highlight )
                    WSS.broadcast( JSON.stringify( updateData ), wsClient )
                    console.log('>>>>>>>>> Message Sent - updateAddHighlight >>>>>>>>>')
                    console.log('======= END MESSAGE - updateAddHighlight =======')
                    break
                }
            
            /*================================================*/
            /*================================================*/

            // HANDLER: => DELETE HIGHLIGHT
            case 'updateDeleteHighlight': {
                    console.log('======= MESSAGE - updateDeleteHighlight =======')
                    updateData.id = uuidv4()
                    Game.deleteHighlight( updateData.userID, updateData.cardIndex )
                    WSS.broadcast( JSON.stringify( updateData ), wsClient )
                    console.log('>>>>>>>>> Message Sent - updateDeleteHighlight >>>>>>>>>')
                    console.log('======= END MESSAGE - updateDeleteHighlight =======')
                    break
                }
            
            /*================================================*/
            /*================================================*/

            // HANDLER: => DELETE USER HIGHLIGHTS
            // NOTE: will be done on user disconnecting
            case 'updateDeleteUserHighlights': {
                    // console.log('======= MESSAGE - updateDeleteUserHighlights =======')
                    // updateData.id = uuidv4()
                    // Game.deleteUserHighlights( updateData.userID )
                    // WSS.broadcast( JSON.stringify( updateData ), wsClient )
                    // console.log('>>>>>>>>> Message Sent - updateDeleteUserHighlights >>>>>>>>>')
                    // console.log('======= END MESSAGE - updateDeleteUserHighlights =======')
                    // break
                }
                
            /*================================================*/
            /*================================================*/

            // HANDLER: => DELETE CARD HIGHLIGHTS
            // NOTE: may not need this, will be done on cardChoose
            case 'updateDeleteCardHighlights': {
                    // console.log('======= MESSAGE - updateDeleteCardHighlights =======')
                    // updateData.id = uuidv4()
                    // Game.deleteCardHighlights( updateData.cardIndex )
                    // WSS.broadcast( JSON.stringify( updateData ), wsClient )
                    // console.log('>>>>>>>>> Message Sent - updateDeleteCardHighlights >>>>>>>>>')
                    // console.log('======= END MESSAGE - updateDeleteCardHighlights =======')
                    // break
                }

            /*================================================*/
            /*================================================*/

            // HANDLER: => DELETE ALL HIGHLIGHTS
            // NOTE: may not need this, will be done on turn-end (cardChoose condition/result)
            case 'updateDeleteAllHighlights': {
                    // console.log('======= MESSAGE - updateDeleteAllHighlights =======')
                    // updateData.id = uuidv4()
                    // Game.deleteCardHighlights()
                    // WSS.broadcast( JSON.stringify( updateData ), wsClient )
                    // console.log('>>>>>>>>> Message Sent - updateDeleteAllHighlights >>>>>>>>>')
                    // console.log('======= END MESSAGE - updateDeleteAllHighlights =======')
                    // break
                }

            /*======================================*/
            /*======================================*/

            default:
        }
    })

    /*================================================
        INNERBLOCK: > WS - CLOSING CONNECTION
    ==================================================*/

    wsClient.on('close', ( wsClient ) => {
        console.log('======= Client Disonnected =======')

        // > Determine if host
        console.log('Game.isUserHost( clientData.userID ): ', Game.isUserHost( clientData.userID ))
        let isHost = Game.isUserHost( clientData.userID )

        // TODO: Log users who have left in usersRemoved state array

        // > Remove disconnecting user
        Game.removeUser( clientData.userID )  

        // > Set host to next user in line if disconnecting user is host
        if ( ( isHost ) && ( Game.state.users.length > 0 ) ) {
            Game.setUserIsHost( Game.state.users[0] )

            // Send new host data to all
            let updateData = {
                id:   uuidv4(),
                user: Game.state.users[0],
                type: 'updateUserIsHost',
            }
            WSS.broadcast_all( JSON.stringify( updateData ), wsClient )
            console.log('>>>>>>>>> Message Sent - updateUserIsHost >>>>>>>>>')
        }

        // > If all users have left, begin session closing countdown
        if ( Game.state.users.length === 0 ) {
            // TODO: start timer for 5-10 minutes then close session
        }

        // > Set data for disconnect message
        let updateData = {
            id:     uuidv4(), // message id
            userID: clientData.userID, // user removal id
            type:   'clientDisconnected',
        }
        WSS.broadcast( JSON.stringify( updateData ), wsClient )
        console.log('>>>>>>>>> Message Sent - clientDisconnected >>>>>>>>>')
        console.log('======= END - Client Disonnected =======')
    })
})
/*======================================
    ANCHOR: CONFIGURATION
========================================*/

const express = require('express')
const SocketServer = require('ws')
const { v4: uuidv4 } = require('uuid')

const PORT = 3001
const server = express()
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`))
const wss = new SocketServer.Server({ server })

/*================================================
    ANCHOR: CLASS INITIATION
==================================================*/

import Game from './GameClass.js'
let game = new Game()

/*================================================
    ANCHOR: WS SERVER FUNCTIONS
==================================================*/

wss.broadcast = ( data, wsClient ) =>
{
    wss.clients.forEach( client =>
    {
        if ( ( client.readyState === SocketServer.OPEN ) && ( wsClient !== client ) )
        {
            client.send( data )
        }
    })
}

wss.broadcast_client = ( data, wsClient ) =>
{
    if ( wsClient.readyState === SocketServer.OPEN )
    {
        wsClient.send( data )
    }
    
}

wss.broadcast_all = ( data ) =>
{
    wss.clients.forEach( client =>
    {
        if ( client.readyState === SocketServer.OPEN )
        {
            client.send( data )
        }
    })
}

/*================================================
    ANCHOR: WS SERVER
==================================================*/

wss.on('connection', ( wsClient ) =>
{

    /*================================================
        ANCHOR: INITIAL CONNECTION TO CLIENT
    ==================================================*/
    
    // console.log('======= Client Connected =======')
 
    // > Set initial client data
    let clientData = {
        id:          uuidv4(), // message id
        playerID:    '', // id for disconnecting player removal and determining host
        type:        'clientConnected',
        cards:       game.state.cards,
        players:     game.state.players,
        gameLog:     game.state.gameLog,
    }
    
    // TODO: Send team guesses/cards remaining as well (returning players)
    
    // > Send cards, players on connection for current client
    wss.broadcast_client( JSON.stringify( clientData ), wsClient )
    // console.log('>>>>>>>>> Message Sent - Client Data >>>>>>>>>')
    // console.log('======= END - Client Connected =======')


    /*================================================
        ANCHOR: HANDLERS
    ==================================================*/

    wsClient.on('message', function incoming( data )
    {
        console.log('>>>>>>>>> Message Recieved >>>>>>>>>')
        let updateData = JSON.parse( data )
        console.log('type: ', updateData.type)

        switch ( updateData.type )
        {

            /*================================================
                ANCHOR: HANDLER - PLAYER CONNECTION
            ==================================================*/

            case 'userConnected':
                {
                    // > Send new player data to all other players
                    // console.log('======= HANDLER - userConnected =======')
                    updateData.id = uuidv4()
                    clientData.playerID = updateData.player.id // set id for disconnecting player removal
                    game.addPlayer( updateData.player )
                    wss.broadcast( JSON.stringify( updateData ), wsClient )
                    // console.log('>>>>>>>>> Message Sent - userConnected >>>>>>>>>')

                    // > Determine/set/send host
                    if ( !game.state.originalHost )
                    {
                        // console.log('> Original Host')
                        game.setPlayerIsOriginalHost( updateData.player.id )
                    }

                    if ( wss.clients.size === 1 || ( game.state.originalHost === updateData.player.id ) )
                    {
                        updateData.player.isHost = game.setPlayerIsHost( updateData.player )

                        // Send host data to all
                        updateData.id = uuidv4()
                        updateData.type = 'updatePlayerIsHost'
                        wss.broadcast_all( JSON.stringify( updateData ) )
                        // console.log('>>>>>>>>> Message Sent - updatePlayerIsHost >>>>>>>>>')
                    }
            
                    // console.log('======= END HANDLER - userConnected =======')
                    break
                }

            /*================================================
                ANCHOR: HANDLER - PLAYER INFO
            ==================================================*/

            case 'updatePlayerName':
                {
                    // console.log('======= HANDLER - updatePlayerName =======')
                    updateData.id = uuidv4()
                    game.setPlayerName( updateData.player, updateData.newName )
                    wss.broadcast_all( JSON.stringify( updateData ) )
                    // console.log('>>>>>>>>> Message Sent - updatePlayerName >>>>>>>>>')
                    // console.log('======= END HANDLER - updatePlayerName =======')
                    break
                }

            /*======================================*/
            /*======================================*/

            case 'updatePlayerTeam':
                {
                    // console.log('======= HANDLER - updatePlayerTeam =======')
                    updateData.id = uuidv4()
                    game.setPlayerTeam( updateData.player, updateData.newTeam )
                    wss.broadcast_all( JSON.stringify( updateData ) )
                    // console.log('>>>>>>>>> Message Sent - updatePlayerTeam >>>>>>>>>')
                    // console.log('======= END HANDLER - updatePlayerTeam =======')
                    break
                }

            /*======================================*/
            /*======================================*/

            case 'updatePlayerPosition':
            {
                // console.log('======= HANDLER - updatePlayerPosition =======')
                updateData.id = uuidv4()
                game.setPlayerPosition( updateData.player, updateData.newPosition )
                wss.broadcast_all( JSON.stringify( updateData ) )
                // console.log('>>>>>>>>> Message Sent - updatePlayerPosition >>>>>>>>>')
                // console.log('======= END HANDLER - updatePlayerPosition =======')
                break
            }

            /*================================================
                ANCHOR: HANDLER - HIGHLIGHTS
            ==================================================*/

            case 'updateAddHighlight':
                {
                    // console.log('======= HANDLER - updateAddHighlight =======')
                    updateData.id = uuidv4()
                    game.addHighlight( updateData.player, updateData.index )
                    wss.broadcast( JSON.stringify( updateData ), wsClient )
                    // console.log('>>>>>>>>> Message Sent - updateAddHighlight >>>>>>>>>')
                    // console.log('======= END HANDLER - updateAddHighlight =======')
                    break
                }
            
            /*======================================*/
            /*======================================*/

            case 'updateRemoveHighlight':
                {
                    // console.log('======= HANDLER - updateRemoveHighlight =======')
                    updateData.id = uuidv4()
                    game.deleteHighlight( updateData.player, updateData.index )
                    wss.broadcast( JSON.stringify( updateData ), wsClient )
                    // console.log('>>>>>>>>> Message Sent - updateRemoveHighlight >>>>>>>>>')
                    // console.log('======= END HANDLER - updateRemoveHighlight =======')
                    break
                }
            
            /*======================================*/
            /*======================================*/

            // case 'updateClearCardHighlights':
            //     {
            //         updateData.id = uuidv4()
            //         game.clear_card_highlights( updateData.index )
            //         wss.broadcast( JSON.stringify( updateData ), wsClient )
            //         break
            //     }
                
            /*======================================*/
            /*======================================*/

            // case 'updateClearHighlights':
            //     {
            //         updateData.id = uuidv4()
            //         game.clear_highlights()
            //         wss.broadcast( JSON.stringify( updateData ), wsClient )
            //         break
            //     }

            /*================================================
                ANCHOR: HANDLER - CARD CHOOSING
            ==================================================*/

            // case 'updateCardChoose':
            //     {
            //         updateData.id = uuidv4()
            //         wss.broadcast( JSON.stringify( updateData ), wsClient )
            //         break
            //     }

            default:
        }
    })

    /*================================================
        ANCHOR: CLOSING CONNECTION
    ==================================================*/

    wsClient.on('close', ( wsClient ) =>
    {
        // console.log('======= Client Disonnected =======')

        // > Determine if host
        // console.log('game.isPlayerHost( clientData.playerID ): ', game.isPlayerHost( clientData.playerID ))
        let isHost = game.isPlayerHost( clientData.playerID )

        // TODO: Log players who have left in playersRemoved state array

        // > Remove disconnecting player
        game.removePlayer( clientData.playerID )  

        // > Set host to next player in line if disconnecting player is host
        if ( ( isHost ) && ( game.state.players.length > 0 ) )
        {
            game.setPlayerIsHost( game.state.players[0] )

            // Send new host data to all
            let updateData = {
                id:     uuidv4(),
                player: game.state.players[0],
                type:   'updatePlayerIsHost',
            }
            wss.broadcast_all( JSON.stringify( updateData ), wsClient )
            // console.log('>>>>>>>>> Message Sent - updatePlayerIsHost >>>>>>>>>')
        }

        // > If all players have left, begin session closing countdown
        if ( game.state.players.length === 0 )
        {
            // TODO: start timer for 5-10 minutes then close session
        }

        // > Set data for disconnect message
        let updateData = {
            id:       uuidv4(), // message id
            playerID: clientData.playerID, // player removal id
            type:     'clientDisconnected',
        }
        wss.broadcast( JSON.stringify( updateData ), wsClient )
        // console.log('>>>>>>>>> Message Sent - clientDisconnected >>>>>>>>>')
        // console.log('======= END - Client Disonnected =======')
    })
})
/*======================================
    BLOCK: REQUIRES
========================================*/

// const C = require('./lib/util/constants.js');
// const F = require('./lib/util/functions.js');

/*======================================
    BLOCK: CONFIGURATION
========================================*/

const express = require('express');
const SocketServer = require('ws');
const { v4: uuidv4 } = require('uuid');

const PORT = 3001;
const server = express()
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));
const WSS = new SocketServer.Server({ server });

/*================================================
    BLOCK: CLASS INITIATION
==================================================*/

const GameClass = require('./GameClass.js');
const Game = new GameClass();

/*================================================
    BLOCK: WS SERVER FUNCTIONS
==================================================*/

WSS.broadcast = (data, wsClient) => {
    WSS.clients.forEach((client) => {
        if (client.readyState === SocketServer.OPEN && wsClient !== client) {
            client.send(data);
        }
    });
};

WSS.broadcast_client = (data, wsClient) => {
    if (wsClient.readyState === SocketServer.OPEN) {
        wsClient.send(data);
    }
};

WSS.broadcast_all = (data) => {
    WSS.clients.forEach((client) => {
        if (client.readyState === SocketServer.OPEN) {
            client.send(data);
        }
    });
};

/*================================================
    BLOCK: WS SERVER
==================================================*/

WSS.on('connection', (wsClient) => {
    /*================================================
        INNERBLOCK: > WS - INITIAL CONNECTION
    ==================================================*/

    console.log('======= START - Client Connected =======');
    const clientData = {
        id: uuidv4(), // message id
        userID: uuidv4(), // id for disconnecting user removal and determining host
        type: 'clientConnected',
        cards: Game.state.cards,
        users: Game.state.users,
        gameLog: Game.state.log,
    };

    // TODO: Send team guesses/cards remaining as well (returning users) [all game data]
    WSS.broadcast_client(JSON.stringify(clientData), wsClient);
    console.log('>>>>>>>>> MESSAGE SENT - Client Data >>>>>>>>>');
    console.log('======= END - Client Connected =======');

    /*================================================
        INNERBLOCK: > WS - HANDLERS
    ==================================================*/

    wsClient.on('message', function incoming(data) {
        console.log('>>>>>>>>> MESSAGE RECIEVED >>>>>>>>>');
        const messageData = JSON.parse(data);
        console.log('type: ', messageData.type);

        switch (messageData.type) {
            /*================================================*/
            /*================================================*/

            // HANDLER: => userConnected
            case 'userConnected': {
                // USER CONNECTION IS NOW CONFIRMED, ADD
                console.log('======= START - MESSAGE - userConnected =======');
                messageData.id = uuidv4();
                clientData.userID = messageData.user.id; // set id for disconnecting user removal

                Game.addUser(messageData.user);
                WSS.broadcast(JSON.stringify(messageData), wsClient);
                console.log('>>>>>>>>> MESSAGE SENT - userConnected >>>>>>>>>');

                if (!Game.state.originalHost) {
                    Game.setOriginalHost(messageData.user.id);
                }

                if (
                    WSS.clients.size === 1 ||
                    Game.state.originalHost === messageData.user.id ||
                    Game.state.host === ''
                ) {
                    Game.setHost(messageData.user.id);

                    const newMessage = {
                        id: uuidv4(),
                        type: 'updateUserHost',
                        userID: messageData.user.id,
                    };
                    WSS.broadcast_all(JSON.stringify(newMessage));
                    console.log('>>>>>>>>> MESSAGE SENT - updateUserIsHost >>>>>>>>>');
                }

                console.log('======= END MESSAGE - userConnected =======');
                break;
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => updateUserName
            case 'updateUserName': {
                console.log('======= START - MESSAGE - updateUserName =======');
                messageData.id = uuidv4();
                Game.setUserName(messageData.userID, messageData.newName);
                WSS.broadcast_all(JSON.stringify(messageData));
                console.log('>>>>>>>>> MESSAGE SENT - updateUserName >>>>>>>>>');
                console.log('======= END MESSAGE - updateUserName =======');
                break;
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => updateUserTeam
            case 'updateUserTeam': {
                console.log('======= START - MESSAGE - updateUserTeam =======');
                messageData.id = uuidv4();
                Game.setUserTeam(messageData.userID, messageData.newTeam);
                WSS.broadcast_all(JSON.stringify(messageData));
                console.log('>>>>>>>>> MESSAGE SENT - updateUserTeam >>>>>>>>>');
                console.log('======= END MESSAGE - updateUserTeam =======');
                break;
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => updateUserPosition
            case 'updateUserPosition': {
                console.log('======= START - MESSAGE - updateUserPosition =======');
                messageData.id = uuidv4();
                Game.setUserPosition(messageData.userID, messageData.newPosition);
                WSS.broadcast_all(JSON.stringify(messageData));
                console.log('>>>>>>>>> MESSAGE SENT - updateUserPosition >>>>>>>>>');
                console.log('======= END MESSAGE - updateUserPosition =======');
                break;
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => updateAddHighlight
            case 'updateAddHighlight': {
                console.log('======= START - MESSAGE - updateAddHighlight =======');
                messageData.id = uuidv4();
                Game.addHighlight(messageData.highlight);
                WSS.broadcast(JSON.stringify(messageData), wsClient);
                console.log('>>>>>>>>> MESSAGE SENT - updateAddHighlight >>>>>>>>>');
                console.log('======= END MESSAGE - updateAddHighlight =======');
                break;
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => updateDeleteHighlight
            case 'updateDeleteHighlight': {
                console.log('======= START - MESSAGE - updateDeleteHighlight =======');
                messageData.id = uuidv4();
                Game.deleteHighlight(messageData.userID, messageData.cardIndex);
                WSS.broadcast(JSON.stringify(messageData), wsClient);
                console.log('>>>>>>>>> MESSAGE SENT - updateDeleteHighlight >>>>>>>>>');
                console.log('======= END MESSAGE - updateDeleteHighlight =======');
                break;
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => updateDeleteUserHighlights
            // NOTE: will be done on user disconnecting
            case 'updateDeleteUserHighlights': {
                // console.log('======= START - MESSAGE - updateDeleteUserHighlights =======')
                // messageData.id = uuidv4()
                // Game.deleteUserHighlights( messageData.userID )
                // WSS.broadcast( JSON.stringify( messageData ), wsClient )
                // console.log('>>>>>>>>> MESSAGE SENT - updateDeleteUserHighlights >>>>>>>>>')
                // console.log('======= END MESSAGE - updateDeleteUserHighlights =======')
                // break
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => updateDeleteCardHighlights
            // NOTE: may not need this, will be done on cardChoose
            case 'updateDeleteCardHighlights': {
                // console.log('======= START - MESSAGE - updateDeleteCardHighlights =======')
                // messageData.id = uuidv4()
                // Game.deleteCardHighlights( messageData.cardIndex )
                // WSS.broadcast( JSON.stringify( messageData ), wsClient )
                // console.log('>>>>>>>>> MESSAGE SENT - updateDeleteCardHighlights >>>>>>>>>')
                // console.log('======= END MESSAGE - updateDeleteCardHighlights =======')
                // break
            }

            /*================================================*/
            /*================================================*/

            // HANDLER: => updateDeleteAllHighlights
            // NOTE: may not need this, will be done on turn-end (cardChoose condition/result)
            case 'updateDeleteAllHighlights': {
                // console.log('======= START - MESSAGE - updateDeleteAllHighlights =======')
                // messageData.id = uuidv4()
                // Game.deleteCardHighlights()
                // WSS.broadcast( JSON.stringify( messageData ), wsClient )
                // console.log('>>>>>>>>> MESSAGE SENT - updateDeleteAllHighlights >>>>>>>>>')
                // console.log('======= END MESSAGE - updateDeleteAllHighlights =======')
                // break
            }

            /*======================================*/
            /*======================================*/

            default:
        }
    });

    /*================================================
        INNERBLOCK: > WS - CLOSING CONNECTION
    ==================================================*/

    wsClient.on('close', (wsClient) => {
        console.log('======= START - Client Disonnected =======');

        // > Determine if host
        console.log('Game.isUserHost( clientData.userID ): ', Game.isUserHost(clientData.userID));
        let isHost = Game.isUserHost(clientData.userID);

        // TODO: Log users who have left in usersRemoved state array

        // > Remove disconnecting user
        Game.removeUser(clientData.userID);

        // > Set host to next user in line if disconnecting user is host
        if (isHost && Game.state.users.length > 0) {
            Game.setHost(Game.state.users[0].id);

            // Send new host data to all
            const messageData = {
                id: uuidv4(),
                user: Game.state.users[0],
                type: 'updateUserIsHost',
            };
            WSS.broadcast_all(JSON.stringify(messageData), wsClient);
            console.log('>>>>>>>>> MESSAGE SENT - updateUserIsHost >>>>>>>>>');
        }

        // > If all users have left, begin session closing countdown
        if (Game.state.users.length === 0) {
            // TODO: start timer for 5-10 minutes then close session
        }

        // > Set data for disconnect message
        const messageData = {
            id: uuidv4(), // message id
            userID: clientData.userID, // user removal id
            type: 'userDisconnected',
        };
        WSS.broadcast(JSON.stringify(messageData), wsClient);
        console.log('>>>>>>>>> MESSAGE SENT - userDisconnected >>>>>>>>>');
        console.log('======= END - Client Disonnected =======');
    });
});

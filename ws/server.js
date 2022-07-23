/*======================================
    SERVER CONFIGURATION
========================================*/

const express = require('express');
const SocketServer = require('ws');
const { v4: uuidv4 } = require('uuid');

const PORT = 3001;
const server = express()
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer.Server({ server });

/*======================================
    FUNCTIONAL METHODS
========================================*/

// const isEmpty = ( object ) =>
// {
//     for (const property in object)
//     {
//         return false;
//     }
//     return true;
// }

/*======================================*/
/*======================================*/

const shuffle_array = ( array ) =>
{
    var tmp, current, top = array.length;
    if( top ) while( --top ) {
        current = Math.floor( Math.random() * ( top + 1 ) );
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}

/*======================================*/
/*======================================*/

const create_card_indexes = () =>
{
    let indexArray = [];
    for ( let i = 1; i <= 25; i++ )
    { indexArray.push(i) }
    indexArray = shuffle_array( indexArray );
    return indexArray;
}

/*======================================*/
/*======================================*/

const get_codenames = () =>
{
    return ['butter', 'clock', 'island', 'Paris', 'wish',
            'soccer', 'crash', 'battery', 'carrot', 'tower',
            'venus', 'sugar', 'magenta', 'trigger', 'queen',
            'leg', 'window', 'joint', 'polar', 'machine',
            'tiger', 'pine', 'anteater', 'pillow', 'aloe'];
}

/*======================================*/
/*======================================*/

// C.onst.cardTotalNeutral: 7,   N,   0-6
// C.onst.cardTotalBlue:    8,   B,   7-14
// C.onst.cardTotalRed:     9,   R,   15-23
// C.onst.cardTotalBlack:   1,  Bl,   24
// [  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] array key
// [  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25] position key
// [ 10,  9, 25, 14,  4, 24, 16, 11, 19,  3, 22,  5,  7, 17, 13, 18,  2, 21, 15,  1,  6, 20, 12,  8, 23] index (random)
// [  N,  N,  N,  N,  N,  N,  N,  R,  R,  R,  R,  R,  R,  R,  R,  R,  B,  B,  B,  B,  B,  B,  B,  B, Bl] card-type

const build_cards = () =>
{
    let codenames = get_codenames();
    let indexes   = create_card_indexes();
    let cards     = [];
    for ( let i = 0; i < codenames.length; i++ )
    {
        let cardType = '';
        if ( 0 <= indexes[i] && indexes[i] <= 6 )
        { cardType = 'neutral'; }
        if ( 7 <= indexes[i] && indexes[i] <= 15 )
        { cardType = 'red'; }
        if ( 16 <= indexes[i] && indexes[i] <= 23 )
        { cardType = 'blue'; }
        if ( indexes[i] === 24 )
        { cardType = 'black'; }
        let card = {
            index: indexes[i],
            text: codenames[i],
            type: cardType,
            chosen: false,
        };
        cards[i] = card;
    }
    return cards;
}

/*======================================
    GAME CLASS - CODENAMES
========================================*/

class Codenames
{
    constructor()
    {
        this.state = {
            // Host
            originalHost: '',
            // Game Settings
            gameState: 'setup',
            round: 0,
            cards: build_cards(),
            // Teams
            teamRed: {
                cards: 0,
                guesses: 0,
            },
            teamBlue: {
                cards: 0,
                guesses: 0,
            },
            // Players
            players: [],
            playersDisconnected: [],
            // Game Log
            gameLog: [],
        };

        /*======================================*/
        /*======================================*/

        // State methods - Host
        this.is_host                  = this.is_host.bind(this);

        // State methods - Game Settings
        this.set_game_state           = this.set_game_state.bind(this);
        this.next_round               = this.next_round.bind(this);

        // State methods - Teams
        this.set_team__cards          = this.set_team__cards.bind(this);
        this.set_team__guesses        = this.set_team__guesses.bind(this);

        // State methods - Players
        this.player_add               = this.player_add.bind(this);
        this.player_remove            = this.player_remove.bind(this);

        // State methods - Player Info
        this.set_player_name          = this.set_player_name.bind(this);
        this.set_player_team          = this.set_player_team.bind(this);
        this.set_player_position      = this.set_player_position.bind(this);
        this.set_player_host          = this.set_player_host.bind(this);
        this.set_player_original_host = this.set_player_original_host.bind(this);

        // State methods - Highlighting
        this.highlight_add            = this.highlight_add.bind(this);
        this.highlight_remove         = this.highlight_remove.bind(this);
        this.highlight_clear_card     = this.highlight_clear_card.bind(this);
        this.highlight_clear_all      = this.highlight_clear_all.bind(this);

        // State methods - Game Log
        this.log_add_item             = this.log_add_item.bind(this);
        this.log_clear                = this.log_clear.bind(this);

        // State methods - Player Interactions
        // this.card_choose              = this.card_choose.bind(this);
        // this.clue_give                = this.clue_give.bind(this);
    }

    /*======================================
        STATE METHODS - Host
    ========================================*/

    is_host ( playerID )
    {
        console.log('===> is_host: ', playerID);
        if ( this.state.players.find( player => player.id === playerID ) )
        {
            console.log('===> END - is_host - player found');
            return this.state.players.find( player => player.id === playerID ).isHost;
        }
        console.log('===> END - is_host - player not found');
    }

    /*======================================
        STATE METHODS - Game Settings
    ========================================*/

    set_game_state ( state )
    {
        console.log('===> set_game_state: ', state);
        console.log('> BEFORE: ', this.state.gameState);
        this.state.gameState = state;
        console.log('> AFTER: ', this.state.gameState);
        console.log('===> END - set_game_state');
    }

    /*======================================*/
    /*======================================*/

    next_round ()
    {
        console.log('===> next_round');
        console.log('> BEFORE: ', this.state.round);
        this.state.round++;
        console.log('> AFTER: ', this.state.round);
        console.log('===> END - next_round');
    }

    /*======================================
        STATE METHODS - Team Info
    ========================================*/

    set_team__cards ( team, cards )
    {
        console.log('===> set_team__cards: ', team, ' ', cards);
        if ( team === 'red' )
        {
            console.log('> BEFORE: ', this.state.teamRed.cards);
            this.state.teamRed.cards = cards;
            console.log('> AFTER: ', this.state.teamRed.cards);
        }
        if ( team === 'blue' )
        {
            console.log('> BEFORE: ', this.state.teamBlue.cards);
            this.state.teamBlue.cards = cards;
            console.log('> AFTER: ', this.state.teamBlue.cards);
        }
        console.log('===> END - set_team__cards');
    }

    /*======================================*/
    /*======================================*/

    set_team__guesses ( team, guesses )
    {
        console.log('===> set_team__guesses: ', team, ' ', guesses);
        if ( team === 'red' )
        {
            console.log('> BEFORE: ', this.state.teamRed.guesses);
            this.state.teamRed.guesses = guesses;
            console.log('> AFTER: ', this.state.teamRed.guesses);
        }
        if ( team === 'blue' )
        {
            console.log('> BEFORE: ', this.state.teamBlue.guesses);
            this.state.teamBlue.guesses = guesses;
            console.log('> AFTER: ', this.state.teamBlue.guesses);
        }
        console.log('===> END - set_team__guesses');
    }

    /*======================================
        STATE METHODS - Players
    ========================================*/

    player_add ( player )
    {
        // console.log('===> player_add: ', player);
        // console.log('> BEFORE: ',this.state.players);
        this.state.players.push( player );
        // console.log('> AFTER: ', this.state.players);
        // console.log('===> END - player_add');
    }

    /*======================================*/
    /*======================================*/

    player_remove ( playerID )
    {
        // console.log('===> player_remove: ', playerID);
        // console.log('> BEFORE: ', this.state.players);
        this.state.players = this.state.players.filter( player => ( player.id !== playerID ) );
        // console.log('> AFTER: ', this.state.players);
        // console.log('===> END - player_remove');
    }

    /*======================================
        STATE METHODS - Player Info
    ========================================*/

    set_player_name ( player, newName )
    {
        // console.log('===> set_player_name: ', player, ' ', newName);
        for ( let i = 0; i < this.state.players.length; i++ )
        {
            if ( this.state.players[i].id === player.id )
            {
                // console.log('> BEFORE: ', this.state.players[i].name);
                this.state.players[i].name = newName;
                // console.log('> AFTER: ', this.state.players[i].name);
            }
        }
        // console.log('===> END - set_player_name');
    }

    /*======================================*/
    /*======================================*/

    set_player_team ( player, newTeam )
    {
        // console.log('===> set_player_team: ', player, ' ', newTeam);
        for ( let i = 0; i < this.state.players.length; i++ )
        {
            if ( this.state.players[i].id === player.id )
            {
                // console.log('> BEFORE: ', this.state.players[i].team);
                this.state.players[i].team = newTeam;
                // console.log('> AFTER: ', this.state.players[i].team);
            }
        }
        // console.log('===> END - set_player_team');
    }

    /*======================================*/
    /*======================================*/

    set_player_position ( player, newPosition )
    {
        // console.log('===> set_player_position: ', player, ' ', newPosition);
        for ( let i = 0; i < this.state.players.length; i++ )
        {
            if ( this.state.players[i].id === player.id )
            {
                // console.log('> BEFORE: ', this.state.players[i].position);
                this.state.players[i].position = newPosition;
                // console.log('> AFTER: ', this.state.players[i].position);
            }
        }
        // console.log('===> END - set_player_position');
    }

    /*======================================*/
    /*======================================*/

    set_player_host ( player )
    {
        console.log('===> set_player_host: ', player);
        if ( this.state.players.length )
        {
            for ( let i = 0; i < this.state.players.length; i++ )
            {
                // Unset any other host player
                if ( ( this.state.players[i].id !== player.id ) && ( this.state.players[i].isHost ) )
                {
                    // console.log('> BEFORE: ', this.state.players[i].isHost); // false
                    this.state.players[i].isHost = false;
                    // console.log('> AFTER: ', this.state.players[i].isHost); // true
                    console.log('> (Other) Player removed as host');
                }

                // Set player as host
                if ( this.state.players[i].id === player.id )
                {
                    if ( !this.state.players[i].isHost )
                    {
                        // console.log('> BEFORE: ', this.state.players[i].isHost); // false
                        this.state.players[i].isHost = true;
                        // console.log('> AFTER: ', this.state.players[i].isHost); // true
                        console.log('> Player set as host');
                        console.log('===> END - set_player_host');
                        return true;
                    }
                    else
                    {
                        console.log('> Player is already host');
                        console.log('===> END - set_player_host');
                        return false;
                    }
                }
                else
                {
                    console.log('> Cannot find player');
                    console.log('===> END - set_player_host');
                    return false;
                }
            }
        }
        else
        {
            console.log('> No players');
            console.log('===> END - set_player_host');
            return false;
        }
    }

    /*======================================*/
    /*======================================*/

    set_player_original_host ( playerID )
    {
        // console.log('===> set_player_original_host: ', playerID);
        // console.log('> BEFORE: ', this.state.originalHost);
        this.state.originalHost = playerID;
        // console.log('> AFTER: ', this.state.originalHost);
        // console.log('===> END - set_player_original_host');
    }

    /*======================================
        STATE METHODS - Highlighting
    ========================================*/

    highlight_add ( player, cardIndex )
    {
        // console.log('===> highlight_add: ', player, ' ', cardIndex);
        if ( this.state.players.length )
        {
            for ( let i = 0; i < this.state.players.length; i++ )
            {
                if ( this.state.players[i].id === player.id )
                {
                    // console.log('> BEFORE: ', this.state.players[i].highlights);
                    this.state.players[i].highlights.push(cardIndex);
                    // console.log('> AFTER: ', this.state.players[i].highlights);
                }
            }
        }
        // console.log('===> END - highlight_add');
    }

    /*======================================*/
    /*======================================*/

    highlight_remove ( player, cardIndex )
    {
        // console.log('===> highlight_remove: ', player, ' ', cardIndex);
        if ( this.state.players.length )
        {
            for ( let i = 0; i < this.state.players.length; i++ )
            {
                if ( this.state.players[i].id === player.id )
                {
                    // console.log('> BEFORE: ', this.state.players[i].highlights);
                    this.state.players[i].highlights = this.state.players[i].highlights.filter(
                        highlightIndex => ( highlightIndex !== cardIndex )
                    );
                    // console.log('> AFTER: ', this.state.players[i].highlights);
                }
            }
        }
        // console.log('===> END - highlight_remove');

    }

    /*======================================*/
    /*======================================*/

    // TODO
    highlight_clear_card ( cardIndex )
    {
        console.log('===> highlight_clear_card: ', cardIndex);
        console.log('===> END - highlight_clear_card');

    }

    /*======================================*/
    /*======================================*/

    // TODO
    highlight_clear_all ()
    {
        console.log('===> highlight_clear_all');
        console.log('===> END - highlight_clear_all');
    }

    /*======================================
        STATE METHODS - Game Log
    ========================================*/

    // TODO
    log_add_item ( logItem )
    {
        console.log('===> log_add_item: ', logItem);
        this.state.gameLog.push( logItem );
        console.log('===> END - log_add_item');
    }

    /*======================================*/
    /*======================================*/

    // TODO
    log_clear ()
    {
        console.log('===> log_clear');
        this.state.gameLog = [];
        console.log('===> END - log_clear');
    }

    /*======================================
        STATE METHODS - Player Interactions
    ========================================*/

    // // TODO
    // card_choose ( cardIndex )
    // { 

    // }

    // /*======================================*/
    // /*======================================*/

    // // TODO
    // clue_give ( clue )
    // {

    // }

}

/*======================================
    CLASS INITIATION
========================================*/

let game = new Codenames();

/*======================================
    WS SERVER FUNCTIONS
========================================*/

wss.broadcast = ( data, wsClient ) =>
{
    wss.clients.forEach( client =>
    {
        if ( ( client.readyState === SocketServer.OPEN ) && ( wsClient !== client ) )
        {
            client.send( data );
        }
    });
};

wss.broadcast_client = ( data, wsClient ) =>
{
    if ( wsClient.readyState === SocketServer.OPEN )
    {
        wsClient.send( data );
    }
    
};

wss.broadcast_all = ( data ) =>
{
    wss.clients.forEach( client =>
    {
        if ( client.readyState === SocketServer.OPEN )
        {
            client.send( data );
        }
    });
};

/*======================================
    WS SERVER
========================================*/

wss.on('connection', ( wsClient ) =>
{

    /*======================================
        INITIAL CONNECTION TO CLIENT
    ========================================*/
    
    // console.log('======= Client Connected =======');
 
    // Set initial client data
    let clientData = {
        id:          '', // id for disconnecting player removal
        messageType: 'clientConnected',
        cards:       game.state.cards,
        players:     game.state.players,
    };
    
    // TODO: Send team guesses/cards remaining as well (returning players)
    
    // Send cards, players on connection for current client
    wss.broadcast_client( JSON.stringify( clientData ), wsClient );
    // console.log('>>>>>>>>> Message Sent - Client Data >>>>>>>>>');
    // console.log('======= END - Client Connected =======');


    /*======================================
        HANDLERS
    ========================================*/

    wsClient.on('message', function incoming( data )
    {
        console.log('>>>>>>>>> Message Recieved >>>>>>>>>');
        let updateData = JSON.parse( data );
        console.log('updateData: ', updateData);

        switch ( updateData.messageType )
        {

            /*======================================
                HANDLER - PLAYER CONNECTIONS
            ========================================*/

            case 'newPlayer':
            {
                // Send new player data to all other players
                // console.log('======= HANDLER - newPlayer =======');
                updateData.id = uuidv4(); // message id
                clientData.id = updateData.player.id // set id for disconnecting player removal
                game.player_add( updateData.player );
                wss.broadcast( JSON.stringify( updateData ), wsClient );
                // console.log('>>>>>>>>> Message Sent - newPlayer >>>>>>>>>');

                // Determine/set/send host
                if ( !game.state.originalHost )
                {
                    // console.log('> Original Host');
                    game.set_player_original_host( updateData.player.id );
                }

                if ( wss.clients.size === 1 || ( game.state.originalHost === updateData.player.id ) )
                {
                    updateData.player.isHost = game.set_player_host( updateData.player );

                    // Send host data to all
                    updateData.id = uuidv4(); // message id
                    updateData.messageType = 'updatePlayerIsHost';
                    wss.broadcast_all( JSON.stringify( updateData ), wsClient );
                    // console.log('>>>>>>>>> Message Sent - updatePlayerIsHost >>>>>>>>>');
                }
        
                // console.log('======= END HANDLER - newPlayer =======');
                break;
            }

            /*======================================
                HANDLER - PLAYERS INFO
            ========================================*/

            case 'updatePlayerName':
            {
                // console.log('======= HANDLER - updatePlayerName =======');
                updateData.id = uuidv4(); // message id
                game.set_player_name( updateData.player, updateData.newName );
                wss.broadcast( JSON.stringify( updateData ), wsClient );
                // console.log('>>>>>>>>> Message Sent - updatePlayerName >>>>>>>>>');
                // console.log('======= END HANDLER - updatePlayerName =======');
                break;
            }

            /*======================================*/
            /*======================================*/

            case 'updatePlayerTeam':
            {
                // console.log('======= HANDLER - updatePlayerTeam =======');
                updateData.id = uuidv4(); // message id
                game.set_player_team( updateData.player, updateData.newTeam );
                wss.broadcast( JSON.stringify( updateData ), wsClient );
                // console.log('>>>>>>>>> Message Sent - updatePlayerTeam >>>>>>>>>');
                // console.log('======= END HANDLER - updatePlayerTeam =======');
                break;
            }

            /*======================================*/
            /*======================================*/

            case 'updatePlayerPosition':
            {
                // console.log('======= HANDLER - updatePlayerPosition =======');
                updateData.id = uuidv4(); // message id
                game.set_player_position( updateData.player, updateData.newPosition );
                wss.broadcast( JSON.stringify( updateData ), wsClient );
                // console.log('>>>>>>>>> Message Sent - updatePlayerPosition >>>>>>>>>');
                // console.log('======= END HANDLER - updatePlayerPosition =======');
                break;
            }

            /*======================================
                HANDLER - HIGHLIGHTS
            ========================================*/

            case 'updateAddHighlight':
            {
                console.log('======= HANDLER - updateAddHighlight =======');
                updateData.id = uuidv4(); // message id
                game.highlight_add( updateData.player, updateData.index );
                wss.broadcast( JSON.stringify( updateData ), wsClient );
                console.log('>>>>>>>>> Message Sent - updateAddHighlight >>>>>>>>>');
                console.log('======= END HANDLER - updateAddHighlight =======');
                break;
            }
            
            /*======================================*/
            /*======================================*/

            case 'updateRemoveHighlight':
            {
                console.log('======= HANDLER - updateRemoveHighlight =======');
                updateData.id = uuidv4(); // message id
                game.highlight_remove( updateData.player, updateData.index );
                wss.broadcast( JSON.stringify( updateData ), wsClient );
                console.log('>>>>>>>>> Message Sent - updateRemoveHighlight >>>>>>>>>');
                console.log('======= END HANDLER - updateRemoveHighlight =======');
                break;
            }
            
            /*======================================*/
            /*======================================*/

            // case 'updateClearCardHighlights':
            // {
            //     updateData.id = uuidv4(); // message id
            //     game.clear_card_highlights( updateData.index );
            //     wss.broadcast( JSON.stringify( updateData ), wsClient );
            //     break;
            // }
            
            /*======================================*/
            /*======================================*/

            // case 'updateClearHighlights':
            // {
            //     updateData.id = uuidv4(); // message id
            //     game.clear_highlights();
            //     wss.broadcast( JSON.stringify( updateData ), wsClient );
            //     break;
            // }

            /*======================================
                HANDLER - CARD CHOOSING
            ========================================*/

            // case 'updateCardChoose':
            // {
            //     updateData.id = uuidv4(); // message id
            //     wss.broadcast( JSON.stringify( updateData ), wsClient );
            //     break;
            // }

            default:
        }
    });

    /*======================================
        CLOSING CONNECTION
    ========================================*/

    wsClient.on('close', ( wsClient ) =>
    {
        // console.log('======= Client Disonnected =======');

        // Determine if host
        // console.log('game.is_host( clientData.id ): ', game.is_host( clientData.id ));
        let isHost = game.is_host( clientData.id );

        // TODO: Log players who have left in playersRemoved state array

        // Remove disconnecting player
        game.player_remove( clientData.id );  

        // Set host to next player in line if disconnecting player is host
        if ( ( isHost ) && ( game.state.players.length > 0 ) )
        {
            game.set_player_host( game.state.players[0] );

            // Send new host data to all
            let updateData = {
                id: uuidv4(), // message id
                messageType: 'updatePlayerIsHost',
                player: game.state.players[0]
            };
            wss.broadcast_all( JSON.stringify( updateData ), wsClient );
            // console.log('>>>>>>>>> Message Sent - updatePlayerIsHost >>>>>>>>>');
        }

        // If all players have left, begin session closing countdown
        if ( game.state.players.length === 0 )
        {
            // TODO: start timer for 5-10 minutes then close session
        }

        // Set data for disconnect message
        let updateData = {
            id: clientData.id, // player removal id
            messageType: 'clientDisconnected'
        };
        wss.broadcast( JSON.stringify( updateData ), wsClient );
            // console.log('>>>>>>>>> Message Sent - clientDisconnected >>>>>>>>>');
            // console.log('======= END - Client Disonnected =======');
    });
});
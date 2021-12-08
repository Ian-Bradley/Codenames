/*======================================
    ANCHOR: SERVER CONFIGURATION
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
    ANCHOR: FUNCTIONAL METHODS
========================================*/

// http://stackoverflow.com/questions/962802#962890
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

const create_card_indexes = () =>
{
    let indexArray = [];
    for ( let i = 1; i <= 25; i++ )
    { indexArray.push(i) }
    indexArray = shuffle_array( indexArray );
    return indexArray;
}

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
    let codenames   = get_codenames();
    let indexes = create_card_indexes();
    let cards = [];
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
            chosen: '',
        };
        cards[i] = card;
    }
    return cards;
}

/*======================================
    ANCHOR: GAME CLASS - CODENAMES
========================================*/

class Codenames
{
    constructor()
    {
        this.gameState = 'setup'
        this.round     = 0;
        this.cards     = build_cards();
        this.host      = {
            name: '',
            team: '',
            position: '',
            highlights: [],
        };
        this.players   = [];
        this.gameLog   = [];
        this.teamBlue = {
            cards: 0,
            guesses: 0,
            operatives: 0,
            spymasters: 0,
        };
        this.teamBlue = {
            cards: 0,
            guesses: 0,
            operatives: 0,
            spymasters: 0,
        };
        this.set_game_state         = this.set_game_state.bind(this);
        this.set_round              = this.set_round.bind(this);
        this.set_host               = this.set_host(this);
        this.add_player             = this.add_player.bind(this);
        this.remove_player          = this.remove_player.bind(this);
        this.update_player_name     = this.update_player_name.bind(this);
        this.update_player_team     = this.update_player_team.bind(this);
        this.update_player_position = this.update_player_position.bind(this);
        this.add_highlight          = this.add_highlight.bind(this);
        this.remove_highlight       = this.remove_highlight.bind(this);

        this.clear_card_highlights  = this.clear_card_highlights.bind(this);
        this.clear_highlights       = this.clear_highlights.bind(this);
        this.add_log_item           = this.add_log_item.bind(this);
        this.clear_log              = this.clear_log.bind(this);
    }
    /*======================================*/

    // ANCHOR: set_game_state
    set_game_state ( state )
    {
        this.gameState = state;
    }

    /*======================================*/

    // ANCHOR: set_round
    set_round ( amount )
    {
        this.round = amount;
    }

    /*======================================*/

    // ANCHOR: set_host
    set_host ( player )
    {
        this.host = player;
    }

    /*======================================*/

    // ANCHOR: add_player
    add_player ( player )
    {
        this.players.push( player );
    }

    /*======================================*/

    // ANCHOR: remove_player
    remove_player ( playerName )
    {
        this.players = this.players.filter( player => player.name !== playerName );
    }

    /*======================================*/

    // ANCHOR: update_player_name
    update_player_name ( playerName, newName )
    {
        for ( let i = 0; i < this.players.length; i++ )
        {
            if ( this.players[i].name === playerName )
            {
                this.players[i].name = newName;
            }
        }
    }

    /*======================================*/

    // ANCHOR: update_player_team
    update_player_team ( playerName, newTeam )
    {
        for ( let i = 0; i < this.players.length; i++ )
        {
            if ( this.players[i].name === playerName )
            {
                this.players[i].team = newTeam;
            }
        }
    }

    /*======================================*/

    // ANCHOR: update_player_position
    update_player_position ( playerName, newPosition )
    {
        for ( let i = 0; i < this.players.length; i++ )
        {
            if ( this.players[i].name === playerName )
            {
                this.players[i].position = newPosition;
            }
        }
    }

    /*======================================*/

    // ANCHOR: add_highlight
    add_highlight ( player, cardIndex )
    {
        if ( this.players.length )
        {
            for ( let i = 0; i < this.players.length; i++ )
            {
                if ( this.players[i].name === player.name )
                {
                    this.players[i].highlights.push( cardIndex );
                }
            }
        }
    }

    /*======================================*/

    // ANCHOR: remove_highlight
    remove_highlight ( player, cardIndex )
    {
        if ( this.players.length )
        {
            for ( let i = 0; i < this.players.length; i++ )
            {
                if
                (
                    ( this.players[i].name === player.name )
                    &&
                    ( this.players[i].highlights.includes( cardIndex ) )
                )
                {
                    this.players[i].highlights = this.players[i].highlights.filter(
                        highlightItem => ( highlightItem !== cardIndex )
                    );
                }
            }
        }
    }

    /*======================================*/

    // ANCHOR: clear_card_highlights
    clear_card_highlights ( index )
    {
        this.hightlights = this.hightlights.filter(
            highlightItem => ( highlightItem.index !== index )
        );
    }

    /*======================================*/

    // ANCHOR: clear_highlights
    clear_highlights ()
    {
        this.highlights = [];
    }

    /*======================================*/

    // ANCHOR: add_log_item
    add_log_item ( logItem )
    {
        this.gameLog.push( logItem );
    }

    /*======================================*/

    // ANCHOR: clear_log
    clear_log ()
    {
        this.gameLog = [];
    }
}

/*======================================
    ANCHOR: CLASS INITIATION
========================================*/

let game = new Codenames();

/*======================================
    ANCHOR: WS SERVER FUNCTIONS
========================================*/

wss.broadcast = ( data, wsClient, toClient ) =>
{
    if ( !toClient )
    {
        wss.clients.forEach( client =>
        {
            if ( ( client.readyState === SocketServer.OPEN ) && ( wsClient !== client ) )
            {
                client.send( data );
            }
        });
    }
    else
    {
        if ( wsClient.readyState === SocketServer.OPEN )
        {
            wsClient.send( data );
        }
    }
};

/*======================================
    ANCHOR: WS SERVER
========================================*/

wss.on('connection', ( wsClient ) =>
{

    /*======================================
        ANCHOR: OPENING CONNECTION
    ========================================*/
    
    console.log('Client connected');
    let clientName = '';
    let connectionData = {
        id: uuidv4(),
        messageType: 'clientConnected',
        total: wss.clients.size,
        cards: game.cards,
        players: game.players,
        host: false,
        player: {
            name: '',
            team: '',
            position: '',
            highlights: [],
        },
    }
    // Send total players to all other clients
    wss.broadcast( JSON.stringify( connectionData ), wsClient );
    // Send cards, players, and set host on connection for current client
    if ( wss.clients.size === 1 ) { connectionData.host = true; }
    wss.broadcast( JSON.stringify( connectionData ), wsClient, true );

    /*======================================
        ANCHOR: HANDLERS
    ========================================*/

    wsClient.on('message', function incoming( data )
    {
        let updateData = JSON.parse( data );
        console.log('======= Message Recieved =======');
        console.log('updateData: ', updateData);
        let output;
        
        switch ( updateData.messageType )
        {

            /*======================================
                ANCHOR: HANDLER - CONNECTIONS
            ========================================*/

            case 'addPlayer':
            {
                updateData.id = uuidv4();
                clientName = updateData.player.name;
                if ( game.host.name === clientName )
                {

                }
                game.add_player( updateData.player );
                output = JSON.stringify( updateData );
                wss.broadcast( output, wsClient );
                break;
            }

            /*======================================
                ANCHOR: HANDLER - PLAYERS
            ========================================*/

            case 'updatePlayerName':
            {
                updateData.id = uuidv4();
                clientName = updateData.newName;
                game.update_player_name( updateData.player.name, updateData.newName );
                output = JSON.stringify( updateData );
                wss.broadcast( output, wsClient );
                break;
            }

            case 'updatePlayerTeam':
            {
                updateData.id = uuidv4();
                game.update_player_team( updateData.player.name, updateData.newTeam );
                output = JSON.stringify( updateData );
                wss.broadcast( output, wsClient );
                break;
            }

            case 'updatePlayerPosition':
            {
                updateData.id = uuidv4();
                game.update_player_position( updateData.player.name, updateData.newPosition );
                output = JSON.stringify( updateData );
                wss.broadcast( output, wsClient );
                break;
            }

            /*======================================
                ANCHOR: HANDLER - HIGHLIGHTS
            ========================================*/

            case 'updateAddHighlight':
            {
                updateData.id = uuidv4();
                game.add_highlight( updateData.player, updateData.index );
                output = JSON.stringify( updateData );
                wss.broadcast( output, wsClient );
                break;
            }

            case 'updateRemoveHighlight':
            {
                updateData.id = uuidv4();
                game.remove_highlight( updateData.player, updateData.index );
                output = JSON.stringify( updateData );
                wss.broadcast( output, wsClient );
                break;
            }

            // case 'updateClearCardHighlights':
            // {
            //     updateData.id = uuidv4();
            //     game.clear_card_highlights( updateData.index );
            //     output = JSON.stringify( updateData );
            //     wss.broadcast( output, wsClient );
            //     break;
            // }

            // case 'updateClearHighlights':
            // {
            //     updateData.id = uuidv4();
            //     game.clear_highlights();
            //     output = JSON.stringify( updateData );
            //     wss.broadcast( output, wsClient );
            //     break;
            // }

            /*======================================
                ANCHOR: HANDLER - CARD CHOOSING
            ========================================*/

            // case 'updateCardChoose':
            // {
            //     updateData.id = uuidv4();
            //     output = JSON.stringify( updateData );
            //     wss.broadcast( output, wsClient );
            //     break;
            // }

            default:
        }
    });

    /*======================================
        ANCHOR: CLOSING CONNECTION
    ========================================*/

    wsClient.on('close', ( wsClient ) =>
    {
        console.log('Client disconnected');
        if ( game.host.name === clientName )
        {// TODO: determine who should be host on host disconnection
            // game.set_host();
        }
        game.remove_player( clientName );
        connectionData.id          = uuidv4();
        connectionData.messageType = 'clientDisconnected';
        connectionData.total       = wss.clients.size;
        connectionData.player.name = clientName;
        connectionData.host        = false;
        wss.broadcast( JSON.stringify( connectionData ), wsClient );
    });
});
import * as C from '../helpers/constants.js'
import * as H from '../helpers/functions.js'

/*================================================
    ANCHOR: CONSTRUCTION METHODS
==================================================*/

const createCardIndexes = () =>
{
    let indexArray = [];
    for ( let i = 1; i <= 25; i++ )
    { indexArray.push(i) }
    indexArray = H.elper.shuffleArray( indexArray );
    return indexArray;
}

/*======================================*/
/*======================================*/

const getCodenames = () =>
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

const createCards = () =>
{
    let codenames = getCodenames();
    let indexes   = createCardIndexes();
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
            highlighted: false,
            chosen: false,
        };
        cards[i] = card;
    }
    return cards;
}

/*================================================
    ANCHOR: GAME CLASS
==================================================*/

export default class Game
{
    constructor()
    {
        this.state = {
            // Host
            originalHost: '',
            // Game Settings
            gameState: 'setup',
            round: 0,
            cards: createCards(),
            // Teams
            teamRed: {
                name: C.onst.red,
                remainingCards: 0,
                remainingGuesses: 0,
            },
            teamBlue: {
                name: C.onst.blue,
                remainingCards: 0,
                remainingGuesses: 0,
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
        this.isPlayerHost = this.isPlayerHost.bind(this);

        // State methods - Game Settings
        this.setGameState = this.setGameState.bind(this);
        this.setRound     = this.setRound.bind(this);

        // State methods - Teams
        this.setTeamCards   = this.setTeamCards.bind(this);
        this.setTeamGuesses = this.setTeamGuesses.bind(this);

        // State methods - Players
        this.addPlayer    = this.addPlayer.bind(this);
        this.removePlayer = this.removePlayer.bind(this);

        // State methods - Player Info
        this.setPlayerName           = this.setPlayerName.bind(this);
        this.setPlayerTeam           = this.setPlayerTeam.bind(this);
        this.setPlayerPosition       = this.setPlayerPosition.bind(this);
        this.setPlayerIsHost         = this.setPlayerIsHost.bind(this);
        this.setPlayerIsOriginalHost = this.setPlayerIsOriginalHost.bind(this);

        // State methods - Highlighting
        this.addHighlight         = this.addHighlight.bind(this);
        this.deleteHighlight      = this.deleteHighlight.bind(this);
        this.deleteCardHighlights = this.deleteCardHighlights.bind(this);
        this.deleteAllHighlights  = this.deleteAllHighlights.bind(this);
        // this.deletePlayerHighlights = this.deletePlayerHighlights.bind(this);

        // State methods - Game Log
        this.addLogItem        = this.addLogItem.bind(this);
        this.deleteAllLogItems = this.deleteAllLogItems.bind(this);

        // State methods - Player Interactions
        // this.card_choose = this.card_choose.bind(this);
        // this.clue_give   = this.clue_give.bind(this);
    }

    /*================================================
        ANCHOR: STATE METHODS - Host
    ==================================================*/

    isPlayerHost ( playerID )
    {
        console.log('===> isPlayerHost: ', playerID);
        if ( this.state.players.find( player => player.id === playerID ) )
        {
            console.log('===> END - isPlayerHost - player found');
            return this.state.players.find( player => player.id === playerID ).isHost;
        }
        console.log('===> END - isPlayerHost - player not found');
    }

    /*================================================
        ANCHOR: STATE METHODS - Game Settings
    ==================================================*/

    setGameState ( state )
    {
        console.log('===> setGameState: ', state);
        console.log('> BEFORE: ', this.state.gameState);
        this.state.gameState = state;
        console.log('> AFTER: ', this.state.gameState);
        console.log('===> END - setGameState');
    }

    /*======================================*/
    /*======================================*/

    setRound ()
    {
        console.log('===> setRound');
        console.log('> BEFORE: ', this.state.round);
        this.state.round++;
        console.log('> AFTER: ', this.state.round);
        console.log('===> END - setRound');
    }

    /*================================================
        ANCHOR: STATE METHODS - Team Info
    ==================================================*/

    setTeamCards ( team, cards )
    {
        console.log('===> setTeamCards: ', team, ' ', cards);
        if ( team === 'red' )
        {
            console.log('> BEFORE: ', this.state.teamRed.remainingCards);
            this.state.teamRed.remainingCards = cards;
            console.log('> AFTER: ', this.state.teamRed.remainingCards);
        }
        if ( team === 'blue' )
        {
            console.log('> BEFORE: ', this.state.teamBlue.remainingCards);
            this.state.teamBlue.remainingCards = cards;
            console.log('> AFTER: ', this.state.teamBlue.remainingCards);
        }
        console.log('===> END - setTeamCards');
    }

    /*======================================*/
    /*======================================*/

    setTeamGuesses ( team, guesses )
    {
        console.log('===> setTeamGuesses: ', team, ' ', guesses);
        if ( team === 'red' )
        {
            console.log('> BEFORE: ', this.state.teamRed.remainingGuesses);
            this.state.teamRed.remainingGuesses = guesses;
            console.log('> AFTER: ', this.state.teamRed.remainingGuesses);
        }
        if ( team === 'blue' )
        {
            console.log('> BEFORE: ', this.state.teamBlue.remainingGuesses);
            this.state.teamBlue.remainingGuesses = guesses;
            console.log('> AFTER: ', this.state.teamBlue.remainingGuesses);
        }
        console.log('===> END - setTeamGuesses');
    }

    /*================================================
        ANCHOR: STATE METHODS - Players
    ==================================================*/

    addPlayer ( player )
    {
        // console.log('===> addPlayer: ', player);
        // console.log('> BEFORE: ',this.state.players);
        this.state.players.push( player );
        // console.log('> AFTER: ', this.state.players);
        // console.log('===> END - addPlayer');
    }

    /*======================================*/
    /*======================================*/

    removePlayer ( playerID )
    {
        // console.log('===> removePlayer: ', playerID);
        // console.log('> BEFORE: ', this.state.players);
        this.state.players = this.state.players.filter( player => ( player.id !== playerID ) );
        // console.log('> AFTER: ', this.state.players);
        // console.log('===> END - removePlayer');
    }

    /*================================================
        ANCHOR: STATE METHODS - Player Info
    ==================================================*/

    setPlayerName ( player, newName )
    {
        // console.log('===> setPlayerName: ', player, ' ', newName);
        for ( let i = 0; i < this.state.players.length; i++ )
        {
            if ( this.state.players[i].id === player.id )
            {
                // console.log('> BEFORE: ', this.state.players[i].name);
                this.state.players[i].name = newName;
                // console.log('> AFTER: ', this.state.players[i].name);
            }
        }
        // console.log('===> END - setPlayerName');
    }

    /*======================================*/
    /*======================================*/

    setPlayerTeam ( player, newTeam )
    {
        // console.log('===> setPlayerTeam: ', player, ' ', newTeam);
        for ( let i = 0; i < this.state.players.length; i++ )
        {
            if ( this.state.players[i].id === player.id )
            {
                // console.log('> BEFORE: ', this.state.players[i].team);
                this.state.players[i].team = newTeam;
                // console.log('> AFTER: ', this.state.players[i].team);
            }
        }
        // console.log('===> END - setPlayerTeam');
    }

    /*======================================*/
    /*======================================*/

    setPlayerPosition ( player, newPosition )
    {
        // console.log('===> setPlayerPosition: ', player, ' ', newPosition);
        for ( let i = 0; i < this.state.players.length; i++ )
        {
            if ( this.state.players[i].id === player.id )
            {
                // console.log('> BEFORE: ', this.state.players[i].position);
                this.state.players[i].position = newPosition;
                // console.log('> AFTER: ', this.state.players[i].position);
            }
        }
        // console.log('===> END - setPlayerPosition');
    }

    /*======================================*/
    /*======================================*/

    setPlayerIsHost ( player )
    {
        console.log('===> setPlayerIsHost: ', player);
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
                        console.log('===> END - setPlayerIsHost');
                        return true;
                    }
                    else
                    {
                        console.log('> Player is already host');
                        console.log('===> END - setPlayerIsHost');
                        return false;
                    }
                }
                else
                {
                    console.log('> Cannot find player');
                    console.log('===> END - setPlayerIsHost');
                    return false;
                }
            }
        }
        else
        {
            console.log('> No players');
            console.log('===> END - setPlayerIsHost');
            return false;
        }
    }

    /*======================================*/
    /*======================================*/

    setPlayerIsOriginalHost ( playerID )
    {
        // console.log('===> setPlayerIsOriginalHost: ', playerID);
        // console.log('> BEFORE: ', this.state.originalHost);
        this.state.originalHost = playerID;
        // console.log('> AFTER: ', this.state.originalHost);
        // console.log('===> END - setPlayerIsOriginalHost');
    }

    /*================================================
        ANCHOR: STATE METHODS - Highlighting
    ==================================================*/

    addHighlight ( player, cardIndex )
    {
        // console.log('===> addHighlight: ', player, ' ', cardIndex);
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
        // console.log('===> END - addHighlight');
    }

    /*======================================*/
    /*======================================*/

    deleteHighlight ( player, cardIndex )
    {
        // console.log('===> deleteHighlight: ', player, ' ', cardIndex);
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
        // console.log('===> END - deleteHighlight');

    }

    /*======================================*/
    /*======================================*/

    // TODO ===> deleteCardHighlights
    deleteCardHighlights ( cardIndex )
    {
        console.log('===> deleteCardHighlights: ', cardIndex);
        console.log('===> END - deleteCardHighlights');

    }

    /*======================================*/
    /*======================================*/

    // TODO ===> deleteAllHighlights
    deleteAllHighlights ()
    {
        console.log('===> deleteAllHighlights');
        console.log('===> END - deleteAllHighlights');
    }

    /*================================================
        ANCHOR: STATE METHODS - Game Log
    ==================================================*/

    // TODO ===> addLogItem
    addLogItem ( logItem )
    {
        console.log('===> addLogItem: ', logItem);
        console.log('> BEFORE: ', this.state.gameLog);
        this.state.gameLog.push( logItem );
        console.log('> AFTER: ', this.state.gameLog);
        console.log('===> END - addLogItem');
    }

    /*======================================*/
    /*======================================*/

    // TODO ===> deleteAllLogItems
    deleteAllLogItems ()
    {
        console.log('===> deleteAllLogItems');
        this.state.gameLog = [];
        console.log('===> END - deleteAllLogItems');
    }

    /*================================================
        ANCHOR: STATE METHODS - Player Interactions
    ==================================================*/

    // // TODO ===> card_choose
    // card_choose ( cardIndex )
    // { 

    // }

    // /*======================================*/
    // /*======================================*/

    // // TODO ===> clue_give
    // clue_give ( clue )
    // {

    // }

}
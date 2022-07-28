import React, { Component } from 'react';
import Header from './Header/Header.js';
import Button from './Button/Button.js';
import GameLog from './GameLog/GameLog.js';
import GameMenu from './GameMenu/GameMenu.js';
import TeamCard from './TeamCard/TeamCard.js';
import GameBoard from './GameBoard/GameBoard.js';
import GameInputs from './GameInputs/GameInputs.js';
import GameMessage from './GameMessage/GameMessage.js';
import * as C from '../constants.js'
import './App.scss';

const random_name = () =>
{
    let name = 'test';
    let randomNumberString = '';
    let numbers = '0123456789';
    for (let i = 0; i < 4; i++) {
      randomNumberString += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    name += randomNumberString;
    return name;
}

const random_ID = () =>
{
    let randomID = '';
    let characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 10; i++) {
        randomID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomID;
}

export default class App extends Component
{

    /*======================================
        ANCHOR: STATE
    ========================================*/

    constructor(props)
    {
        super(props);
        this.state = {
            // Game states
            gameState: C.onst.gameState_setup,
            round: 0,
            cards: [],
            clue: '',
            guesses: '',
            message: 'temp message',
            cardSize: 0,
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
            playersTotal: 1,
            players: [],
            currentPlayer: {
                id: random_ID(), // ID will come from name input page (1 before game page)
                name: random_name(),
                team: '',
                position: '',
                highlights: [],
                isHost: false
            },
            // Game Log
            gameLog: [],
            // App
            appWidth: window.innerWidth,
            appHeight: window.innerHeight,
        };
        
        /*======================================
            ANCHOR: METHOD BINDING
        ========================================*/

        // State methods - Connection
        this.socket                               = new WebSocket( 'ws://localhost:3001' );

        // State methods - Game states
        this.set_game_state                       = this.set_game_state.bind(this);
        this.set_round                            = this.set_round.bind(this);
        this.set_cards                            = this.set_cards.bind(this);
        this.set_players                          = this.set_players.bind(this);
        this.set_clue                             = this.set_clue.bind(this);
        this.set_message                          = this.set_message.bind(this);
        this.set_card_size                        = this.set_card_size.bind(this);

        // State methods - Teams
        this.set_team__cards                      = this.set_team__cards.bind(this);
        this.set_team__guesses                    = this.set_team__guesses.bind(this);

        // State methods - Players
        this.player_add                           = this.player_add.bind(this);
        this.player_remove                        = this.player_remove.bind(this);

        // State methods - Player Info
        this.set_current_player__ID               = this.set_current_player__ID.bind(this);
        this.set_current_player__name             = this.set_current_player__name.bind(this);
        this.set_current_player__team             = this.set_current_player__team.bind(this);
        this.set_current_player__position         = this.set_current_player__position.bind(this);
        this.set_current_player__isHost           = this.set_current_player__isHost.bind(this);
        this.set_player__name                     = this.set_player__name.bind(this);
        this.set_player__team                     = this.set_player__team.bind(this);
        this.set_player__position                 = this.set_player__position.bind(this);
        this.set_player__isHost                   = this.set_player__isHost.bind(this);

        // State methods - Highlighting
        this.highlight_add                        = this.highlight_add.bind(this);
        this.highlight_remove                     = this.highlight_remove.bind(this);
        this.highlight_clear_card                 = this.highlight_clear_card.bind(this);
        this.highlight_clear_all                  = this.highlight_clear_all.bind(this);

        // State methods - Game Log
        this.log_set                              = this.log_set.bind(this);
        this.log_add_item                         = this.log_add_item.bind(this);
        this.log_clear                            = this.log_clear.bind(this);

        // State methods - Player Interactions
        this.card_choose                          = this.card_choose.bind(this);
        this.card_highlight                       = this.card_highlight.bind(this);
        this.clue_give                            = this.clue_give.bind(this);

        // Functional methods
        this.debounce                             = this.debounce.bind(this);
        this.set_app_dimensions                   = this.set_app_dimensions.bind(this);
        this.enable_interactions                  = this.enable_interactions.bind(this);
        this.disable_interactions                 = this.disable_interactions.bind(this);

        // Functional methods - Cookies
        this.set_cookie                           = this.set_cookie.bind(this);
        this.get_cookie                           = this.get_cookie.bind(this);
    }

    /*======================================
        ANCHOR: STATE METHODS - Game States
    ========================================*/

    set_game_state ( state )
    {
        this.setState({ gameState: state });
        // TODO: disable/enable interactions
        // this.disable_interactions();
        // setTimeout(function() {
        //     this.enable_interactions();
        // }, transitionTime__stateChange);
    }

    /*======================================*/
    /*======================================*/

    set_round ( roundNumber )
    {
        this.setState({ round: roundNumber });
    }

    /*======================================*/
    /*======================================*/

    set_cards ( cardsArray )
    {
        this.setState({ cards: cardsArray });
    }

    /*======================================*/
    /*======================================*/

    set_players ( playersArray )
    { 
        this.setState({ players: playersArray });
        this.setState({ playersTotal: this.state.players.length + 1 });
    }

    /*======================================*/
    /*======================================*/

    set_clue ( newClue )
    { 
        this.setState({ clue: newClue });
    }

    /*======================================*/
    /*======================================*/

    set_guesses ( guessAmount )
    { 
        this.setState({ guesses: guessAmount });
    }

    /*======================================*/
    /*======================================*/

    set_message ( newMessage )
    { 
        this.setState({ message: newMessage });
    }

    /*======================================*/
    /*======================================*/

    set_card_size ( size )
    { 
        this.setState({ cardSize: size });
    }

    /*======================================
        ANCHOR: STATE METHODS - Team Info
    ========================================*/

    set_team__cards ( team, amount )
    {
        if ( team === C.onst.red )
        {
            this.setState( prevState => {
                let teamRed = { ...prevState.teamRed };
                teamRed.cards = amount;             
                return { teamRed };
            });
        }
        if ( team === C.onst.blue )
        {
            this.setState( prevState => {
                let teamBlue = { ...prevState.teamBlue };
                teamBlue.cards = amount;             
                return { teamBlue };
            });
        }
    }

    /*======================================*/
    /*======================================*/

    set_team__guesses ( team, amount )
    {
        if ( team === C.onst.red )
        {
            this.setState( prevState => {
                let teamRed = { ...prevState.teamRed };
                teamRed.guesses = amount;             
                return { teamRed };
            });
        }
        if ( team === C.onst.blue )
        {
            this.setState( prevState => {
                let teamBlue = { ...prevState.teamBlue };
                teamBlue.guesses = amount;             
                return { teamBlue };
            });
        }
    }

    /*======================================
        ANCHOR: STATE METHODS - Players
    ========================================*/

    player_add ( player )
    { 
        this.setState( prevState => ({
            players: [ ...prevState.players, player ]
        }));
        this.setState({ playersTotal: this.state.playersTotal + 1 });
    }
    
    /*======================================*/
    /*======================================*/

    player_remove ( playerID )
    {
        this.setState( prevState => {
            let players = prevState.players.filter( player => player.id !== playerID );
            return { players };
        });
        this.setState({ playersTotal: this.state.playersTotal - 1 });
    }

    /*======================================
        ANCHOR: STATE METHODS - Player Info
    ========================================*/

    set_current_player__ID ( playerID )
    {
        this.setState(prevState => {
            let currentPlayer = { ...prevState.currentPlayer };
            currentPlayer.id = playerID;
            return { currentPlayer };
        });
    }
    
    /*======================================*/
    /*======================================*/
    
    set_current_player__name ( playerName )
    {
        // State
        this.setState(prevState => {
            let currentPlayer = { ...prevState.currentPlayer };
            currentPlayer.name = playerName;
            return { currentPlayer };
        });
        // WS
        let newUpdate = {
            messageType: 'updatePlayerName',
            player: this.state.currentPlayer,
            newName: playerName,
        };
        this.socket.send( JSON.stringify( newUpdate ));
    }

    /*======================================*/
    /*======================================*/

    set_current_player__team ( teamColor )
    {
        // State
        this.setState(prevState => {
            let currentPlayer = { ...prevState.currentPlayer };
            currentPlayer.team = teamColor;
            return { currentPlayer };
        });
        // WS
        let newUpdate = {
            messageType: 'updatePlayerTeam',
            player: this.state.currentPlayer,
            newTeam: teamColor,
        };
        this.socket.send( JSON.stringify( newUpdate ));
    }

    /*======================================*/
    /*======================================*/

    set_current_player__position ( teamPosition )
    {
        // State
        this.setState( prevState => {
            let currentPlayer = { ...prevState.currentPlayer };
            currentPlayer.position = teamPosition;
            return { currentPlayer };
        });
        // WS
        let newUpdate = {
            messageType: 'updatePlayerPosition',
            player: this.state.currentPlayer,
            newPosition: teamPosition,
        };
        this.socket.send( JSON.stringify( newUpdate ));
    }

    /*======================================*/
    /*======================================*/

    set_current_player__isHost ()
    {
        // Remove host from other players
        this.setState( prevState => {
            let players = prevState.players;
            for ( let i = 0; i < players.length; i++ )
            {
                players[i].isHost = false;
            }
            return { players };
        });

        // Set current player to host
        this.setState( prevState => {
            let currentPlayer = { ...prevState.currentPlayer };
            currentPlayer.isHost = true;
            return { currentPlayer };
        });
    }

    /*======================================*/
    /*======================================*/

    set_player__name ( player, newName )
    {
        this.setState( prevState => {
            let players = prevState.players;
            for ( let i = 0; i < players.length; i++ )
            {
                if ( players[i].id === player.id )
                {
                    players[i].name = newName;
                }
            }
            return { players };
        });
    }

    /*======================================*/
    /*======================================*/

    set_player__team ( player, newTeam )
    {
        this.setState( prevState => {
            let players = prevState.players;
            for ( let i = 0; i < players.length; i++ )
            {
                if ( players[i].id === player.id )
                {
                    players[i].team = newTeam;
                }
            }
            return { players };
        });
    }

    /*======================================*/
    /*======================================*/

    set_player__position ( player, newPosition )
    {
        this.setState( prevState => {
            let players = prevState.players;
            for ( let i = 0; i < players.length; i++ )
            {
                if ( players[i].id === player.id )
                {
                    players[i].position = newPosition;
                }
            }
            return { players };
        });
    }

    /*======================================*/
    /*======================================*/

    set_player__isHost ( player )
    {
        // Remove current player as host
        this.setState( prevState => {
            let currentPlayer = { ...prevState.currentPlayer };
            currentPlayer.isHost = false;
            return { currentPlayer };
        });

        // Remove host from other players and set specified player as host
        this.setState( prevState => {
            let players = prevState.players;
            for ( let i = 0; i < players.length; i++ )
            {
                if ( players[i].id === player.id )
                {
                    players[i].isHost = true;
                }
                else
                {
                    players[i].isHost = false;
                }
            }
            return { players };
        });
    }

    /*======================================
        ANCHOR: STATE METHODS - Highlighting
    ========================================*/

    highlight_add ( player, cardIndex )
    {
        // console.log('===> highlight_add: ', player, ' ', cardIndex);
        // console.log('player.id: ', player.id);
        // console.log('this.state.currentPlayer.id: ', this.state.currentPlayer.id);
        if ( player.id === this.state.currentPlayer.id )
        {
            // console.log('> IS CURRENT PLAYER');
            // Current player - State
            this.setState( prevState => {
                let currentPlayer = { ...prevState.currentPlayer };
                currentPlayer.highlights.push( cardIndex );
                return { currentPlayer };
            });
            // Current player - WS
            let newUpdate = {
                messageType: 'updateAddHighlight',
                player: this.state.currentPlayer,
                index: cardIndex,
            };
            this.socket.send( JSON.stringify( newUpdate ));
            // console.log('>>>>>>>>> Message Sent - updateAddHighlight >>>>>>>>>');
        }
        else
        {
            // console.log('> IS OTHER PLAYER');
            // Other player - State
            this.setState( prevState => {
                let players = prevState.players;
                for ( let i = 0; i < players.length; i++ )
                {
                    if ( players[i].id === player.id )
                    {
                        players[i].highlights.push( cardIndex );
                    }
                }
                return { players };
            });
        }
        // console.log('===> END - highlight_add');
    }

    /*======================================*/
    /*======================================*/

    highlight_remove ( player, cardIndex )
    {
        // console.log('===> highlight_remove: ', player, ' ', cardIndex);
        // console.log('player.id: ', player.id);
        // console.log('this.state.currentPlayer.id: ', this.state.currentPlayer.id);
        if ( player.id === this.state.currentPlayer.id )
        {
            // console.log('> IS CURRENT PLAYER');
            // Current player - State
            this.setState( prevState => {
                let currentPlayer = { ...prevState.currentPlayer };
                currentPlayer.highlights = currentPlayer.highlights.filter(
                    highlightItem => ( highlightItem !== cardIndex )
                );
                return { currentPlayer };
            });
            // Current player - WS
            let newUpdate = {
                messageType: 'updateRemoveHighlight',
                player: this.state.currentPlayer,
                index: cardIndex,
            };
            this.socket.send( JSON.stringify( newUpdate ));
            // console.log('>>>>>>>>> Message Sent - updateRemoveHighlight >>>>>>>>>');
        }
        else
        {
            // console.log('> IS OTHER PLAYER');
            // Other player - State
            this.setState( prevState => {
                let players = prevState.players;
                for ( let i = 0; i < players.length; i++ )
                {
                    if ( ( players[i].id === player.id ) && ( players[i].highlights.includes( cardIndex ) ) )
                    {
                        players[i].highlights = players[i].highlights.filter(
                            highlightIndex => ( highlightIndex !== cardIndex )
                        );
                    }
                }
                return { players };
            });
        }
        // console.log('===> END - highlight_remove');
    }

    /*======================================*/
    /*======================================*/

    highlight_clear_card ( cardIndex )
    {
        // TODO: highlight_clear_card
        // NOTE: may not need WS for this --> only activated by card choose
        // State
        // this.setState( prevState => {
        //     let highlights = prevState.highlights.filter(
        //         highlightItem => ( highlightItem.index !== index )
        //     );
        //     return { highlights };
        // });
    }

    /*======================================*/
    /*======================================*/

    highlight_clear_all ()
    {
        // TODO highlight_clear_all
        // NOTE: may not need WS for this --> only activated by card choose/round change
        // this.setState({ highlights: [] });
    }

    /*======================================
        ANCHOR: STATE METHODS - Game Log
    ========================================*/

    log_set( logArray )
    {
        console.log('===> log_set');
        this.setState({ gameLog: logArray });
        console.log('===> END - log_set');
    }

    /*======================================*/
    /*======================================*/

    log_add_item ( logItem )
    {
        // console.log('===> log_add_item');
        // State
        this.setState( prevState => ({
            gameLog: [ ...prevState.gameLog, logItem]
        }));
        // WS
        // let newUpdate = {
        //     messageType: 'updateAddLogItem',
        //     index: logItem,
        // };
        // this.socket.send( JSON.stringify( newUpdate ));
        // console.log('>>>>>>>>> Message Sent - updateAddLogItem >>>>>>>>>');
        // console.log('===> END - log_add_item');
    }

    /*======================================*/
    /*======================================*/

    log_clear ()
    {
        this.setState({ gameLog: [] });
    }

    /*======================================
        ANCHOR: STATE METHODS - Player Interactions
    ========================================*/

    // TODO: card_choose
    card_choose ( cardIndex )
    { 
        // use currentPlayer --> updates from server will arrive as different commands, they will not use card_choose here
        // ==> update game log
        // ==> clear card highlights
        // ==> send request to server
        // ==> begin animation on recieving response from ws server
        // ==> after animation --> change round || continue round
        // ==> if round change, clear all card highlights

    }

    /*======================================*/
    /*======================================*/

    // NOTE: check if card index is already in highlight --> prevent duplicates

    card_highlight ( cardIndex )
    {
        // console.log('===> card_highlight: ', cardIndex);
        for ( let i = 0; i < this.state.cards.length; i++ )
        {
            // console.log('this.state.cards[i]: ', this.state.cards[i]);
            if ( this.state.cards[i].index === cardIndex )
            {
                // console.log('this.state.currentPlayer.highlights.includes( this.state.cards[i].index ): ', this.state.currentPlayer.highlights.includes( this.state.cards[i].index ));
                if ( this.state.currentPlayer.highlights.includes( this.state.cards[i].index ) )
                {
                    // console.log('> removing');
                    // console.log('> BEFORE: currentPlayer.highlights', this.state.currentPlayer.highlights);
                    this.highlight_remove( this.state.currentPlayer, cardIndex );
                    // console.log('> AFTER: currentPlayer.highlights', this.state.currentPlayer.highlights);
                }
                else
                {
                    // console.log('> add');
                    // console.log('> BEFORE: currentPlayer.highlights', this.state.currentPlayer.highlights);
                    this.highlight_add( this.state.currentPlayer, cardIndex );
                    // console.log('> AFTER: currentPlayer.highlights', this.state.currentPlayer.highlights);
                }
            }
        }
        // console.log('===> END - card_highlight');
    }

    /*======================================*/
    /*======================================*/

    // TODO: clue_give
    clue_give ( clue )
    {
        // ==> update game log
        // ==> 
        // ==> 
        // ==> send

        // let newUpdate = {
        //     messageType: 'updateCardChoose',
        //     player: {},
        //     clue: clue,
        // };
        // this.socket.send( JSON.stringify( newUpdate ));
    }

    /*======================================
        ANCHOR: FUNCTIONAL METHODS
    ========================================*/

    debounce ( func, wait, immediate )
    {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    /*======================================*/
    /*======================================*/

    set_app_dimensions ()
    {
        this.setState({ appWidth: window.innerWidth });
        this.setState({ appHeight: window.innerHeight });
    }

    /*======================================*/
    /*======================================*/

    // TODO: enable_interactions
    enable_interactions ()
    {
    //     document.querySelector('main').classList.remove( C.onst.classDisabled );
    }

    /*======================================*/
    /*======================================*/

    // TODO: disable_interactions
    disable_interactions ()
    {
    //     document.querySelector('main').classList.add( C.onst.classDisabled );
    }

    /*======================================
        ANCHOR: FUNCTIONAL METHODS - Cookies
    ========================================*/

    set_cookie ( name, value, days )
    {
        var expires = '';
        if ( days )
        {
            var date = new Date();
            date.setTime(date.getTime() + ( days*24*60*60*1000 ) );
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + ( value || '' )  + expires + '; path=/';
    }

    /*======================================*/
    /*======================================*/

    get_cookie ( name )
    {
        var nameEQ = name + '=';
        var ca = document.cookie.split( ';' );
        for ( var i = 0; i < ca.length; i++ )
        {
            var c = ca[i];
            while ( c.charAt(0)==' ' )
            { c = c.substring( 1, c.length ); }
            if ( c.indexOf( nameEQ ) == 0 )
            { return c.substring( nameEQ.length, c.length ); }
        }
        return null;
    }

    /*======================================
        ANCHOR: COMPONENT ACTIONS
    ========================================*/

    componentDidMount()
    {

        // TODO: Cookies
        // Get current playerID from cookies
        // If ID is not present, auth page has failed to store cookie
        // ?? Also check for name/position/team

        // let playerID = this.get_cookie('player-id');
        // this.set_current_player__ID( playerID );


        /*======================================
            ANCHOR: WEBSOCKET COMMUNICATION
        ========================================*/

        const ws = this.socket;

        ws.onopen = function ( e )
        {
            console.log('>>>>>>>>> WebSocket Client Connected >>>>>>>>>');
        };

        ws.onmessage = ( messageData ) =>
        {
            console.log('>>>>>>>>> Message Recieved >>>>>>>>>');
            let updateData = JSON.parse( messageData.data );
            console.log('> ', updateData.messageType);

            /*======================================
                HANDLERS
            ========================================*/

            switch( updateData.messageType )
            {

                /*======================================
                    ANCHOR: HANDLER - PLAYER CONNECTIONS
                ========================================*/

                case 'clientConnected':
                {
                    // This handler is only fired ONCE when the CURRENT player joins
                    // console.log('======= HANDLER - clientConnected =======');

                    // Set cards
                    // console.log('> Setting Cards');
                    
                    if ( !( updateData.cards === undefined ) && ( updateData.cards.length ) )
                    { this.set_cards( updateData.cards ); }
    
                    // Set players
                    // console.log('> Setting players');
                    if ( !( updateData.players === undefined ) && ( updateData.players.length ) )
                    { this.set_players( updateData.players ); }
                    
                    // Set players
                    // console.log('> Setting game log');
                    if ( !( updateData.gameLog === undefined ) && ( updateData.gameLog.length ) )
                    { this.set_players( updateData.gameLog ); }

                    // Send current player information to server
                    // console.log('> Send newPlayer');
                    let newUpdate = {
                        messageType: 'newPlayer',
                        player: this.state.currentPlayer,
                    };
                    ws.send( JSON.stringify( newUpdate ) );
                    console.log('>>>>>>>>> Message Sent - newPlayer >>>>>>>>>');
                    // console.log('======= END - HANDLER - clientConnected =======');
                    break;
                }

                /*======================================*/
                /*======================================*/

                case 'newPlayer':
                {
                    // This handler is only fired when OTHER players join
                    // console.log('======= HANDLER - newPlayer =======');
                    this.player_add( updateData.player );
                    // console.log('======= END - HANDLER - newPlayer =======');
                    break;
                }

                /*======================================*/
                /*======================================*/

                case 'clientDisconnected':
                {
                    // This handler is only fired when OTHER players leave
                    // console.log('======= HANDLER - clientDisconnected =======');
                    this.player_remove( updateData.id );
                    // console.log('======= END - HANDLER - clientDisconnected =======');
                    break;
                }

                /*======================================
                    ANCHOR: HANDLER - PLAYERS INFO
                ========================================*/

                case 'updatePlayerName':
                {
                    // console.log('======= HANDLER - updatePlayerName =======');
                    this.set_player__name( updateData.player, updateData.newName );
                    // console.log('======= END - HANDLER - updatePlayerName =======');
                    break;
                }

                /*======================================*/
                /*======================================*/

                case 'updatePlayerTeam':
                {
                    // console.log('======= HANDLER - updatePlayerTeam =======');
                    this.set_player__team( updateData.player, updateData.newTeam );
                    // console.log('======= END - HANDLER - updatePlayerTeam =======');
                    break;
                }

                /*======================================*/
                /*======================================*/

                case 'updatePlayerPosition':
                {
                    // console.log('======= HANDLER - updatePlayerPosition =======');
                    this.set_player__position( updateData.player, updateData.newPosition );
                    // console.log('======= END - HANDLER - updatePlayerPosition =======');
                    break;
                }

                /*======================================*/
                /*======================================*/

                case 'updatePlayerIsHost':
                {
                    console.log('======= HANDLER - updatePlayerIsHost =======');
                    if ( updateData.player.id === this.state.currentPlayer.id ) 
                    { 
                        this.set_current_player__isHost();
                    }
                    else
                    {
                        this.set_player__isHost( updateData.player );
                    }
                    console.log('======= END - HANDLER - updatePlayerIsHost =======');
                    break;
                }

                /*======================================
                    ANCHOR: HANDLER - HIGHLIGHTS
                ========================================*/

                case 'updateAddHighlight':
                {
                    console.log('======= HANDLER - updateAddHighlight =======');
                    this.highlight_add( updateData.player, updateData.index );
                    console.log('======= END - HANDLER - updateAddHighlight =======');
                    break;
                }

                /*======================================*/
                /*======================================*/

                case 'updateRemoveHighlight':
                {
                    console.log('======= HANDLER - updateRemoveHighlight =======');
                    this.highlight_remove( updateData.player, updateData.index );
                    console.log('======= END - HANDLER - updateRemoveHighlight =======');
                    break;
                }

                /*======================================*/
                /*======================================*/

                // case 'updateClearCardHighlights':
                // {
                //     console.log('==> updateClearCardHighlights');
                //     this.highlight_clear_card( updateData.index );
                //     break;
                // }

                /*======================================*/
                /*======================================*/

                // case 'updateClearHighlights':
                // {
                //     console.log('==> updateClearHighlights');
                //     this.highlight_clear_all();
                //     break;
                // }

                /*======================================
                    ANCHOR: HANDLER - CARD CHOOSING
                ========================================*/

                // case 'updateCardChoose':
                // {
                //     console.log('==> updateCardChoose');
                //     // set game state if 'end guessing' or an incorrect card is chosen (black/neutreul/other team)
                //     this.set_game_state( updateData.state );
                //     break;
                // }

                default:
            }
        };

        /*======================================
            ANCHOR: WINDOW LISTENER 
        ========================================*/

        // this.set_app_dimensions();
        let debounceResize = this.debounce( this.set_app_dimensions, C.onst.debounceDelay, false );
        window.addEventListener( 'resize', debounceResize );
    }

    /*======================================
        ANCHOR: COMPONENT ACTIONS - continued
    ========================================*/

    componentWillUnmount() {
        let debounceResize = this.debounce( this.set_app_dimensions, C.onst.debounceDelay, false );
        window.removeEventListener( 'resize', debounceResize );
    }

    /*======================================*/
    /*======================================*/

    render()
    {
        /*======================================
            ANCHOR: RENDER FUNCTIONS - Dev Tools
        ========================================*/
        let countLog = 0;
        const on_dev_state = ( state ) => { this.set_game_state( state ); }
        const on_dev_log = () => {
            const fakeLog = [
                { player: {team: 'red', name: 'Chilled'}, itemType: 'clue', clue: 'Food' },
                { player: {team: 'blue', name: 'Platy'}, itemType: 'choose', cardText: 'Tower' },
                { player: {team: 'red', name: 'Tom Fawkes'}, itemType: 'choose', cardText: 'Spring' },
                { player: {team: 'blue', name: 'Courtilly'}, itemType: 'choose', cardText: 'Soldier' },
                { player: {team: 'red', name: 'Junk'}, itemType: 'end' },
                { player: {team: 'red', name: 'Raven'}, itemType: 'choose', cardText: 'Cheque' },
                { player: {team: 'red', name: 'Kara'}, itemType: 'choose', cardText: 'Sorting' },
                { player: {team: 'blue', name: 'Chibi'}, itemType: 'choose', cardText: 'Dragons' },
                { player: {team: 'red', name: 'Cheesy'}, itemType: 'choose', cardText: 'I Want The Pipe' },
                { player: {team: 'blue', name: 'Silver'}, itemType: 'choose', cardText: 'Baraka' },
                { player: {team: 'red', name: 'Kat'}, itemType: 'choose', cardText: 'Cow' },
                { player: {team: 'red', name: 'Jeremy'}, itemType: 'choose', cardText: 'Purple' },
                { player: {team: 'blue', name: 'Alfredo'}, itemType: 'end' },
                { player: {team: 'red', name: 'Jackie'}, itemType: 'choose', cardText: 'Nachos' },
                { player: {team: 'red', name: 'Fooya'}, itemType: 'choose', cardText: 'Zepplin' },
                { player: {team: 'blue', name: 'Knovis'}, itemType: 'choose', cardText: 'Plain' },
                { player: {team: 'blue', name: 'Speedy'}, itemType: 'choose', cardText: 'Mucho' },
                { player: {team: 'blue', name: 'SideArms'}, itemType: 'choose', cardText: 'Taco' },
                { player: {team: 'red', name: 'ZeRoyalViking'}, itemType: 'choose', cardText: 'Salad' },
                { player: {team: 'red', name: 'Tay'}, itemType: 'victory' },
            ];
            this.log_set( fakeLog );
        }
        const on_dev_input = e => { if (e.keyCode === 13) { this.set_current_player__name( e.target.value ); } }
        const dev_list_players = ( arr ) => {
            let str = '';
            for ( let i = 0; i < arr.length; i++ )
            {
                str += arr[i].name;
                if( arr[i].isHost )
                {
                    str += '[host]';
                }
                str += ', ';

            }
            return str;
        }

        /*======================================
            ANCHOR: COMPONENTS
        ========================================*/

        return (
            <main className={
                    'codenames'
                    + ' ' + this.state.gameState
                    + ' ' + this.state.currentPlayer.position
                }
                style={{
                    width: this.state.appWidth + 'px',
                    height: this.state.appHeight + 'px'
                }}
            >
                <div className='bg-color'></div>
                <div className='bg-texture'></div>

                <div className='app-container'>

                    <Header
                        currentPlayer ={this.state.currentPlayer}
                        players       ={this.state.players}
                        playersTotal  ={this.state.playersTotal}
                    />

                    <GameMessage
                        currentPlayer ={this.state.currentPlayer}
                        gameState     ={this.state.gameState}
                        message       ={this.state.message}
                    />

                    <GameMenu
                        isHost      ={this.state.currentPlayer.isHost}
                        gameState   ={this.state.gameState}
                        // menu_action ={this.menu_action}
                    />

                    <div className='game-container'>
                        <div className='sidebar-container sidebar-left'>
                            <TeamCard
                                currentPlayer                ={this.state.currentPlayer}
                                team                         ={C.onst.red}
                                teamData                     ={this.state.teamRed}
                                players                      ={this.state.players}
                                gameState                    ={this.state.gameState}
                                set_current_player__team     ={this.set_current_player__team}
                                set_current_player__position ={this.set_current_player__position}
                            />
                        </div>
                        <div className='board-container'>
                            <GameBoard
                                cards          ={this.state.cards}
                                cardSize       ={this.state.cardSize}
                                currentPlayer  ={this.state.currentPlayer}
                                gameState      ={this.state.gameState}
                                players        ={this.state.players}
                                card_highlight ={this.card_highlight}
                                card_choose    ={this.card_choose}
                                debounce       ={this.debounce}
                            />
                            <GameInputs
                                teamRed       ={this.state.teamRed}
                                teamBlue      ={this.state.teamBlue}
                                currentPlayer ={this.state.currentPlayer}
                                gameState     ={this.state.gameState}
                                guesses       ={this.state.guesses}
                                clue          ={this.state.clue}
                                clue_give     ={this.clue_give}
                            />
                        </div>
                        <div className='sidebar-container sidebar-right'>
                            <TeamCard
                                currentPlayer                ={this.state.currentPlayer}
                                team                         ={C.onst.blue}
                                teamData                     ={this.state.teamBlue}
                                players                      ={this.state.players}
                                gameState                    ={this.state.gameState}
                                set_current_player__team     ={this.set_current_player__team}
                                set_current_player__position ={this.set_current_player__position}
                                set_team__cards              ={this.set_team__cards}
                                set_team__guesses            ={this.set_team__guesses}
                            />
                            <GameLog
                                gameLog={this.state.gameLog}
                            />
                        </div>
                    </div>


                    <div id='dev-tools'>
                        <div>
                            <ul>
                                <li>
                                    <span>Players: </span>{dev_list_players(this.state.players)}
                                </li>
                                <li><span>Current Player: </span></li>
                                <li><span>ID: </span>{ this.state.currentPlayer.id}</li>
                                <li><span>Name: </span> {this.state.currentPlayer.name}</li>
                                <li><span>Team: </span>{ this.state.currentPlayer.team}</li>
                                <li><span>Posit: </span> {this.state.currentPlayer.position}</li>
                                <li><span>Game State: </span> {this.state.gameState}</li>
                                <li><span>Host: </span> {this.state.currentPlayer.isHost.toString()}</li>
                            </ul>
                        </div>
                        <div>
                            <Button btnFunction={on_dev_log} btnText={'Log'} />
                            <input
                                type='text'
                                className='name-input'
                                placeholder='Name'
                                defaultValue=''
                                onKeyDown={on_dev_input} />
                            <Button btnClasses={'button-green'} btnFunction={on_dev_state} btnText={'Setup'} btnValue={'setup'} />
                            <Button btnClasses={'button-red'} btnFunction={on_dev_state} btnText={'RedSpy'} btnValue={'red-spymaster'} />
                            <Button btnClasses={'button-red'} btnFunction={on_dev_state} btnText={'RedOp'} btnValue={'red-operatives'} />
                            <Button btnClasses={'button-blue'} btnFunction={on_dev_state} btnText={'BlueSpy'} btnValue={'blue-spymaster'} />
                            <Button btnClasses={'button-blue'} btnFunction={on_dev_state} btnText={'BlueOp'} btnValue={'blue-operatives'} />
                            <Button btnClasses={'button-green'} btnFunction={on_dev_state} btnText={'End'} btnValue={'end'} />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}
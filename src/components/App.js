import React, { Component } from 'react';
import Button from './Button/Button.js';
import GameLog from './GameLog/GameLog.js';
import GameMenu from './GameMenu/GameMenu.js';
import TeamCard from './TeamCard/TeamCard.js';
import GameCard from './GameCard/GameCard.js';
import GameInputs from './GameInputs/GameInputs.js';
import GameHeader from './GameHeader/GameHeader.js';
import GameMessage from './GameMessage/GameMessage.js';
import * as C from '../constants.js'
import './App.scss';

/*================================================
    ANCHOR: HELPER FUNCTIONS
==================================================*/

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

/*======================================*/
/*======================================*/

const random_ID = () =>
{
    let randomID = '';
    let characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 10; i++)
    {
        randomID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomID;
}

/*======================================*/
/*======================================*/

export default class App extends Component
{

    /*================================================
        ANCHOR: STATE
    ==================================================*/

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
            // Teams
            teamRed: {
                remainingCards: 0,
                remainingGuesses: 0,
            },
            teamBlue: {
                remainingCards: 0,
                remainingGuesses: 0,
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
            // Sizing
            appWidth: window.innerWidth,
            appHeight: window.innerHeight,
            cardSize: 0,
            viewScale: 1,
        };
        
        /*================================================
            ANCHOR: METHOD BINDING
        ==================================================*/

        // State methods - Connection
        this.socket = new WebSocket( 'ws://localhost:3001' );

        // State methods - Game states
        this.set_game_state = this.set_game_state.bind(this);
        this.set_round      = this.set_round.bind(this);
        this.set_cards      = this.set_cards.bind(this);
        this.set_players    = this.set_players.bind(this);
        this.set_clue       = this.set_clue.bind(this);
        this.set_message    = this.set_message.bind(this);
        this.set_log        = this.set_log.bind(this);

        // State methods - Teams
        this.set_team_remaining_cards   = this.set_team_remaining_cards.bind(this);
        this.set_team_remaining_guesses = this.set_team_remaining_guesses.bind(this);

        // State methods - Players
        this.player_add    = this.player_add.bind(this);
        this.player_remove = this.player_remove.bind(this);

        // State methods - Player Info
        this.set_player_ID       = this.set_player_ID.bind(this);
        this.set_player_name     = this.set_player_name.bind(this);
        this.set_player_team     = this.set_player_team.bind(this);
        this.set_player_position = this.set_player_position.bind(this);
        this.set_player_isHost   = this.set_player_isHost.bind(this);
        this.get_card_highlights = this.get_card_highlights.bind(this);

        // State methods - Highlighting
        this.highlight_add        = this.highlight_add.bind(this);
        this.highlight_remove     = this.highlight_remove.bind(this);
        this.highlight_clear_card = this.highlight_clear_card.bind(this);
        this.highlight_clear_all  = this.highlight_clear_all.bind(this);

        // State methods - Game Log
        this.log_add_item = this.log_add_item.bind(this);
        this.log_clear    = this.log_clear.bind(this);

        // WS Methods - Player Info
        this.send_player_name     = this.send_player_name.bind(this);
        this.send_player_team     = this.send_player_team.bind(this);
        this.send_player_position = this.send_player_position.bind(this);

        // WS Methods - Player Interactions
        this.send_clue      = this.send_clue.bind(this);
        this.send_card      = this.send_card.bind(this);
        this.send_highlight = this.send_highlight.bind(this);

        // Interaction Methods
        this.team_select = this.team_select.bind(this);

        // Functional methods - General
        this.debounce             = this.debounce.bind(this);
        this.enable_interactions  = this.enable_interactions.bind(this);
        this.disable_interactions = this.disable_interactions.bind(this);

        // Functional methods - Sizing
        this.set_app_dimensions = this.set_app_dimensions.bind(this);
        // this.set_card_size      = this.set_card_size.bind(this);
        // this.set_view_scale     = this.set_view_scale.bind(this);

        // Functional methods - Cookies
        this.set_cookie = this.set_cookie.bind(this);
        this.get_cookie = this.get_cookie.bind(this);
    }

    /*================================================
        ANCHOR: STATE METHODS - Game States
    ==================================================*/

    set_game_state ( state )
    {
        this.setState({ gameState: state });
        // NOTE: disable/enable interactions
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

    /*================================================
        ANCHOR: STATE METHODS - Team Info
    ==================================================*/

    set_team_remaining_cards ( team, amount )
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

    set_team_remaining_guesses ( team, amount )
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

    /*================================================
        ANCHOR: STATE METHODS - Players
    ==================================================*/

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

    /*================================================
        ANCHOR: STATE METHODS - Player Info
    ==================================================*/

    // > This function is ONLY for the current player
    set_player_ID ( playerID )
    {
        this.setState(prevState => {
            let currentPlayer = { ...prevState.currentPlayer };
            currentPlayer.id = playerID;
            return { currentPlayer };
        });
    }

    /*======================================*/
    /*======================================*/

    set_player_name ( player, newName )
    {
        if ( player.id === this.state.currentPlayer.id )
        {
            // > Current player
            this.setState(prevState => {
                let currentPlayer = { ...prevState.currentPlayer };
                currentPlayer.name = newName;
                return { currentPlayer };
            });
        }
        else
        {
            // > Other player
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
    }

    /*======================================*/
    /*======================================*/

    set_player_team ( player, newTeam )
    {
        if ( player.id === this.state.currentPlayer.id )
        {
            // > Current player
            this.setState(prevState => {
                let currentPlayer = { ...prevState.currentPlayer };
                currentPlayer.team = newTeam;
                return { currentPlayer };
            });
        }
        else
        {
            // > Other player
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
    }

    /*======================================*/
    /*======================================*/

    set_player_position ( player, newPosition )
    {
        if ( player.id === this.state.currentPlayer.id )
        {
            // > Current player
            this.setState( prevState => {
                let currentPlayer = { ...prevState.currentPlayer };
                currentPlayer.position = newPosition;
                return { currentPlayer };
            });
        }
        else
        {
            // > Other player
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
    }

    /*======================================*/
    /*======================================*/

    set_player_isHost ( player )
    {
        console.log('===> set_player_isHost');
        if ( player.id === this.state.currentPlayer.id )
        {
            // > Current player
            // > Set current player to host
            this.setState( prevState => {
                let currentPlayer = { ...prevState.currentPlayer };
                currentPlayer.isHost = true;
                return { currentPlayer };
            });
            // > Remove host from other players
            this.setState( prevState => {
                let players = prevState.players;
                for ( let i = 0; i < players.length; i++ )
                {
                    players[i].isHost = false;
                }
                return { players };
            });
        }
        else
        {
            // > Other player
            // > Remove current player as host
            this.setState( prevState => {
                let currentPlayer = { ...prevState.currentPlayer };
                currentPlayer.isHost = false;
                return { currentPlayer };
            });
            // > Remove host from other players and set specified player as host
            this.setState( prevState => {
                let players = prevState.players;
                for ( let i = 0; i < players.length; i++ )
                {
                    if ( players[i].id === player.id )
                    { players[i].isHost = true; }
                    else
                    { players[i].isHost = false; }
                }
                return { players };
            });
        }
        console.log('===> END - set_player_isHost');
    }

    /*======================================*/
    /*======================================*/

    get_card_highlights ( cardIndex )
    {
        // > Current Player
        let highlights = [];
        if
        (
            !( this.state.currentPlayer.highlights === undefined )
            &&
            ( this.state.currentPlayer.highlights.length )
            &&
            ( this.state.currentPlayer.highlights.includes( cardIndex ) )
        )
        {
            highlights.push(
                {
                    name: this.state.currentPlayer.name,
                    team: this.state.currentPlayer.team
                }
            );
        }
        // > Other Players
        if ( !( this.state.players === undefined ) && ( this.state.players.length ) ) 
        {
            for ( let j = 0; j < this.state.players.length; j++ )
            {
                if ( this.state.players[j].highlights.includes( cardIndex ) )
                {
                        highlights.push(
                        {
                            name: this.state.players[j].name,
                            team: this.state.players[j].team
                        }
                    );
                }
            }
        }
        return highlights;
    }

    /*================================================
        ANCHOR: STATE METHODS - Highlighting
    ==================================================*/

    highlight_add ( player, cardIndex )
    {
        if ( player.id === this.state.currentPlayer.id )
        {
            // Current player - State
            this.setState( prevState => {
                let currentPlayer = { ...prevState.currentPlayer };
                currentPlayer.highlights.push( cardIndex );
                return { currentPlayer };
            });
        }
        else
        {
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
    }

    /*======================================*/
    /*======================================*/

    highlight_remove ( player, cardIndex )
    {
        if ( player.id === this.state.currentPlayer.id )
        {
            // Current player - State
            this.setState( prevState => {
                let currentPlayer = { ...prevState.currentPlayer };
                currentPlayer.highlights = currentPlayer.highlights.filter(
                    highlightItem => ( highlightItem !== cardIndex )
                );
                return { currentPlayer };
            });
        }
        else
        {
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
    }

    /*======================================*/
    /*======================================*/

    // TODO: ==> highlight_clear_card
    highlight_clear_card ( cardIndex )
    {
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

    // TODO: ==> highlight_clear_all
    highlight_clear_all ()
    {
        // this.setState({ highlights: [] });
    }

    /*================================================
        ANCHOR: STATE METHODS - Game Log
    ==================================================*/

    set_log( logArray )
    {
        console.log('===> set_log');
        this.setState({ gameLog: logArray });
        console.log('===> END - set_log');
    }

    /*======================================*/
    /*======================================*/

    log_add_item ( logItem )
    {
        console.log('===> log_add_item');
        // State
        this.setState( prevState => ({
            gameLog: [ ...prevState.gameLog, logItem]
        }));
        // WS
        // let newUpdate = {
        //     type: 'updateAddLogItem',
        //     index: logItem,
        // };
        // this.socket.send( JSON.stringify( newUpdate ));
        // console.log('>>>>>>>>> Message Sent - updateAddLogItem >>>>>>>>>');
        console.log('===> END - log_add_item');
    }

    /*======================================*/
    /*======================================*/

    log_clear ()
    {
        console.log('===> log_clear');
        this.setState({ gameLog: [] });
        console.log('===> END - log_clear');
    }

    /*================================================
        ANCHOR: WS METHODS - Player Info
    ==================================================*/

    // TODO: ==> send_player_name
    send_player_name ( newName )
    {
        console.log('===> send_player_name');
        let newUpdate = {
            type: 'updatePlayerName',
            player: this.state.currentPlayer,
            newName: newName,
        };
        this.socket.send( JSON.stringify( newUpdate ));
        console.log('>>>>>>>>> Message Sent - updatePlayerName >>>>>>>>>');
        console.log('===> END - send_player_name');
    }

    /*======================================*/
    /*======================================*/

    // TODO: ==> send_player_team
    send_player_team ( newTeam )
    {
        console.log('===> send_player_team');
        let newUpdate = {
            type: 'updatePlayerTeam',
            player: this.state.currentPlayer,
            newTeam: newTeam,
        };
        this.socket.send( JSON.stringify( newUpdate ));
        console.log('>>>>>>>>> Message Sent - updatePlayerTeam >>>>>>>>>');
        console.log('===> END - send_player_team');
    }

    /*======================================*/
    /*======================================*/

    // TODO: ==> send_player_position
    send_player_position ( newPosition )
    {
        console.log('===> send_player_position');
        let newUpdate = {
            type: 'updatePlayerPosition',
            player: this.state.currentPlayer,
            newPosition: newPosition,
        };
        this.socket.send( JSON.stringify( newUpdate ));
        console.log('>>>>>>>>> Message Sent - updatePlayerPosition >>>>>>>>>');
        console.log('===> END - send_player_position');
    }

    /*================================================
        ANCHOR: WS METHODS - Player Interactions
    ==================================================*/

    // TODO: ==> send_clue
    send_clue ( clue )
    {
        // ==> update game log
        // ==> 
        // ==> 
        // ==> send

        // let newUpdate = {
        //     type: 'updateCardChoose',
        //     player: {},
        //     clue: clue,
        // };
        // this.socket.send( JSON.stringify( newUpdate ));
    }

    /*======================================*/
    /*======================================*/

    // TODO: ==> send_card
    send_card ( cardIndex )
    { 
        // use currentPlayer --> updates from server will arrive as different commands, they will not use send_card here
        // ==> update game log
        // ==> clear card highlights
        // ==> send request to server
        // ==> begin animation on recieving response from ws server
        // ==> after animation --> change round || continue round
        // ==> if round change, clear all card highlights
    }

    /*======================================*/
    /*======================================*/

    // TODO: ==> send_highlight
    send_highlight ( cardIndex )
    {
        if ( !( this.state.currentPlayer.highlights.includes( cardIndex ) ) )
        {
            this.highlight_add( this.state.currentPlayer, cardIndex );
            let newUpdate = {
                type: 'updateAddHighlight',
                player: this.state.currentPlayer,
                index: cardIndex,
            };
            this.socket.send( JSON.stringify( newUpdate ));
            console.log('>>>>>>>>> Message Sent - updateAddHighlight >>>>>>>>>');
        }
        else
        {
            this.highlight_remove( this.state.currentPlayer, cardIndex );
            let newUpdate = {
                type: 'updateRemoveHighlight',
                player: this.state.currentPlayer,
                index: cardIndex,
            };
            this.socket.send( JSON.stringify( newUpdate ));
            console.log('>>>>>>>>> Message Sent - updateRemoveHighlight >>>>>>>>>');
        }
    }

    /*================================================
        ANCHOR: INTERACTION METHODS
    ==================================================*/

    team_select ( positionButton, colorCardTeam )
    {
        let player = this.state.currentPlayer;
        let colorPlayerTeam = this.state.currentPlayer.team;
        let positionPlayer  = this.state.currentPlayer.position;

        const isOnTeam          = colorPlayerTeam;
        const isTeamCardRed     = ( colorCardTeam === C.onst.red );
        const isTeamCardBlue    = ( colorCardTeam === C.onst.blue );
        const isSameTeam        = ( colorCardTeam === colorPlayerTeam );
        const isPlayerOperative = ( positionPlayer === C.onst.operative );
        const isPlayerSpymaster = ( positionPlayer === C.onst.spymaster );
        const isButtonOperative = ( positionButton === C.onst.operative );
        const isButtonSpymaster = ( positionButton === C.onst.spymaster );

        // > Player does not have a team
        if ( !isOnTeam && isTeamCardRed && isButtonOperative )
        { this.set_player_team( player, colorCardTeam ); this.set_player_position( player, positionButton ); }
        if ( !isOnTeam && isTeamCardRed && isButtonSpymaster )
        { this.set_player_team( player, colorCardTeam ); this.set_player_position( player, positionButton ); }
        if ( !isOnTeam && isTeamCardBlue && isButtonOperative )
        { this.set_player_team( player, colorCardTeam ); this.set_player_position( player, positionButton ); }
        if ( !isOnTeam && isTeamCardBlue && isButtonSpymaster )
        { this.set_player_team( player, colorCardTeam ); this.set_player_position( player, positionButton ); }

        // > Player is already on a team
        if ( isOnTeam && isTeamCardRed && isSameTeam && isPlayerOperative && isButtonSpymaster )
        { this.set_player_position( player, positionButton ); }
        if ( isOnTeam && isTeamCardRed && isSameTeam && isPlayerSpymaster && isButtonOperative )
        { this.set_player_position( player, positionButton ); }
        if ( isOnTeam && isTeamCardRed && !isSameTeam && isPlayerOperative && isButtonOperative )
        { this.set_player_team( player, colorCardTeam ); }
        if ( isOnTeam && isTeamCardRed && !isSameTeam && isPlayerOperative && isButtonSpymaster )
        { this.set_player_team( player, colorCardTeam ); this.set_player_position( player, positionButton ); }
        if ( isOnTeam && isTeamCardRed && !isSameTeam && isPlayerSpymaster && isButtonOperative )
        { this.set_player_team( player, colorCardTeam ); this.set_player_position( player, positionButton ); }
        if ( isOnTeam && isTeamCardRed && !isSameTeam && isPlayerSpymaster && isButtonSpymaster )
        { this.set_player_team( player, colorCardTeam ); }
        if ( isOnTeam && isTeamCardBlue && isSameTeam && isPlayerOperative && isButtonSpymaster )
        { this.set_player_position( player, positionButton ); }
        if ( isOnTeam && isTeamCardBlue && isSameTeam && isPlayerSpymaster && isButtonOperative )
        { this.set_player_position( player, positionButton ); }
        if ( isOnTeam && isTeamCardBlue && !isSameTeam && isPlayerOperative && isButtonOperative )
        { this.set_player_team( player, colorCardTeam ); }
        if ( isOnTeam && isTeamCardBlue && !isSameTeam && isPlayerOperative && isButtonSpymaster )
        { this.set_player_team( player, colorCardTeam ); this.set_player_position( player, positionButton ); }
        if ( isOnTeam && isTeamCardBlue && !isSameTeam && isPlayerSpymaster && isButtonOperative )
        { this.set_player_team( player, colorCardTeam ); this.set_player_position( player, positionButton ); }
        if ( isOnTeam && isTeamCardBlue && !isSameTeam && isPlayerSpymaster && isButtonSpymaster )
        { this.set_player_team( player, colorCardTeam ); }
    }

    /*================================================
        ANCHOR: FUNCTIONAL METHODS - General
    ==================================================*/

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

    // TODO: ==> enable_interactions
    enable_interactions ()
    {
        
    }

    /*======================================*/
    /*======================================*/

    // TODO: ==> disable_interactions
    disable_interactions ()
    {
        
    }

    /*================================================
        ANCHOR: FUNCTIONAL METHODS - Sizing
    ==================================================*/

    // TODO: ==> set_app_dimensions
    set_app_dimensions ()
    {
        this.setState({ appWidth: window.innerWidth });
        this.setState({ appHeight: window.innerHeight });
        let scaler = ( window.innerHeight / C.onst.appHeight )
        this.setState({ viewScale: scaler });
    }

    /*================================================
        ANCHOR: FUNCTIONAL METHODS - Cookies
    ==================================================*/

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

    /*================================================
        ANCHOR: COMPONENT ACTIONS - Mount
    ==================================================*/

    componentDidMount()
    {
        // Initial sizing
        this.set_app_dimensions();

        // TODO: Cookies
        // Get current playerID (and maybe name/team/color) from cookies
        // If ID is not present, auth page has failed to store cookie

        // let playerID = this.get_cookie('player-id');
        // this.set_player_ID( playerID );


        /*================================================
            ANCHOR: WEBSOCKET COMMUNICATION
        ==================================================*/

        const ws = this.socket;

        ws.onopen = function ( e )
        {
            console.log('>>>>>>>>> WebSocket Client Connected >>>>>>>>>');
        };

        ws.onmessage = ( messageData ) =>
        {
            console.log('>>>>>>>>> Message Recieved >>>>>>>>>');
            let updateData = JSON.parse( messageData.data );
            console.log('> ', updateData.type);

            /*================================================
                HANDLERS
            ==================================================*/

            switch( updateData.type )
            {

                /*================================================
                    ANCHOR: HANDLER - PLAYER CONNECTIONS
                ==================================================*/

                case 'clientConnected':
                {
                    // This handler is only fired ONCE when the CURRENT player joins
                    // console.log('======= HANDLER - clientConnected =======');

                    // Set cards
                    if ( !( updateData.cards === undefined ) && ( updateData.cards.length ) )
                    { this.set_cards( updateData.cards ); }
    
                    // Set players
                    if ( !( updateData.players === undefined ) && ( updateData.players.length ) )
                    { this.set_players( updateData.players ); }
                    
                    // Set log
                    if ( !( updateData.gameLog === undefined ) && ( updateData.gameLog.length ) )
                    { this.set_log( updateData.gameLog ); }

                    // Send current player information to server
                    let newUpdate = {
                        type: 'userConnected',
                        player: this.state.currentPlayer,
                    };
                    ws.send( JSON.stringify( newUpdate ) );
                    console.log('>>>>>>>>> Message Sent - userConnected >>>>>>>>>');
                    // console.log('======= END - HANDLER - clientConnected =======');
                    break;
                }

                /*======================================*/
                /*======================================*/

                case 'userConnected':
                {
                    // This handler is only fired when OTHER players join
                    // console.log('======= HANDLER - userConnected =======');
                    this.player_add( updateData.player );
                    // console.log('======= END - HANDLER - userConnected =======');
                    break;
                }

                /*======================================*/
                /*======================================*/

                case 'clientDisconnected':
                {
                    // This handler is only fired when OTHER players leave
                    console.log('======= HANDLER - clientDisconnected =======');
                    this.player_remove( updateData.playerID );
                    console.log('======= END - HANDLER - clientDisconnected =======');
                    break;
                }

                /*================================================
                    ANCHOR: HANDLER - PLAYERS INFO
                ==================================================*/

                case 'updatePlayerName':
                {
                    console.log('======= HANDLER - updatePlayerName =======');
                    this.set_player_name( updateData.player, updateData.newName );
                    console.log('======= END - HANDLER - updatePlayerName =======');
                    break;
                }

                /*======================================*/
                /*======================================*/

                case 'updatePlayerTeam':
                {
                    console.log('======= HANDLER - updatePlayerTeam =======');
                    this.set_player_team( updateData.player, updateData.newTeam );
                    console.log('======= END - HANDLER - updatePlayerTeam =======');
                    break;
                }

                /*======================================*/
                /*======================================*/

                case 'updatePlayerPosition':
                {
                    console.log('======= HANDLER - updatePlayerPosition =======');
                    this.set_player_position( updateData.player, updateData.newPosition );
                    console.log('======= END - HANDLER - updatePlayerPosition =======');
                    break;
                }

                /*======================================*/
                /*======================================*/

                case 'updatePlayerIsHost':
                {
                    console.log('======= HANDLER - updatePlayerIsHost =======');
                    this.set_player_isHost( updateData.player );
                    console.log('======= END - HANDLER - updatePlayerIsHost =======');
                    break;
                }

                /*================================================
                    ANCHOR: HANDLER - HIGHLIGHTS
                ==================================================*/

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

                /*================================================
                    ANCHOR: HANDLER - CARD CHOOSING
                ==================================================*/

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

        /*================================================
            ANCHOR: WINDOW LISTENER 
        ==================================================*/

        // this.set_app_dimensions();
        let debounceResize = this.debounce( this.set_app_dimensions, C.onst.debounceDelay, false );
        window.addEventListener( 'resize', debounceResize );
    }

    /*================================================
        ANCHOR: COMPONENT ACTIONS - Unmount
    ==================================================*/

    componentWillUnmount() {
        let debounceResize = this.debounce( this.set_app_dimensions, C.onst.debounceDelay, false );
        window.removeEventListener( 'resize', debounceResize );
    }

    /*======================================*/
    /*======================================*/

    render()
    {

        /*================================================
            ANCHOR: RENDER FUNCTIONS - Displaying
        ==================================================*/

        const display_cards = () =>
        {
            if ( !( this.state.cards.length === undefined ) && ( this.state.cards.length ) )
            {
                let cardArray  = [];
                let positionData = {};
                let columns = {
                    twoo:  [ 1, 6,11,16,21],
                    thre:  [ 2, 7,12,17,22],
                    four:  [ 3, 8,13,18,23],
                    five:  [ 4, 9,14,19,24],
                };
                
                for ( let i = 0; i < this.state.cards.length; i++ )
                {
                    // > Positioning
                    positionData = {
                        top: C.onst.cardTopBase,
                        left: C.onst.cardLeftBase,
                    };
                    if ( (  5 <= i ) && ( i <=  9 ) ) { positionData.top += ( ( C.onst.cardHeight ) * 1 ); }
                    if ( ( 10 <= i ) && ( i <= 14 ) ) { positionData.top += ( ( C.onst.cardHeight ) * 2 ); }
                    if ( ( 15 <= i ) && ( i <= 19 ) ) { positionData.top += ( ( C.onst.cardHeight ) * 3 ); }
                    if ( ( 20 <= i ) && ( i <= 24 ) ) { positionData.top += ( ( C.onst.cardHeight ) * 4 ); }
                    if ( columns.twoo.includes(i) ) { positionData.left += ( ( C.onst.cardWidth ) * 1 ); }
                    if ( columns.thre.includes(i) ) { positionData.left += ( ( C.onst.cardWidth ) * 2 ); }
                    if ( columns.four.includes(i) ) { positionData.left += ( ( C.onst.cardWidth ) * 3 ); }
                    if ( columns.five.includes(i) ) { positionData.left += ( ( C.onst.cardWidth ) * 4 ); }

                    // > Get list of highlighting players
                    let highlights = this.get_card_highlights( this.state.cards[i].index );
                    if ( !( highlights === undefined ) && ( highlights.length ) )
                    { console.log('==> display_cards > highlights: ', highlights); }

                    cardArray.push(
                        <GameCard
                            key={i}
                            highlights     ={highlights}
                            positionData   ={positionData}
                            currentPlayer  ={this.state.currentPlayer}
                            card           ={this.state.cards[i]}
                            send_card      ={this.send_card}
                            send_highlight ={this.send_highlight}
                        />
                    );
                }
                return cardArray;
            }
        }

        /*================================================
            ANCHOR: RENDER FUNCTIONS - Dev Tools
        ==================================================*/

        const on_dev_state = ( state ) => { this.set_game_state( state ); }
        const on_dev_log = () => { this.set_log( C.onst.fakeLog ); }
        const on_dev_name = e => { if (e.keyCode === 13) { this.set_player_name( this.state.currentPlayer, e.target.value ); } }
        const dev_list_players = () => {
            let str = '';
            for ( let i = 0; i < this.state.players.length; i++ )
            {str += this.state.players[i].name; if( this.state.players[i].isHost ) { str += '[host]'; } str += ', ';}
            return str;
        }
        const dev_list_highlights = () => {
            let str = '';
            for ( let i = 0; i < this.state.currentPlayer.highlights.length; i++ )
            {str += this.state.currentPlayer.highlights[i]; str += ', '; }
            return str;
        }
        

        /*================================================
            ANCHOR: COMPONENTS
        ==================================================*/

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
                <div className='bg-texture-layer'>
                    <div className='scaler'
                        style={{transform: 'scale(' + this.state.viewScale + ')'}}
                    >
                        <div className='container-app'>

                            <GameMenu
                                // menu_action ={this.menu_action}
                                gameState   ={this.state.gameState}
                                isHost      ={this.state.currentPlayer.isHost}
                            />

                            <div className='container-header'>
                                <GameHeader
                                    players       ={this.state.players}
                                    playersTotal  ={this.state.playersTotal}
                                    currentPlayer ={this.state.currentPlayer}
                                />

                                <GameMessage
                                    message       ={this.state.message}
                                    gameState     ={this.state.gameState}
                                    currentPlayer ={this.state.currentPlayer}
                                />
                            </div>

                            <div className='container-sidebar sidebar-left'>
                                <TeamCard
                                    team          ={C.onst.red}
                                    team_select   ={this.team_select}
                                    teamData      ={this.state.teamRed}
                                    players       ={this.state.players}
                                    gameState     ={this.state.gameState}
                                    currentPlayer ={this.state.currentPlayer}
                                />
                            </div>    
                                                    
                            <div className='container-board'>
                                {display_cards()}
                                <GameInputs
                                    send_clue     ={this.send_clue}
                                    clue          ={this.state.clue}
                                    guesses       ={this.state.guesses}
                                    teamRed       ={this.state.teamRed}
                                    teamBlue      ={this.state.teamBlue}
                                    gameState     ={this.state.gameState}
                                    currentPlayer ={this.state.currentPlayer}
                                />
                            </div>

                            <div className='container-sidebar sidebar-right'>
                                <TeamCard
                                    team          ={C.onst.blue}
                                    team_select   ={this.team_select}
                                    teamData      ={this.state.teamBlue}
                                    players       ={this.state.players}
                                    gameState     ={this.state.gameState}
                                    currentPlayer ={this.state.currentPlayer}
                                />
                                <GameLog
                                    gameLog   ={this.state.gameLog}
                                    gameState ={this.state.gameState}
                                />
                            </div>

                            <div className='dev-tools left'>
                                <ul>
                                    <li><span>Game State: </span> {this.state.gameState}</li>
                                    <li><span>Players: </span>{dev_list_players()}</li>
                                    <li><span>Current Player: </span></li>
                                    <li><span>ID: </span>{ this.state.currentPlayer.id}</li>
                                    <li><span>Name: </span> {this.state.currentPlayer.name}</li>
                                    <li><span>Team: </span>{ this.state.currentPlayer.team}</li>
                                    <li><span>Position: </span> {this.state.currentPlayer.position}</li>
                                    <li><span>Highlights: </span> {dev_list_highlights()}</li>
                                    <li><span>Host: </span> {this.state.currentPlayer.isHost.toString()}</li>
                                </ul>
                            </div>
                            <div className='dev-tools right'>
                                <Button btnFunction={on_dev_log} btnText={'Log'} />
                                <input
                                    type='text'
                                    className='name-input'
                                    placeholder='Name'
                                    defaultValue=''
                                    onKeyDown={on_dev_name} />
                                <Button btnClasses={'button-green'} btnFunction={on_dev_state} btnText={'Setup'} btnValue={'setup'} />
                                <Button btnClasses={'button-red'} btnFunction={on_dev_state} btnText={'RedSpy'} btnValue={'red-spymaster'} />
                                <Button btnClasses={'button-red'} btnFunction={on_dev_state} btnText={'RedOp'} btnValue={'red-operatives'} />
                                <Button btnClasses={'button-blue'} btnFunction={on_dev_state} btnText={'BlueSpy'} btnValue={'blue-spymaster'} />
                                <Button btnClasses={'button-blue'} btnFunction={on_dev_state} btnText={'BlueOp'} btnValue={'blue-operatives'} />
                                <Button btnClasses={'button-green'} btnFunction={on_dev_state} btnText={'End'} btnValue={'end'} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}
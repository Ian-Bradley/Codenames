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

export default class App extends Component
{

    /*======================================
        ANCHOR: STATE + FUNCTION BINDINGS 
    ========================================*/

    constructor(props)
    {
        super(props);
        this.state = {
            wsConnected: false,
            isHost: false,
            gameState: C.onst.gameState_setup,
            currentPlayer: {
                id: 0,
                name: random_name(),
                team: '',
                position: '',
                highlights: [],
            },
            players: [],
            playersTotal: 1,
            round: 0,
            cards: [],
            gameLog: [],
            teamRed: {
                cards: 0,
                guesses: 0,
            },
            teamBlue: {
                cards: 0,
                guesses: 0,
            },
            appWidth: window.innerWidth,
            appHeight: window.innerHeight,
        };
        
        // State methods
        this.set_wsConnection                     = this.set_wsConnection.bind(this);
        this.set_isHost                           = this.set_isHost.bind(this);

        this.set_current_player__ID               = this.set_current_player__ID.bind(this);
        this.set_current_player__name             = this.set_current_player__name.bind(this);
        this.set_current_player__team             = this.set_current_player__team.bind(this);
        this.set_current_player__position         = this.set_current_player__position.bind(this);
        this.set_current_player__add_highlight    = this.set_current_player__add_highlight.bind(this);
        this.set_current_player__remove_highlight = this.set_current_player__remove_highlight.bind(this);

        this.set_player__name                     = this.set_player__name.bind(this);
        this.set_player__team                     = this.set_player__team.bind(this);
        this.set_player__position                 = this.set_player__position.bind(this);
        this.set_player__add_highlight            = this.set_player__add_highlight.bind(this);
        this.set_player__remove_highlight         = this.set_player__remove_highlight.bind(this);

        this.add_player                           = this.add_player.bind(this);
        this.remove_player                        = this.remove_player.bind(this);

        this.clear_card_highlights                = this.clear_card_highlights.bind(this);
        this.clear_highlights                     = this.clear_highlights.bind(this);

        this.add_log_item                         = this.add_log_item.bind(this);
        this.clear_log                            = this.clear_log.bind(this);

        this.set_players_total                    = this.set_players_total.bind(this);
        this.set_round                            = this.set_round.bind(this);
        this.set_game_state                       = this.set_game_state.bind(this);
        this.set_cards                            = this.set_cards.bind(this);

        this.set_team__cards                      = this.set_team__cards.bind(this);
        this.set_team__guesses                    = this.set_team__guesses.bind(this);

        this.set_app_dimensions                   = this.set_app_dimensions.bind(this);
        // Functional methods
        this.debounce                             = this.debounce.bind(this);
        this.set_cookie                           = this.set_cookie.bind(this);
        this.get_cookie                           = this.get_cookie.bind(this);
        this.card_choose                          = this.card_choose.bind(this);
        this.give_clue                            = this.give_clue.bind(this);
        // this.disable_interactions                 = this.disable_interactions.bind(this);
        // this.enable_interactions                  = this.enable_interactions.bind(this);
        this.socket = new WebSocket( 'ws://localhost:3001' );
    }

    /*======================================
        ANCHOR: STATE METHODS
    ========================================*/

    // ANCHOR: set_wsConnection
    set_wsConnection ( state )
    {
        this.setState({ wsConnected: state });
    }

    /*======================================*/

    // ANCHOR: set_isHost
    set_isHost ( state )
    {
        this.setState({ isHost: state });
    }

    /*======================================*/

    // ANCHOR: set_current_player__ID
    set_current_player__ID ( ID )
    {
        this.setState(prevState => {
            let currentPlayer = { ...prevState.currentPlayer };
            currentPlayer.id = ID;
            return { currentPlayer };
        });
    }
    
    /*======================================*/
    
    // ANCHOR: set_current_player__name
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

    // ANCHOR: set_current_player__team
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

    // ANCHOR: set_current_player__position
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

    // ANCHOR: set_current_player__add_highlight
    set_current_player__add_highlight ( cardIndex )
    {
        // State
        this.setState( prevState => {
            let currentPlayer = { ...prevState.currentPlayer };
            currentPlayer.highlights.push( cardIndex );
            return { currentPlayer };
        });
        // WS
        let newUpdate = {
            messageType: 'updateAddHighlight',
            player: this.state.currentPlayer,
            index: cardIndex,
        };
        this.socket.send( JSON.stringify( newUpdate ));
    }

    /*======================================*/

    // ANCHOR: set_current_player__remove_highlight
    set_current_player__remove_highlight ( cardIndex )
    {
        // State
        this.setState( prevState => {
            let currentPlayer = { ...prevState.currentPlayer };
            currentPlayer.highlights = currentPlayer.highlights.filter(
                highlightItem => ( highlightItem !== cardIndex )
            );
            return { currentPlayer };
        });
        // WS
        let newUpdate = {
            messageType: 'updateRemoveHighlight',
            player: this.state.currentPlayer,
            index: cardIndex,
        };
        this.socket.send( JSON.stringify( newUpdate ));
    }

    /*======================================*/

    // ANCHOR: set_player__name
    set_player__name ( player, newName )
    {
        this.setState( prevState => {
            let players = prevState.players;
            for ( let i = 0; i < players.length; i++ )
            {
                if ( players[i].name === player.name )
                {
                    players[i].name = newName;
                }
            }
            return { players };
        });
    }

    /*======================================*/

    // ANCHOR: set_player__team
    set_player__team ( player, newTeam )
    {
        this.setState( prevState => {
            let players = prevState.players;
            for ( let i = 0; i < players.length; i++ )
            {
                if ( players[i].name === player.name )
                {
                    players[i].team = newTeam;
                }
            }
            return { players };
        });
    }

    /*======================================*/

    // ANCHOR: set_player__position
    set_player__position ( player, newPosition )
    {
        this.setState( prevState => {
            let players = prevState.players;
            for ( let i = 0; i < players.length; i++ )
            {
                if ( players[i].name === player.name )
                {
                    players[i].position = newPosition;
                }
            }
            return { players };
        });
    }

    /*======================================*/

    // ANCHOR: set_player__add_highlight
    set_player__add_highlight ( player, cardIndex )
    {
        this.setState( prevState => {
            let players = prevState.players;
            for ( let i = 0; i < players.length; i++ )
            {
                if ( players[i].name === player.name )
                {
                    players[i].highlights.push( cardIndex );
                }
            }
            return { players };
        });
    }

    /*======================================*/

    // ANCHOR: set_player__remove_highlight
    set_player__remove_highlight ( player, cardIndex )
    {
        this.setState( prevState => {
            let players = prevState.players;
            for ( let i = 0; i < players.length; i++ )
            {
                if
                (
                    ( players[i].name === player.name )
                    &&
                    ( players[i].highlights.includes( cardIndex ) )
                )
                {
                    players[i].highlights = players[i].highlights.filter(
                        highlightItem => ( highlightItem !== cardIndex )
                    );
                }
            }
            return { players };
        });
    }

    /*======================================*/

    // ANCHOR: add_player
    add_player ( player )
    { 
        this.setState( prevState => ({
            players: [ ...prevState.players, player ]
        }));
    }
    
    /*======================================*/

    // ANCHOR: remove_player
    remove_player ( playerName )
    {
        this.setState( prevState => {
            let players = prevState.players.filter( gamePlayer => gamePlayer.name !== playerName );
            return { players };
        });
    }

    /*======================================*/

    // ANCHOR: clear_card_highlights
    clear_card_highlights ( index )
    {
        // State
        this.setState( prevState => {
            let highlights = prevState.highlights.filter(
                highlightItem => ( highlightItem.index !== index )
            );
            return { highlights };
        });
        // NOTE: may not need WS for this --> only activated by card choose
    }

    /*======================================*/

    // ANCHOR: clear_highlights
    clear_highlights ()
    {
        this.setState({ highlights: [] });
        // NOTE: may not need WS for this --> only activated by card choose
    }

    /*======================================*/

    // ANCHOR: add_log_item
    add_log_item ( logItem )
    { // TODO: WS
        this.setState( prevState => ({
            gameLog: [ ...prevState.gameLog, logItem ]
        }));
    }

    /*======================================*/

    // ANCHOR: clear_log
    clear_log ()
    { // TODO: WS
        this.setState({ gameLog: [] });
    }

    /*======================================*/

    // ANCHOR: set_players_total
    set_players_total ( total )
    {
        this.setState({ playersTotal: total });
    }

    /*======================================*/

    // ANCHOR: set_round
    set_round ( amount )
    {
        this.setState({ round: amount });
    }

    /*======================================*/

    // ANCHOR: set_game_state
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

    // ANCHOR: set_cards
    set_cards ( cardsArray )
    {
        this.setState({ cards: cardsArray });
    }

    /*======================================*/

    // ANCHOR: set_team__cards
    set_team__cards ( team, amount )
    {
        if ( team === C.onst.teamRed )
        {
            this.setState( prevState => {
                let teamRed = { ...prevState.teamRed };
                teamRed.cards = amount;             
                return { teamRed };
            });
        }
        if ( team === C.onst.teamBlue )
        {
            this.setState( prevState => {
                let teamBlue = { ...prevState.teamBlue };
                teamBlue.cards = amount;             
                return { teamBlue };
            });
        }
    }

    /*======================================*/

    // ANCHOR: set_team__guesses
    set_team__guesses ( team, amount )
    {
        if ( team === C.onst.teamRed )
        {
            this.setState( prevState => {
                let teamRed = { ...prevState.teamRed };
                teamRed.guesses = amount;             
                return { teamRed };
            });
        }
        if ( team === C.onst.teamBlue )
        {
            this.setState( prevState => {
                let teamBlue = { ...prevState.teamBlue };
                teamBlue.guesses = amount;             
                return { teamBlue };
            });
        }
    }

    /*======================================*/

    // ANCHOR: set_app_dimensions
    set_app_dimensions ()
    {
        this.setState({ appWidth: window.innerWidth });
        this.setState({ appHeight: window.innerHeight });
    }

    /*======================================
        ANCHOR: FUNCTIONAL METHODS
    ========================================*/

    // ANCHOR: debounce
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

    // ANCHOR set_cookie
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

    // ANCHOR get_cookie
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
    
    /*======================================*/

    // ANCHOR: card_choose
    card_choose ( cardIndex )
    { // TODO
        console.log('======= CARD_CHOOSE =======');
        // let newUpdate = {
        //     messageType: 'updateCardChoose',
        //     player: {},
        //     cardIndex: cardIndex,
        // };
        // TODO: update game log
        // this.socket.send( JSON.stringify( newUpdate ));
    }

    /*======================================*/

    // ANCHOR: give_clue
    give_clue ( clue )
    { // TODO
        console.log('======= GIVE_CLUE =======');
        // let newUpdate = {
        //     messageType: 'updateCardChoose',
        //     player: {},
        //     clue: clue,
        // };
        // TODO: update game log
        // this.socket.send( JSON.stringify( newUpdate ));
    }

    /*======================================*/

    // ANCHOR: disable_interactions
    // disable_interactions ()
    // {
    //     document.querySelector('main').classList.add( C.onst.classDisabled );
    // }

    /*======================================*/

    // ANCHOR: enable_interactions
    // enable_interactions ()
    // {
    //     document.querySelector('main').classList.remove( C.onst.classDisabled );
    // }

    /*======================================
        ANCHOR: COMPONENT ACTIONS
    ========================================*/

    componentDidMount()
    {

        /*======================================
            ANCHOR: WEBSOCKET COMMUNICATION
        ========================================*/

        const ws = this.socket;
        let currentPlayer = this.state.currentPlayer;

        /*======================================
            ANCHOR: INITIAL CONNECTION - SEND
        ========================================*/

        ws.onopen = function ( event )
        {
            console.log('WebSocket Client Connected');
            let newUpdate = {
                messageType: 'addPlayer',
                player: currentPlayer,
            };
            ws.send( JSON.stringify( newUpdate ) );
        };

        ws.onmessage = ( messageData ) =>
        {
            console.log('======= Message Recieved =======');
            let updateData = JSON.parse( messageData.data );
            console.log({updateData});

            /*======================================
                ANCHOR: INITIAL CONNECTION - RECEIVE
            ========================================*/

            if ( !this.state.wsConnected )
            {
                // Set cards
                this.set_cards( updateData.cards );
                // Set currentPlayer ID
                if ( updateData.player.id )
                { this.set_current_player__ID( updateData.player.id );  }
                // Set players
                for ( let i = 0; i < updateData.players.length; i++ )
                {
                    if ( !this.state.players.includes( updateData.players[i] ) )
                    { this.add_player( updateData.players[i] ); }
                }
                // Set host
                if ( updateData.host )
                { this.set_isHost( updateData.host ); }
                // Set connection state
                this.set_wsConnection( true ); 
            }

            /*======================================
                ANCHOR: HANDLERS
            ========================================*/

            switch( updateData.messageType )
            {

                case 'addPlayer':
                {
                    this.add_player( updateData.player );
                    break;
                }

                case 'clientConnected':
                {
                    this.set_players_total( updateData.total );
                    break;
                }

                case 'clientDisconnected':
                {
                    this.remove_player( updateData.player.name );
                    this.set_players_total( updateData.total );
                    break;
                }

                case 'updatePlayerName':
                {
                    this.set_player__name( updateData.player, updateData.newName );
                    break;
                }

                case 'updatePlayerTeam':
                {
                    this.set_player__team( updateData.player, updateData.newTeam );
                    break;
                }

                case 'updatePlayerPosition':
                {
                    this.set_player__position( updateData.player, updateData.newPosition );
                    break;
                }

                case 'updateAddHighlight':
                {
                    console.log('==> updateAddHighlight');
                    this.set_player__add_highlight( updateData.player, updateData.index );
                    break;
                }

                case 'updateRemoveHighlight':
                {
                    console.log('==> updateRemoveHighlight');
                    this.set_player__remove_highlight( updateData.player, updateData.index );
                    break;
                }

                case 'updateClearCardHighlights':
                {
                    console.log('==> updateClearCardHighlights');
                    this.clear_card_highlights( updateData.index );
                    break;
                }

                case 'updateClearHighlights':
                {
                    console.log('==> updateClearHighlights');
                    this.clear_highlights();
                    break;
                }

                case 'updateCardChoose':
                {
                    console.log('==> updateCardChoose');
                    // TODO: card choose
                    // set game state if 'end guessing' or an incorrect card is chosen (black/neutreul/other team)
                    // this.set_game_state( updateData.state );
                    break;
                }

                default:
            }
        };

        /*======================================
            ANCHOR: WINDOW LISTENER 
        ========================================*/

        this.set_app_dimensions();
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

    /*======================================
        ANCHOR: RENDER FUNCTIONS
    ========================================*/

    render()
    {

        const on_dev_button = ( state ) => { this.set_game_state( state ); }
        const on_dev_input = e => { if (e.keyCode === 13) { this.set_current_player__name( e.target.value ); } }
        const dev_list_players = ( arr ) => { let str = ''; for ( let i = 0; i < arr.length; i++ ) { str += arr[i].name + ', '; } return str; }

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
                <div className='bg-texture'></div>

                <Header
                    currentPlayer={this.state.currentPlayer}
                    players={this.state.players}
                    playersTotal={this.state.playersTotal}
                    isHost={this.state.isHost}
                />

                <GameMessage
                    currentPlayer={this.state.currentPlayer}
                    gameState={this.state.gameState}
                />

                <GameMenu
                    gameState={this.state.gameState}
                    set_game_state={this.set_game_state}
                    isHost={this.state.isHost}
                />

                <div className='game-container'>
                    <div className='team-container team-red'>
                        <TeamCard
                            currentPlayer={this.state.currentPlayer}
                            team={C.onst.teamRed}
                            teamData={this.state.teamRed}
                            players={this.state.players}
                            gameState={this.state.gameState}
                            set_current_player__team={this.set_current_player__team}
                            set_current_player__position={this.set_current_player__position}
                            set_team__cards={this.set_team__cards}
                            set_team__guesses={this.set_team__guesses}
                        />
                    </div>
                    <div className='board-container'>
                        <GameBoard
                            currentPlayer={this.state.currentPlayer}
                            players={this.state.players}
                            gameState={this.state.gameState}
                            cards={this.state.cards}
                            card_choose={this.card_choose}
                            add_highlight={this.set_current_player__add_highlight}
                            remove_highlight={this.set_current_player__remove_highlight}
                            debounce={this.debounce}
                        />
                        <GameInputs
                            currentPlayer={this.state.currentPlayer}
                            gameState={this.state.gameState}
                            give_clue={this.give_clue}
                        />
                    </div>
                    <div className='team-container team-blue'>
                        <TeamCard
                            currentPlayer={this.state.currentPlayer}
                            team={C.onst.teamBlue}
                            teamData={this.state.teamBlue}
                            players={this.state.players}
                            gameState={this.state.gameState}
                            set_current_player__team={this.set_current_player__team}
                            set_current_player__position={this.set_current_player__position}
                            set_team__cards={this.set_team__cards}
                            set_team__guesses={this.set_team__guesses}
                        />
                        <GameLog
                            gameLog={this.state.gameLog}
                        />
                    </div>
                </div>


                <div id='dev-tools'>
                    <div>
                        <ul>
                            <li>Players: {dev_list_players(this.state.players)}</li>
                            <li>Current Player: {this.state.currentPlayer.id},
                                {this.state.currentPlayer.name},
                                {this.state.currentPlayer.team},
                                {this.state.currentPlayer.position},
                            </li>
                            <li>State: {this.state.gameState}</li>
                            <li>Host: {this.state.isHost.toString()}</li>
                        </ul>
                    </div>
                    <div>
                        <input
                            type='text'
                            className='name-input'
                            placeholder='Name'
                            defaultValue=''
                            onKeyDown={on_dev_input} />
                        <Button btnClasses={'button-green'} btnFunction={on_dev_button} btnText={'Setup'} btnValue={'setup'} />
                        <Button btnClasses={'button-red'} btnFunction={on_dev_button} btnText={'RedSpy'} btnValue={'red-spymaster'} />
                        <Button btnClasses={'button-red'} btnFunction={on_dev_button} btnText={'RedOp'} btnValue={'red-operatives'} />
                        <Button btnClasses={'button-blue'} btnFunction={on_dev_button} btnText={'BlueSpy'} btnValue={'blue-spymaster'} />
                        <Button btnClasses={'button-blue'} btnFunction={on_dev_button} btnText={'BlueOp'} btnValue={'blue-operatives'} />
                        <Button btnClasses={'button-green'} btnFunction={on_dev_button} btnText={'End'} btnValue={'end'} />
                    </div>
                </div>

            </main>
        );
    }
}
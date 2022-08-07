import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// COMPONENETS
import Button from './Button/Button.js'
import GameLog from './GameLog/GameLog.js'
import GameMenu from './GameMenu/GameMenu.js'
import TeamCard from './TeamCard/TeamCard.js'
import GameCard from './GameCard/GameCard.js'
import GameInputs from './GameInputs/GameInputs.js'
import GameHeader from './GameHeader/GameHeader.js'
import GameInstruction from './GameInstruction/GameInstruction.jsx'

// CSS + GLOBAL CONSTANTS + HELPER FUNCTIONS
import * as C from '../helpers/constants.js'
import * as H from '../helpers/helpers.js'
import './App.scss'

/*================================================
    ANCHOR: REDUX ACTIONS
==================================================*/

/*======================================*/

export default function App ()
{

    /*================================================
        ANCHOR: STATE
    ==================================================*/

    // Redux
    const user = useSelector( ( state ) => { return state['user'].user } )
    const users = useSelector( ( state ) => { return state['users'].users } )
    const userTotal = useSelector( ( state ) => { return state['userTotal'].userTotal } )
    const messages = useSelector( ( state ) => { return state['messages'].messages } )
    const log = useSelector( ( state ) => { return state['log'].log } )
    const dispatch = useDispatch()
    // Hooks
    const [WSReady, setWSReady] = useState(false)
    const [WS, setWS] = useState(new WebSocket( C.onst.wsURL ))

    // constructor(props)
    // {
    //     super(props)
    //     this.state = {
    //         // Game states
    //         gameState: C.onst.gameState_setup,
    //         round: 0,
    //         cards: [],
    //         clue: '',
    //         guesses: '',
    //         instruction: 'temp instruction',
    //         // Teams
    //         teamRed: {
    //             remainingCards: 0,
    //             remainingGuesses: 0,
    //         },
    //         teamBlue: {
    //             remainingCards: 0,
    //             remainingGuesses: 0,
    //         },
    //         // Sizing
    //         appWidth: window.innerWidth,
    //         appHeight: window.innerHeight,
    //         cardSize: 0,
    //         viewScale: 1,
    //     }
        
        /*================================================
            ANCHOR: METHOD BINDING
        ==================================================*/

    // // State methods - Connection
    // this.socket = new WebSocket( 'ws://localhost:3001' )

    // // State methods - Game states
    // this.set_game_state = this.set_game_state.bind(this)
    // this.set_round      = this.set_round.bind(this)
    // this.set_cards      = this.set_cards.bind(this)
    // this.set_users    = this.set_users.bind(this)
    // this.set_clue       = this.set_clue.bind(this)
    // this.set_instruction    = this.set_instruction.bind(this)
    // this.set_log        = this.set_log.bind(this)

    // // State methods - Teams
    // this.set_team_remaining_cards   = this.set_team_remaining_cards.bind(this)
    // this.set_team_remaining_guesses = this.set_team_remaining_guesses.bind(this)

    // // State methods - Users
    // this.user_add    = this.user_add.bind(this)
    // this.user_remove = this.user_remove.bind(this)

    // // State methods - User Info
    // this.set_user_ID       = this.set_user_ID.bind(this)
    // this.set_user_name     = this.set_user_name.bind(this)
    // this.set_user_team     = this.set_user_team.bind(this)
    // this.set_user_position = this.set_user_position.bind(this)
    // this.set_user_isHost   = this.set_user_isHost.bind(this)
    // this.get_card_highlights = this.get_card_highlights.bind(this)

    // // State methods - Highlighting
    // this.addHighlight        = this.addHighlight.bind(this)
    // this.removeHighlight     = this.removeHighlight.bind(this)
    // this.highlight_clear_card = this.highlight_clear_card.bind(this)
    // this.highlight_clear_all  = this.highlight_clear_all.bind(this)

    // // State methods - Game Log
    // this.log_add_item = this.log_add_item.bind(this)
    // this.log_clear    = this.log_clear.bind(this)

    // // WS Methods - User Info
    // this.sendUserName     = this.sendUserName.bind(this)
    // this.sendUserTeam     = this.sendUserTeam.bind(this)
    // this.sendUserPosition = this.sendUserPosition.bind(this)

    // // WS Methods - User Interactions
    // this.sendClue      = this.sendClue.bind(this)
    // this.sendCard      = this.sendCard.bind(this)
    // this.sendHighlight = this.sendHighlight.bind(this)

    // // Interaction Methods
    // this.teamSelect = this.teamSelect.bind(this)

    // // Functional methods - General
    // this.debounce             = this.debounce.bind(this)
    // this.enableInteractions  = this.enableInteractions.bind(this)
    // this.disableInteractions = this.disableInteractions.bind(this)

    // // Functional methods - Sizing
    // this.setAppDimensions = this.setAppDimensions.bind(this)
    // // this.set_card_size      = this.set_card_size.bind(this)
    // // this.set_view_scale     = this.set_view_scale.bind(this)

    // // Functional methods - Cookies
    // this.setCookie = this.setCookie.bind(this)
    // this.getCookie = this.getCookie.bind(this)
    

    /*================================================
        ANCHOR: STATE METHODS - Game States
    ==================================================*/

    // set_game_state ( state )
    // {
    //     this.setState({ gameState: state })
    //     // NOTE: disable/enable interactions
    //     // this.disableInteractions()
    //     // setTimeout(function() {
    //     //     this.enableInteractions()
    //     // }, transitionTime__stateChange)
    // }

    /*======================================*/
    /*======================================*/

    // set_round ( roundNumber )
    // {
    //     this.setState({ round: roundNumber })
    // }

    /*======================================*/
    /*======================================*/

    // set_cards ( cardsArray )
    // {
    //     this.setState({ cards: cardsArray })
    // }

    /*======================================*/
    /*======================================*/

    // set_users ( usersArray )
    // { 
    //     this.setState({ users: usersArray })
    //     this.setState({ usersTotal: users.length + 1 })
    // }

    /*======================================*/
    /*======================================*/

    // set_clue ( newClue )
    // { 
    //     this.setState({ clue: newClue })
    // }

    /*======================================*/
    /*======================================*/

    // set_guesses ( guessAmount )
    // { 
    //     this.setState({ guesses: guessAmount })
    // }

    /*======================================*/
    /*======================================*/

    // set_instruction ( newMessage )
    // { 
    //     this.setState({ instruction: newInstruction })
    // }

    /*================================================
        ANCHOR: STATE METHODS - Team Info
    ==================================================*/

    // set_team_remaining_cards ( team, amount )
    // {
    //     if ( team === C.onst.red )
    //     {
    //         this.setState( prevState => {
    //             let teamRed = { ...prevState.teamRed }
    //             teamRed.cards = amount             
    //             return { teamRed }
    //         })
    //     }
    //     if ( team === C.onst.blue )
    //     {
    //         this.setState( prevState => {
    //             let teamBlue = { ...prevState.teamBlue }
    //             teamBlue.cards = amount             
    //             return { teamBlue }
    //         })
    //     }
    // }

    /*======================================*/
    /*======================================*/

    // set_team_remaining_guesses ( team, amount )
    // {
    //     if ( team === C.onst.red )
    //     {
    //         this.setState( prevState => {
    //             let teamRed = { ...prevState.teamRed }
    //             teamRed.guesses = amount             
    //             return { teamRed }
    //         })
    //     }
    //     if ( team === C.onst.blue )
    //     {
    //         this.setState( prevState => {
    //             let teamBlue = { ...prevState.teamBlue }
    //             teamBlue.guesses = amount             
    //             return { teamBlue }
    //         })
    //     }
    // }

    /*================================================
        ANCHOR: STATE METHODS - Users
    ==================================================*/

    // user_add ( user )
    // { 
    //     this.setState( prevState => ({
    //         users: [ ...prevState.users, user ]
    //     }))
    //     this.setState({ usersTotal: this.state.usersTotal + 1 })
    // }
    
    /*======================================*/
    /*======================================*/

    // user_remove ( userID )
    // {
    //     this.setState( prevState => {
    //         let users = prevState.users.filter( user => user.id !== userID )
    //         return { users }
    //     })
    //     this.setState({ usersTotal: this.state.usersTotal - 1 })
    // }

    /*================================================
        ANCHOR: STATE METHODS - User Info
    ==================================================*/

    // > This function is ONLY for the current user
    // set_user_ID ( userID )
    // {
    //     this.setState(prevState => {
    //         let user = { ...prevState.user }
    //         user.id = userID
    //         return { user }
    //     })
    // }

    /*======================================*/
    /*======================================*/

    // set_user_name ( user, newName )
    // {
    //     if ( user.id === user.id )
    //     {
    //         // > Current user
    //         this.setState(prevState => {
    //             let user = { ...prevState.user }
    //             user.name = newName
    //             return { user }
    //         })
    //     }
    //     else
    //     {
    //         // > Other user
    //         this.setState( prevState => {
    //             let users = prevState.users
    //             for ( let i = 0; i < users.length; i++ )
    //             {
    //                 if ( users[i].id === user.id )
    //                 {
    //                     users[i].name = newName
    //                 }
    //             }
    //             return { users }
    //         })
    //     }
    // }

    /*======================================*/
    /*======================================*/

    // set_user_team ( user, newTeam )
    // {
    //     console.log('SET_PLAYER_TEAM - team: ', newTeam)
    //     console.log('SET_PLAYER_TEAM - typeof :', typeof newTeam)
    //     if ( user.id === user.id )
    //     {
    //         // > Current user
    //         this.setState(prevState => {
    //             let user = { ...prevState.user }
    //             user.team = newTeam
    //             return { user }
    //         })
    //     }
    //     else
    //     {
    //         // > Other user
    //         this.setState( prevState => {
    //             let users = prevState.users
    //             for ( let i = 0; i < users.length; i++ )
    //             {
    //                 if ( users[i].id === user.id )
    //                 {
    //                     users[i].team = newTeam
    //                 }
    //             }
    //             return { users }
    //         })
    //     }
    // }

    /*======================================*/
    /*======================================*/

    // set_user_position ( user, newPosition )
    // {
    //     console.log('SET_PLAYER_POSITION - position: ', newPosition)
    //     console.log('SET_PLAYER_POSITION - typeof :', typeof newPosition)
    //     if ( user.id === user.id )
    //     {
    //         // > Current user
    //         this.setState( prevState => {
    //             let user = { ...prevState.user }
    //             user.position = newPosition
    //             return { user }
    //         })
    //     }
    //     else
    //     {
    //         // > Other user
    //         this.setState( prevState => {
    //             let users = prevState.users
    //             for ( let i = 0; i < users.length; i++ )
    //             {
    //                 if ( users[i].id === user.id )
    //                 {
    //                     users[i].position = newPosition
    //                 }
    //             }
    //             return { users }
    //         })
    //     }
    // }

    /*======================================*/
    /*======================================*/

    // set_user_isHost ( user )
    // {
    //     console.log('===> set_user_isHost')
    //     if ( user.id === user.id )
    //     {
    //         // > Current user
    //         // > Set current user to host
    //         this.setState( prevState => {
    //             let user = { ...prevState.user }
    //             user.isHost = true
    //             return { user }
    //         })
    //         // > Remove host from other users
    //         this.setState( prevState => {
    //             let users = prevState.users
    //             for ( let i = 0; i < users.length; i++ )
    //             {
    //                 users[i].isHost = false
    //             }
    //             return { users }
    //         })
    //     }
    //     else
    //     {
    //         // > Other user
    //         // > Remove current user as host
    //         this.setState( prevState => {
    //             let user = { ...prevState.user }
    //             user.isHost = false
    //             return { user }
    //         })
    //         // > Remove host from other users and set specified user as host
    //         this.setState( prevState => {
    //             let users = prevState.users
    //             for ( let i = 0; i < users.length; i++ )
    //             {
    //                 if ( users[i].id === user.id )
    //                 { users[i].isHost = true }
    //                 else
    //                 { users[i].isHost = false }
    //             }
    //             return { users }
    //         })
    //     }
    //     console.log('===> END - set_user_isHost')
    // }

    /*======================================*/
    /*======================================*/

    // get_card_highlights ( cardIndex )
    // {
    //     // > Current User
    //     let highlights = []
    //     if
    //     (
    //         !( user.highlights === undefined )
    //         &&
    //         ( user.highlights.length )
    //         &&
    //         ( user.highlights.includes( cardIndex ) )
    //     )
    //     {
    //         highlights.push(
    //             {
    //                 name: user.name,
    //                 team: user.team
    //             }
    //         )
    //     }
    //     // > Other Users
    //     if ( !( users === undefined ) && ( users.length ) ) 
    //     {
    //         for ( let j = 0; j < users.length; j++ )
    //         {
    //             if ( users[j].highlights.includes( cardIndex ) )
    //             {
    //                     highlights.push(
    //                     {
    //                         name: users[j].name,
    //                         team: users[j].team
    //                     }
    //                 )
    //             }
    //         }
    //     }
    //     return highlights
    // }

    /*================================================
        ANCHOR: STATE METHODS - Highlighting
    ==================================================*/

    // addHighlight ( user, cardIndex )
    // {
    //     if ( user.id === user.id )
    //     {
    //         // Current user - State
    //         this.setState( prevState => {
    //             let user = { ...prevState.user }
    //             user.highlights.push( cardIndex )
    //             return { user }
    //         })
    //     }
    //     else
    //     {
    //         // Other user - State
    //         this.setState( prevState => {
    //             let users = prevState.users
    //             for ( let i = 0; i < users.length; i++ )
    //             {
    //                 if ( users[i].id === user.id )
    //                 {
    //                     users[i].highlights.push( cardIndex )
    //                 }
    //             }
    //             return { users }
    //         })
    //     }
    // }

    /*======================================*/
    /*======================================*/

    // removeHighlight ( user, cardIndex )
    // {
    //     if ( user.id === user.id )
    //     {
    //         // Current user - State
    //         this.setState( prevState => {
    //             let user = { ...prevState.user }
    //             user.highlights = user.highlights.filter(
    //                 highlightItem => ( highlightItem !== cardIndex )
    //             )
    //             return { user }
    //         })
    //     }
    //     else
    //     {
    //         // Other user - State
    //         this.setState( prevState => {
    //             let users = prevState.users
    //             for ( let i = 0; i < users.length; i++ )
    //             {
    //                 if ( ( users[i].id === user.id ) && ( users[i].highlights.includes( cardIndex ) ) )
    //                 {
    //                     users[i].highlights = users[i].highlights.filter(
    //                         highlightIndex => ( highlightIndex !== cardIndex )
    //                     )
    //                 }
    //             }
    //             return { users }
    //         })
    //     }
    // }

    /*======================================*/
    /*======================================*/

    // TODO: ==> highlight_clear_card
    // highlight_clear_card ( cardIndex )
    // {
        // State
        // this.setState( prevState => {
        //     let highlights = prevState.highlights.filter(
        //         highlightItem => ( highlightItem.index !== index )
        //     )
        //     return { highlights }
        // })
    // }

    /*======================================*/
    /*======================================*/

    // TODO: ==> highlight_clear_all
    // highlight_clear_all ()
    // {
        // this.setState({ highlights: [] })
    // }

    /*================================================
        ANCHOR: STATE METHODS - Game Log
    ==================================================*/

    // set_log( logArray )
    // {
    //     console.log('===> set_log')
    //     this.setState({ gameLog: logArray })
    //     console.log('===> END - set_log')
    // }

    /*======================================*/
    /*======================================*/

    // log_add_item ( logItem )
    // {
    //     console.log('===> log_add_item')
    //     // State
    //     this.setState( prevState => ({
    //         gameLog: [ ...prevState.gameLog, logItem]
    //     }))
    //     // WS
    //     // let newUpdate = {
    //     //     type: 'updateAddLogItem',
    //     //     index: logItem,
    //     // }
    //     // this.socket.send( JSON.stringify( newUpdate ))
    //     // console.log('>>>>>>>>> Message Sent - updateAddLogItem >>>>>>>>>')
    //     console.log('===> END - log_add_item')
    // }

    /*======================================*/
    /*======================================*/

    // log_clear ()
    // {
    //     console.log('===> log_clear')
    //     this.setState({ gameLog: [] })
    //     console.log('===> END - log_clear')
    // }

    /*================================================
        ANCHOR: HOOKS - WEBSOCKET COMMUNICATION
    ==================================================*/

    // Initial sizing
    // this.setAppDimensions()

    // TODO: Cookies
    // Get current userID (and maybe name/team/color) from cookies
    // If ID is not present, auth page has failed to store cookie

    // let userID = this.getCookie('user-id')
    // this.set_user_ID( userID )



    // componentDidMount()
    // {
    //     // this.setAppDimensions()
    //     let debounceResize = this.debounce( this.setAppDimensions, C.onst.debounceDelay, false )
    //     window.addEventListener( 'resize', debounceResize )
    // }

    // componentWillUnmount() {
    //     let debounceResize = this.debounce( this.setAppDimensions, C.onst.debounceDelay, false )
    //     window.removeEventListener( 'resize', debounceResize )
    // }



    useEffect( () => {

        /*================================================
            ANCHOR: WS - ON OPEN
        ==================================================*/

        WS.onopen = ( e ) =>
        {
            setWSReady(true)
            console.log('>>>>>>>>> WebSocket Client Connected >>>>>>>>>')
        }

        /*================================================
            ANCHOR: WS - ON MESSAGE
        ==================================================*/
    
        WS.onmessage = ( messageData ) =>
        {
            const updateData = JSON.parse( messageData.data )
            console.log('>>>>>>>>> Message Recieved - ' + updateData.type + ' >>>>>>>>>')
    
            switch ( updateData.type )
            {
    
                /*================================================
                    ANCHOR: HANDLER - PLAYER CONNECTIONS
                ==================================================*/
    
                case 'clientConnected':
                    {
                        // This handler is only fired ONCE when the CURRENT user joins
                        // console.log('======= HANDLER - clientConnected =======')
        
                        // Set cards
                        if ( !( updateData.cards === undefined ) && ( updateData.cards.length ) )
                        { this.set_cards( updateData.cards ) }
        
                        // Set users
                        if ( !( updateData.users === undefined ) && ( updateData.users.length ) )
                        { this.set_users( updateData.users ) }
                        
                        // Set log
                        if ( !( updateData.gameLog === undefined ) && ( updateData.gameLog.length ) )
                        { this.set_log( updateData.gameLog ) }
        
                        // Send current user information to server
                        let newUpdate = {
                            type: 'userConnected',
                            user: user,
                        }
                        ws.send( JSON.stringify( newUpdate ) )
                        console.log('>>>>>>>>> Message Sent - userConnected >>>>>>>>>')
                        // console.log('======= END - HANDLER - clientConnected =======')
                        break
                    }
    
                /*======================================*/
                /*======================================*/
    
                case 'userConnected':
                    {
                        // This handler is only fired when OTHER users join
                        // console.log('======= HANDLER - userConnected =======')
                        this.user_add( updateData.user )
                        // console.log('======= END - HANDLER - userConnected =======')
                        break
                    }
    
                /*======================================*/
                /*======================================*/  
    
                case 'clientDisconnected':
                    {
                        // This handler is only fired when OTHER users leave
                        // console.log('======= HANDLER - clientDisconnected =======')
                        this.user_remove( updateData.userID )
                        // console.log('======= END - HANDLER - clientDisconnected =======')
                        break
                    }
    
                /*================================================
                    ANCHOR: HANDLER - PLAYERS INFO
                ==================================================*/
    
                case 'updateUserName':
                    {
                        // console.log('======= HANDLER - updateUserName =======')
                        this.set_user_name( updateData.user, updateData.newName )
                        // console.log('======= END - HANDLER - updateUserName =======')
                        break
                    }
    
                /*======================================*/
                /*======================================*/
    
                case 'updateUserTeam':
                {
                    // console.log('======= HANDLER - updateUserTeam =======')
                    this.set_user_team( updateData.user, updateData.newTeam )
                    // console.log('======= END - HANDLER - updateUserTeam =======')
                    break
                }
    
                /*======================================*/
                /*======================================*/
    
                case 'updateUserPosition':
                {
                    // console.log('======= HANDLER - updateUserPosition =======')
                    this.set_user_position( updateData.user, updateData.newPosition )
                    // console.log('======= END - HANDLER - updateUserPosition =======')
                    break
                }
    
                /*======================================*/
                /*======================================*/
    
                case 'updateUserIsHost':
                {
                    console.log('======= HANDLER - updateUserIsHost =======')
                    this.set_user_isHost( updateData.user )
                    console.log('======= END - HANDLER - updateUserIsHost =======')
                    break
                }
                
                /*================================================
                    ANCHOR: HANDLER - HIGHLIGHTS
                ==================================================*/

                case 'updateAddHighlight':
                {
                    console.log('======= HANDLER - updateAddHighlight =======')
                    this.addHighlight( updateData.user, updateData.index )
                    console.log('======= END - HANDLER - updateAddHighlight =======')
                    break
                }

                /*======================================*/
                /*======================================*/

                case 'updateRemoveHighlight':
                {
                    console.log('======= HANDLER - updateRemoveHighlight =======')
                    this.removeHighlight( updateData.user, updateData.index )
                    console.log('======= END - HANDLER - updateRemoveHighlight =======')
                    break
                }

                /*======================================*/
                /*======================================*/

                // case 'updateClearCardHighlights':
                // {
                //     console.log('==> updateClearCardHighlights')
                //     this.highlight_clear_card( updateData.index )
                //     break
                // }

                /*======================================*/
                /*======================================*/

                // case 'updateClearHighlights':
                // {
                //     console.log('==> updateClearHighlights')
                //     this.highlight_clear_all()
                //     break
                // }


                /*================================================
                    ANCHOR: HANDLER - CARD CHOOSING
                ==================================================*/

                // case 'updateCardChoose':
                // {
                //     console.log('==> updateCardChoose')
                //     // set game state if 'end guessing' or an incorrect card is chosen (black/neutreul/other team)
                //     this.set_game_state( updateData.state )
                //     break
                // }
    
                /*======================================*/
                /*======================================*/
    
                default:
            }
        }

        /*================================================
            ANCHOR: WS - ON CLOSE
        ==================================================*/
    
        WS.onclose = ( e ) =>
        {
            setWSReady(false)
            // TODO: check if neeeded
            setTimeout(() => {
                setWS(new WebSocket( C.onst.wsURL ))
            }, 1000)
        }

        /*================================================
            ANCHOR: WS - ON ERROR
        ==================================================*/
    
        WS.onerror = ( err ) =>
        {
            console.log('WebSocket encountered error: ', err.message, ' --> Closing socket')
            setWSReady(false)
            WS.close()
        }

        /*================================================
            ANCHOR: WS - COMPONENT UNMOUNTING
        ==================================================*/
    
        return () =>
        {
            WS.close()
        }
    }, [WS])

    /*================================================
        ANCHOR: WS METHODS - User Info
    ==================================================*/

    // TODO: ==> sendUserName
    const sendUserName = ( user, newName ) =>
    {
        console.log('===> sendUserName')
        let newUpdate = {
            type: 'updateUserName',
            user: user,
            newName: newName,
        }
        this.socket.send( JSON.stringify( newUpdate ))
        console.log('>>>>>>>>> Message Sent - updateUserName >>>>>>>>>')
        console.log('===> END - sendUserName')
    }

    /*======================================*/
    /*======================================*/

    // TODO: ==> sendUserTeam
    const sendUserTeam = ( user, newTeam ) =>
    {
        console.log('===> sendUserTeam')
        let newUpdate = {
            type: 'updateUserTeam',
            user: user,
            newTeam: newTeam,
        }
        this.socket.send( JSON.stringify( newUpdate ))
        console.log('>>>>>>>>> Message Sent - updateUserTeam >>>>>>>>>')
        console.log('===> END - sendUserTeam')
    }

    /*======================================*/
    /*======================================*/

    // TODO: ==> sendUserPosition
    const sendUserPosition = ( user, newPosition ) =>
    {
        console.log('===> sendUserPosition')
        let newUpdate = {
            type: 'updateUserPosition',
            user: user,
            newPosition: newPosition,
        }
        this.socket.send( JSON.stringify( newUpdate ))
        console.log('>>>>>>>>> Message Sent - updateUserPosition >>>>>>>>>')
        console.log('===> END - sendUserPosition')
    }

    /*================================================
        ANCHOR: WS METHODS - User Interactions
    ==================================================*/

    // TODO: ==> sendClue
    const sendClue = ( clue ) =>
    {
        // ==> update game log
        // ==> 
        // ==> 
        // ==> send

        // let newUpdate = {
        //     type: 'updateCardChoose',
        //     user: {},
        //     clue: clue,
        // }
        // this.socket.send( JSON.stringify( newUpdate ))
    }

    /*======================================*/
    /*======================================*/

    // TODO: ==> sendCard
    const sendCard = ( cardIndex ) =>
    { 
        // use user --> updates from server will arrive as different commands, they will not use sendCard here
        // ==> update game log
        // ==> clear card highlights
        // ==> send request to server
        // ==> begin animation on recieving response from ws server
        // ==> after animation --> change round || continue round
        // ==> if round change, clear all card highlights
    }

    /*======================================*/
    /*======================================*/

    // TODO: ==> sendHighlight
    const sendHighlight = ( cardIndex ) =>
    {
        if ( !( user.highlights.includes( cardIndex ) ) )
        {
            this.addHighlight( user, cardIndex )
            let newUpdate = {
                type: 'updateAddHighlight',
                user: user,
                index: cardIndex,
            }
            this.socket.send( JSON.stringify( newUpdate ))
            console.log('>>>>>>>>> Message Sent - updateAddHighlight >>>>>>>>>')
        }
        else
        {
            this.removeHighlight( user, cardIndex )
            let newUpdate = {
                type: 'updateRemoveHighlight',
                user: user,
                index: cardIndex,
            }
            this.socket.send( JSON.stringify( newUpdate ))
            console.log('>>>>>>>>> Message Sent - updateRemoveHighlight >>>>>>>>>')
        }
    }

    /*================================================
        ANCHOR: INTERACTION METHODS
    ==================================================*/

    const teamSelect = ( positionButton, colorCardTeam ) =>
    {
        let user = user
        let colorUserTeam = user.team
        let positionUser  = user.position

        const isOnTeam          = colorUserTeam
        const isTeamCardRed     = ( colorCardTeam === C.onst.red )
        const isTeamCardBlue    = ( colorCardTeam === C.onst.blue )
        const isSameTeam        = ( colorCardTeam === colorUserTeam )
        const isUserOperative = ( positionUser === C.onst.operative )
        const isUserSpymaster = ( positionUser === C.onst.spymaster )
        const isButtonOperative = ( positionButton === C.onst.operative )
        const isButtonSpymaster = ( positionButton === C.onst.spymaster )

        // > User does not have a team
        if ( !isOnTeam && isTeamCardRed && isButtonOperative )
        { this.sendUserTeam( user, colorCardTeam ); this.sendUserPosition( user, positionButton ) }
        if ( !isOnTeam && isTeamCardRed && isButtonSpymaster )
        { this.sendUserTeam( user, colorCardTeam ); this.sendUserPosition( user, positionButton ) }
        if ( !isOnTeam && isTeamCardBlue && isButtonOperative )
        { this.sendUserTeam( user, colorCardTeam ); this.sendUserPosition( user, positionButton ) }
        if ( !isOnTeam && isTeamCardBlue && isButtonSpymaster )
        { this.sendUserTeam( user, colorCardTeam ); this.sendUserPosition( user, positionButton ) }

        // > User is already on a team
        if ( isOnTeam && isTeamCardRed && isSameTeam && isUserOperative && isButtonSpymaster )
        { this.sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardRed && isSameTeam && isUserSpymaster && isButtonOperative )
        { this.sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardRed && !isSameTeam && isUserOperative && isButtonOperative )
        { this.sendUserTeam( user, colorCardTeam ) }
        if ( isOnTeam && isTeamCardRed && !isSameTeam && isUserOperative && isButtonSpymaster )
        { this.sendUserTeam( user, colorCardTeam ); this.sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardRed && !isSameTeam && isUserSpymaster && isButtonOperative )
        { this.sendUserTeam( user, colorCardTeam ); this.sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardRed && !isSameTeam && isUserSpymaster && isButtonSpymaster )
        { this.sendUserTeam( user, colorCardTeam ) }
        if ( isOnTeam && isTeamCardBlue && isSameTeam && isUserOperative && isButtonSpymaster )
        { this.sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardBlue && isSameTeam && isUserSpymaster && isButtonOperative )
        { this.sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardBlue && !isSameTeam && isUserOperative && isButtonOperative )
        { this.sendUserTeam( user, colorCardTeam ) }
        if ( isOnTeam && isTeamCardBlue && !isSameTeam && isUserOperative && isButtonSpymaster )
        { this.sendUserTeam( user, colorCardTeam ); this.sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardBlue && !isSameTeam && isUserSpymaster && isButtonOperative )
        { this.sendUserTeam( user, colorCardTeam ); this.sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardBlue && !isSameTeam && isUserSpymaster && isButtonSpymaster )
        { this.sendUserTeam( user, colorCardTeam ) }
    }

    /*================================================
        ANCHOR: FUNCTIONAL METHODS - General
    ==================================================*/

    const debounce = ( func, wait, immediate ) =>
    {
        var timeout
        return function() {
            var context = this, args = arguments
            var later = function() {
                timeout = null
                if (!immediate) func.apply(context, args)
            }
            var callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (callNow) func.apply(context, args)
        }
    }

    /*======================================*/
    /*======================================*/

    // TODO: ==> enableInteractions
    const enableInteractions = () =>
    {
        
    }

    /*======================================*/
    /*======================================*/

    // TODO: ==> disableInteractions
    const disableInteractions = () =>
    {
        
    }

    /*================================================
        ANCHOR: FUNCTIONAL METHODS - Sizing
    ==================================================*/

    // TODO: ==> setAppDimensions
    const setAppDimensions = () =>
    {
        this.setState({ appWidth: window.innerWidth })
        this.setState({ appHeight: window.innerHeight })
        let scaler = ( window.innerHeight / C.onst.appHeight )
        this.setState({ viewScale: scaler })
    }

    /*================================================
        ANCHOR: FUNCTIONAL METHODS - Cookies
    ==================================================*/

    const setCookie = ( name, value, days ) =>
    {
        var expires = ''
        if ( days )
        {
            var date = new Date()
            date.setTime(date.getTime() + ( days*24*60*60*1000 ) )
            expires = ' expires=' + date.toUTCString()
        }
        document.cookie = name + '=' + ( value || '' )  + expires + ' path=/'
    }

    /*======================================*/
    /*======================================*/

    const getCookie = ( name ) =>
    {
        var nameEQ = name + '='
        var ca = document.cookie.split( '' )
        for ( var i = 0; i < ca.length; i++ )
        {
            var c = ca[i]
            while ( c.charAt(0)==' ' )
            { c = c.substring( 1, c.length ) }
            if ( c.indexOf( nameEQ ) == 0 )
            { return c.substring( nameEQ.length, c.length ) }
        }
        return null
    }

    /*================================================
        ANCHOR: DISPLAYING
    ==================================================*/

    const displayCards = () =>
    {
        if ( !( this.state.cards.length === undefined ) && ( this.state.cards.length ) )
        {
            let cardArray  = []
            let positionData = {}
            for ( let i = 0; i < this.state.cards.length; i++ )
            {
                // > Positioning
                positionData = {
                    top: C.onst.cardTopBase,
                    left: C.onst.cardLeftBase,
                }
                if ( C.onst.row.two.includes(i) )       { positionData.top += ( ( C.onst.cardHeight ) * 1 ) }
                if ( C.onst.row.three.includes(i) )     { positionData.top += ( ( C.onst.cardHeight ) * 2 ) }
                if ( C.onst.row.four.includes(i) )      { positionData.top += ( ( C.onst.cardHeight ) * 3 ) }
                if ( C.onst.row.five.includes(i) )      { positionData.top += ( ( C.onst.cardHeight ) * 4 ) }
                if ( C.onst.columns.two.includes(i) )   { positionData.left += ( ( C.onst.cardWidth ) * 1 ) }
                if ( C.onst.columns.three.includes(i) ) { positionData.left += ( ( C.onst.cardWidth ) * 2 ) }
                if ( C.onst.columns.four.includes(i) )  { positionData.left += ( ( C.onst.cardWidth ) * 3 ) }
                if ( C.onst.columns.five.includes(i) )  { positionData.left += ( ( C.onst.cardWidth ) * 4 ) }

                // > Get list of highlighting users
                let highlights = this.get_card_highlights( this.state.cards[i].index )
                if ( !( highlights === undefined ) && ( highlights.length ) )
                { console.log('==> displayCards > highlights: ', highlights) }

                cardArray.push(
                    <GameCard
                        key={i}
                        highlights     ={highlights}
                        positionData   ={positionData}
                        user  ={user}
                        card           ={this.state.cards[i]}
                        sendCard      ={this.sendCard}
                        sendHighlight ={this.sendHighlight}
                    />
                )
            }
            return cardArray
        }
    }

    /*================================================
        ANCHOR: DEV TOOLS
    ==================================================*/

    const onDevState = ( state ) => { this.set_game_state( state ) }
    const on_dev_log = () => { this.set_log( C.onst.fakeLog ) }
    const on_dev_name = e => { if(e.keyCode === 13) { this.set_user_name( user, e.target.value ) } }
    const devListUsers = () => {
        let str = ''
        for ( let i = 0; i < users.length; i++ )
        {str += users[i].name; if( users[i].isHost ) { str += '[host]' } str += ', '}
        return str
    }
    const devListHighlights = () => {
        let str = ''
        for ( let i = 0; i < user.highlights.length; i++ )
        {str += user.highlights[i]; str += ', ' }
        return str
    }

    /*================================================
        ANCHOR: COMPONENTS
    ==================================================*/

    return (
        <main className={
                'codenames'
                + ' ' + this.state.gameState
                + ' ' + user.position
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
                            isHost      ={user.isHost}
                        />

                        <div className='container-header'>
                            <GameHeader />

                            <GameInstruction
                                instruction ={this.state.instruction}
                                gameState ={this.state.gameState}
                            />
                        </div>

                        <div className='container-sidebar sidebar-left'>
                            <TeamCard
                                team          ={C.onst.red}
                                teamSelect   ={this.teamSelect}
                                teamData      ={this.state.teamRed}
                                gameState     ={this.state.gameState}
                            />
                        </div>    
                                                
                        <div className='container-board'>
                            {displayCards()}
                            <GameInputs
                                sendClue     ={this.sendClue}
                                clue          ={this.state.clue}
                                guesses       ={this.state.guesses}
                                teamRed       ={this.state.teamRed}
                                teamBlue      ={this.state.teamBlue}
                                gameState     ={this.state.gameState}
                            />
                        </div>

                        <div className='container-sidebar sidebar-right'>
                            <TeamCard
                                team          ={C.onst.blue}
                                teamSelect   ={this.teamSelect}
                                teamData      ={this.state.teamBlue}
                                gameState     ={this.state.gameState}
                            />
                            <GameLog
                                gameLog   ={this.state.gameLog}
                                gameState ={this.state.gameState}
                            />
                        </div>

                        <div className='dev-tools left'>
                            <ul>
                                <li><span>Game State: </span> {this.state.gameState}</li>
                                <li><span>Users: </span>{devListUsers()}</li>
                                <li><span>Current User: </span></li>
                                <li><span>ID: </span>{user.id}</li>
                                <li><span>Name: </span> {user.name}</li>
                                <li><span>Team: </span>{user.team}</li>
                                <li><span>Position: </span> {user.position}</li>
                                <li><span>Highlights: </span> {devListHighlights()}</li>
                                <li><span>Host: </span> {user.isHost.toString()}</li>
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
                            <Button btnClasses={'button-green'} btnFunction={onDevState} btnText={'Setup'} btnValue={'setup'} />
                            <Button btnClasses={'button-red'} btnFunction={onDevState} btnText={'RedSpy'} btnValue={'red-spymaster'} />
                            <Button btnClasses={'button-red'} btnFunction={onDevState} btnText={'RedOp'} btnValue={'red-operatives'} />
                            <Button btnClasses={'button-blue'} btnFunction={onDevState} btnText={'BlueSpy'} btnValue={'blue-spymaster'} />
                            <Button btnClasses={'button-blue'} btnFunction={onDevState} btnText={'BlueOp'} btnValue={'blue-operatives'} />
                            <Button btnClasses={'button-green'} btnFunction={onDevState} btnText={'End'} btnValue={'end'} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
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
import * as H from '../helpers/functions.js'
import './App.scss'

/*================================================
    ANCHOR: REDUX ACTIONS
==================================================*/
import {
    setGameState,
} from '../redux/features/game.feature'
/*======================================*/
import {
    setDimensions
} from '../redux/features/dimensions.feature'
/*======================================*/
import {
    setLog,
    addLogItem,
    deleteAllLogItems,
} from '../redux/features/log.feature.js'
/*======================================*/
import {
    setMessages,
    addMessage,
    deleteMessage,
    deleteAllMessages,
} from '../redux/features/messages.feature.js'
/*======================================*/
import {
    setID,
    setName,
    setTeam,
    setPosition,
    setIsHost,
    addHighlight,
    deleteHighlight,
    deleteAllHighlights,
} from '../redux/features/user.feature.js'
/*======================================*/
import {
    addUser,
    deleteUser,
    setUsers,
    setUserName,
    setUserTeam,
    setUserPosition,
    setUserIsHost,
    removeUsersIsHost,
    addUserHighlight,
    deleteUserHighlight,
    deleteAllUserHighlights,
    deleteAllUsersHighlights,
} from '../redux/features/users.feature.js'
/*======================================*/
import {
    setUserTotal,
    incrementUserTotal,
    decrementUserTotal,
} from '../redux/features/userTotal.feature.js'
/*======================================*/

export default function App ()
{

    /*================================================
        ANCHOR: STATE
    ==================================================*/

    // Redux
    const user = useSelector( ( state ) => { return state['user'].user } )
    const users = useSelector( ( state ) => { return state['users'].users } )
    const cards = useSelector( ( state ) => { return state['cards'].cards } )
    // const messages = useSelector( ( state ) => { return state['messages'].messages } )
    const gameState = useSelector( ( state ) => { return state['gameState'].gameState } )
    const dimensions = useSelector( ( state ) => { return state['dimensions'].dimensions } )
    const dispatch = useDispatch()
    // Hooks
    const [WSReady, setWSReady] = useState(false)
    const [WS, setWS] = useState(new WebSocket( C.onst.wsURL ))


    //         teamRed: {
    //             name: 'C.onst.red'
    //             remainingCards: 0,
    //             remainingGuesses: 0,
    //         },
    //         teamBlue: {
    //             name: 'C.onst.blue'
    //             remainingCards: 0,
    //             remainingGuesses: 0,
    //         },
        
    // // State methods - Teams
    // this.set_team_remaining_cards   = this.set_team_remaining_cards.bind(this)
    // this.set_team_remaining_guesses = this.set_team_remaining_guesses.bind(this)

    /*================================================
        ANCHOR: HOOKS - APP DIMENSIONS
    ==================================================*/

    useEffect( () =>
    {
        dispatch( setDimensions( { height: window.innerHeight, width: window.innerWidth } ) )
        let debounceResize = H.elper.debounce( dispatch( setDimensions( { height: window.innerHeight, width: window.innerWidth } ) ), C.onst.debounceDelay, false )
        window.addEventListener( 'resize', debounceResize )

        return () =>
        {
            let debounceResize = H.elper.debounce( dispatch( setDimensions( { height: window.innerHeight, width: window.innerWidth } ) ), C.onst.debounceDelay, false )
            window.removeEventListener( 'resize', debounceResize )
        }
    })

    /*================================================
        ANCHOR: HOOKS - USER INFO
    ==================================================*/

    useEffect( () =>
    {
        // TODO: Cookies
        // Get current userID (and maybe name/team/color) from cookies
        // If ID is not present, auth page has failed to store cookie
        // let userID = this.getCookie('user-id')
        // this.set_user_ID( userID )
    })

    /*================================================
        ANCHOR: HOOKS - WEBSOCKET COMMUNICATION
    ==================================================*/

    useEffect( () =>
    {
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
                        dispatch( addUser( updateData.user ) )
                        // TODO: also update userTotal
                        // console.log('======= END - HANDLER - userConnected =======')
                        break
                    }
    
                /*======================================*/
                /*======================================*/  
    
                case 'clientDisconnected':
                    {
                        // This handler is only fired when OTHER users leave
                        // console.log('======= HANDLER - clientDisconnected =======')
                        dispatch( deleteUser( updateData.userID ) )
                        // TODO: also update userTotal
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
                //     {
                //         break
                //     }

                /*======================================*/
                /*======================================*/

                // case 'updateClearHighlights':
                //     {
                //         break
                //     }

                /*================================================
                    ANCHOR: HANDLER - CARD CHOOSING
                ==================================================*/

                // case 'updateCardChoose':
                //     {
                //         break
                //     }
    
                /*======================================*/
                /*======================================*/
    
                default:
                    {
                        console.log('Unrecognized WebSocket message type')
                        break
                    }
    
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

    // TODO: ==> teamSelect
    const teamSelect = ( positionButton, colorCardTeam ) =>
    {
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
        { sendUserTeam( user, colorCardTeam ); sendUserPosition( user, positionButton ) }
        if ( !isOnTeam && isTeamCardRed && isButtonSpymaster )
        { sendUserTeam( user, colorCardTeam ); sendUserPosition( user, positionButton ) }
        if ( !isOnTeam && isTeamCardBlue && isButtonOperative )
        { sendUserTeam( user, colorCardTeam ); sendUserPosition( user, positionButton ) }
        if ( !isOnTeam && isTeamCardBlue && isButtonSpymaster )
        { sendUserTeam( user, colorCardTeam ); sendUserPosition( user, positionButton ) }

        // > User is already on a team
        if ( isOnTeam && isTeamCardRed && isSameTeam && isUserOperative && isButtonSpymaster )
        { sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardRed && isSameTeam && isUserSpymaster && isButtonOperative )
        { sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardRed && !isSameTeam && isUserOperative && isButtonOperative )
        { sendUserTeam( user, colorCardTeam ) }
        if ( isOnTeam && isTeamCardRed && !isSameTeam && isUserOperative && isButtonSpymaster )
        { sendUserTeam( user, colorCardTeam ); sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardRed && !isSameTeam && isUserSpymaster && isButtonOperative )
        { sendUserTeam( user, colorCardTeam ); sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardRed && !isSameTeam && isUserSpymaster && isButtonSpymaster )
        { sendUserTeam( user, colorCardTeam ) }
        if ( isOnTeam && isTeamCardBlue && isSameTeam && isUserOperative && isButtonSpymaster )
        { sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardBlue && isSameTeam && isUserSpymaster && isButtonOperative )
        { sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardBlue && !isSameTeam && isUserOperative && isButtonOperative )
        { sendUserTeam( user, colorCardTeam ) }
        if ( isOnTeam && isTeamCardBlue && !isSameTeam && isUserOperative && isButtonSpymaster )
        { sendUserTeam( user, colorCardTeam ); sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardBlue && !isSameTeam && isUserSpymaster && isButtonOperative )
        { sendUserTeam( user, colorCardTeam ); sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardBlue && !isSameTeam && isUserSpymaster && isButtonSpymaster )
        { sendUserTeam( user, colorCardTeam ) }
    }

    /*================================================
        ANCHOR: FUNCTIONAL METHODS - General
    ==================================================*/

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
        ANCHOR: DISPLAYING
    ==================================================*/

    // TODO: ==> displayCards
    const displayCards = () =>
    {
        if ( !( cards.length === undefined ) && ( cards.length ) )
        {
            let cardArray  = []
            let positionData = {}
            for ( let i = 0; i < cards.length; i++ )
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
                let highlights = this.get_card_highlights( cards[i].index )
                if ( !( highlights === undefined ) && ( highlights.length ) )
                { console.log('==> displayCards > highlights: ', highlights) }

                cardArray.push(
                    <GameCard
                        key={i}
                        highlights    ={highlights}
                        positionData  ={positionData}
                        user          ={user}
                        card          ={cards[i]}
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
        <main
            className={'codenames'+' '+gameState+' '+user.position}
            style={{width: dimensions.appWidth+'px', height: dimensions.appHeight+'px'}}
        >
            <div className='bg-texture-layer'>
                <div className='scaler' style={{transform: 'scale('+dimensions.appScaler+')'}}>
                    <div className='container-app'>

                        <GameMenu />

                        <div className='container-header'>
                            <GameHeader />
                            <GameInstruction />
                        </div>

                        <div className='container-sidebar sidebar-left'>
                            <TeamCard
                                team      ={teamRed.name}
                                teamData  ={teamRed}
                                teamSelect={this.teamSelect}
                            />
                        </div>    
                                                
                        <div className='container-board'>
                            {displayCards()}
                            <GameInputs
                                sendClue     ={this.sendClue}
                            />
                        </div>

                        <div className='container-sidebar sidebar-right'>
                            <TeamCard
                                team      ={teamBlue.name}
                                teamData  ={teamBlue}
                                teamSelect={this.teamSelect}
                            />
                            <GameLog />
                        </div>

                        <div className='dev-tools left'>
                            <ul>
                                <li><span>Game State: </span> {gameState}</li>
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
                            <input type='text' className='name-input' placeholder='Name' defaultValue='' onKeyDown={on_dev_name} />
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
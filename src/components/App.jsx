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

/*======================================*/
import {
    setCards,
} from '../redux/features/cards.feature.js'
/*======================================*/
import {
    setDimensions
} from '../redux/features/dimensions.feature.js'
/*======================================*/
import {
    setGameState,
    setGameClue,
    setGameGuesses,
    setGameInstruction,
    setRound,
    incrementRound,
    decrementRound,
    setUserTotal,
    incrementUserTotal,
    decrementUserTotal,
} from '../redux/features/game.feature.js'
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
    setRedCards,
    setRedGuesses,
    setBlueCards,
    setBlueGuesses,
} from '../redux/features/teams.feature.js'
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

export default function App ()
{

    /*================================================
        ANCHOR: STATE
    ==================================================*/
    // const messages = useSelector( ( state ) => { return state['messages'].messages } )

    // Redux
    const user       = useSelector( ( state ) => { return state['user'].user } )
    const users      = useSelector( ( state ) => { return state['users'].users } )
    const cards      = useSelector( ( state ) => { return state['cards'].cards } )
    const game       = useSelector( ( state ) => { return state['game'].game } )
    const teamRed    = useSelector( ( state ) => { return state['teams'].teams.red } )
    const teamBlue   = useSelector( ( state ) => { return state['teams'].teams.blue } )
    const dimensions = useSelector( ( state ) => { return state['dimensions'].dimensions } )
    const dispatch   = useDispatch()

    // Hooks
    const [WSReady, setWSReady] = useState(false)
    const [WS, setWS] = useState(new WebSocket( C.onst.wsURL ))

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
        // let userID = getCookie('user-id')
        // set_user_ID( userID )
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
                        console.log('======= HANDLER - clientConnected =======')
        
                        // Set current user ID
                        // TODO: returning users will not do this
                        // they will get id/name from cookies/localStorage OR from here on "return check" (create a new variable)
                        console.log('> Setting ID')
                        if ( updateData.userID )
                        { dispatch( setID( updateData.userID ) ) }
    
                        // Set cards
                        if ( !( updateData.cards === undefined ) && ( updateData.cards.length ) )
                        { dispatch( setCards( updateData.cards ) ) }
        
                        // Set users
                        if ( !( updateData.users === undefined ) && ( updateData.users.length ) )
                        {
                            dispatch( setUsers( updateData.users ) )
                            dispatch( setUserTotal( updateData.users.length + 1 ) )
                        }
                        
                        // Set log
                        if ( !( updateData.gameLog === undefined ) && ( updateData.gameLog.length ) )
                        { dispatch( setLog( updateData.gameLog ) ) }
        
                        // Send current user information to server
                        let newUpdate = {
                            type: 'userConnected',
                            user: user,
                        }
                        WS.send( JSON.stringify( newUpdate ) )
                        console.log('>>>>>>>>> Message Sent - userConnected >>>>>>>>>')
                        console.log('======= END - HANDLER - clientConnected =======')
                        break
                    }
    
                /*======================================*/
                /*======================================*/
    
                case 'userConnected':
                    {
                        // This handler is only fired when OTHER users join
                        console.log('======= HANDLER - userConnected =======')
                        dispatch( addUser( updateData.user ) )
                        dispatch( incrementUserTotal() )
                        console.log('======= END - HANDLER - userConnected =======')
                        break
                    }
    
                /*======================================*/
                /*======================================*/  
    
                case 'clientDisconnected':
                    {
                        // This handler is only fired when OTHER users leave
                        console.log('======= HANDLER - clientDisconnected =======')
                        dispatch( deleteUser( updateData.userID ) )
                        dispatch( decrementUserTotal() )
                        console.log('======= END - HANDLER - clientDisconnected =======')
                        break
                    }
    
                /*================================================
                    ANCHOR: HANDLER - PLAYERS INFO
                ==================================================*/
    
                case 'updateUserName':
                    {
                        console.log('======= HANDLER - updateUserName =======')
                        if ( updateData.user.id === user.id )
                        { dispatch( setName( updateData.newName ) ) }
                        else
                        { dispatch( setUserName( updateData.user.id, updateData.newName ) ) }
                        console.log('======= END - HANDLER - updateUserName =======')
                        break
                    }
    
                /*======================================*/
                /*======================================*/
    
                case 'updateUserTeam':
                    {
                        console.log('======= HANDLER - updateUserTeam =======')
                        if ( updateData.user.id === user.id )
                        { dispatch( setTeam( updateData.newTeam ) ) }
                        else
                        { dispatch( setUserTeam( updateData.user.id, updateData.newTeam ) ) }
                        console.log('======= END - HANDLER - updateUserTeam =======')
                        break
                    }
    
                /*======================================*/
                /*======================================*/
    
                case 'updateUserPosition':
                    {
                        console.log('======= HANDLER - updateUserPosition =======')
                        if ( updateData.user.id === user.id )
                        { dispatch( setPosition( updateData.newPosition ) ) }
                        else
                        { dispatch( setUserPosition( updateData.user.id, updateData.newPosition ) ) }
                        console.log('======= END - HANDLER - updateUserPosition =======')
                        break
                    }
    
                /*======================================*/
                /*======================================*/
    
                case 'updateUserIsHost':
                    {
                        console.log('======= HANDLER - updateUserIsHost =======')
                        if ( updateData.user.id === user.id )
                        {
                            dispatch( setIsHost( true ) )
                            dispatch( removeUsersIsHost() )
                        }
                        else
                        {
                            dispatch( setIsHost( false ) )
                            dispatch( setUserIsHost( updateData.user.id ) )
                        }
                        console.log('======= END - HANDLER - updateUserIsHost =======')
                        break
                    }
                
                /*================================================
                    ANCHOR: HANDLER - HIGHLIGHTS
                ==================================================*/

                case 'updateAddHighlight':
                    {
                        console.log('======= HANDLER - updateAddHighlight =======')
                        if ( updateData.user.id === user.id )
                        { dispatch( addHighlight( updateData.highlight ) ) }
                        else
                        { dispatch( addUserHighlight( updateData.user.id, updateData.highlight ) ) }
                        console.log('======= END - HANDLER - updateAddHighlight =======')
                        break
                    }

                /*======================================*/
                /*======================================*/

                case 'updateDeleteHighlight':
                    {
                        console.log('======= HANDLER - updateDeleteHighlight =======')
                        if ( updateData.user.id === user.id )
                        { dispatch( deleteHighlight( updateData.highlight.index ) ) }
                        else
                        { dispatch( deleteUserHighlight( updateData.user.id, updateData.highlight.index ) ) }
                        console.log('======= END - HANDLER - updateDeleteHighlight =======')
                        break
                    }

                /*======================================*/
                /*======================================*/

                // TODO: ==> updateClearCardHighlights
                // case 'updateClearCardHighlights':
                //     {
                //         break
                //     }

                /*======================================*/
                /*======================================*/

                // TODO: ==> updateClearHighlights
                // case 'updateClearHighlights':
                //     {
                //         break
                //     }

                /*================================================
                    ANCHOR: HANDLER - CARD CHOOSING
                ==================================================*/

                // TODO: ==> updateCardChoose
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
        ANCHOR: WS SENDERS - USER INFO
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
        WS.send( JSON.stringify( newUpdate ))
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
        WS.send( JSON.stringify( newUpdate ))
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
        WS.send( JSON.stringify( newUpdate ))
        console.log('>>>>>>>>> Message Sent - updateUserPosition >>>>>>>>>')
        console.log('===> END - sendUserPosition')
    }

    /*================================================
        ANCHOR: WS SENDERS - INTERACTIONS
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
        // WS.send( JSON.stringify( newUpdate ))
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
            addHighlight( user, cardIndex )
            let newUpdate = {
                type: 'updateAddHighlight',
                user: user,
                index: cardIndex,
            }
            WS.send( JSON.stringify( newUpdate ))
            console.log('>>>>>>>>> Message Sent - updateAddHighlight >>>>>>>>>')
        }
        else
        {
            removeHighlight( user, cardIndex )
            let newUpdate = {
                type: 'updateRemoveHighlight',
                user: user,
                index: cardIndex,
            }
            WS.send( JSON.stringify( newUpdate ))
            console.log('>>>>>>>>> Message Sent - updateRemoveHighlight >>>>>>>>>')
        }
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
                let highlights = get_card_highlights( cards[i].index )
                if ( !( highlights === undefined ) && ( highlights.length ) )
                { console.log('==> displayCards > highlights: ', highlights) }

                cardArray.push(
                    <GameCard
                        key={i}
                        highlights    ={highlights}
                        positionData  ={positionData}
                        card          ={cards[i]}
                        sendCard      ={sendCard}
                        sendHighlight ={sendHighlight}
                    />
                )
            }
            return cardArray
        }
    }

    /*================================================
        ANCHOR: DEV TOOLS
    ==================================================*/

    // const onDevState = ( state ) => { set_game_state( state ) }
    // const on_dev_log = () => { set_log( C.onst.fakeLog ) }
    // const on_dev_name = e => { if(e.keyCode === 13) { set_user_name( user, e.target.value ) } }
    // const devListUsers = () => {
    //     let str = ''
    //     for ( let i = 0; i < users.length; i++ )
    //     {str += users[i].name; if( users[i].isHost ) { str += '[host]' } str += ', '}
    //     return str
    // }
    // const devListHighlights = () => {
    //     let str = ''
    //     for ( let i = 0; i < user.highlights.length; i++ )
    //     {str += user.highlights[i]; str += ', ' }
    //     return str
    // }

    /*================================================
        ANCHOR: COMPONENTS
    ==================================================*/

    return (
        <main
            className={'codenames'+' '+game.state+' '+user.position}
            style={{
                width: dimensions.appWidth+'px',
                height: dimensions.appHeight+'px'
            }}
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
                                team={teamRed}
                                sendUserName={sendUserName}
                                sendUserPosition={sendUserPosition}
                            />
                        </div>    
                                                
                        <div className='container-board'>
                            {displayCards()}
                            <GameInputs
                                sendClue={sendClue}
                            />
                        </div>

                        <div className='container-sidebar sidebar-right'>
                            <TeamCard
                                team={teamBlue}
                                sendUserName={sendUserName}
                                sendUserPosition={sendUserPosition}
                            />
                            <GameLog />
                        </div>

                        <div className='dev-tools left'>
                            <ul>
                                <li><span>Game State: </span> {game.state}</li>
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
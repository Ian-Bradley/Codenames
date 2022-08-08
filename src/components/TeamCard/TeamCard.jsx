import React from 'react'
import { useSelector } from 'react-redux'

// COMPONENETS
import Button from '../Button/Button.jsx'

// CSS + GLOBAL CONSTANTS
import { default as C } from '../../util/constants.js'
import './TeamCard.scss'

/**
 * @props team (Object) Team data for remaining guesses and cards
 * @props sendUserTeam (Function)
 * @props sendUserPosition (Function)
 */

export default function TeamCard ( props ) {

    /*================================================
        ANCHOR STATES
    ==================================================*/

    const user  = useSelector( ( state ) => { return state['user'].user } )
    const users = useSelector( ( state ) => { return state['users'].users } )
    const game  = useSelector( ( state ) => { return state['game'].game } )

    /*================================================
        ANCHOR HELPER
    ==================================================*/

    const countPositions = ( user, users, team, position ) => {
        let count = 0
        for ( let i = 0; i < users.length; i++ ) {
            if ( ( users[i].team === team ) && ( users[i].position === position ) ) {
                count++
            }
        }
        if ( ( user.team === team ) && ( user.position === position ) ) {
            count++
        }
        return count
    }

    /*================================================
        ANCHOR: INTERACTIONS
    ==================================================*/

    const onSelectPosition = ( positionButton ) => {
        let colorUserTeam = user.team
        let positionUser  = user.position

        const isOnTeam          = colorUserTeam
        const isTeamCardRed     = ( props.team     === C.RED         )
        const isTeamCardBlue    = ( props.team     === C.BLUE        )
        const isSameTeam        = ( props.team     === colorUserTeam )
        const isUserOperative   = ( positionUser   === C.OPERATIVE   )
        const isUserSpymaster   = ( positionUser   === C.SPYMASTER   )
        const isButtonOperative = ( positionButton === C.OPERATIVE   )
        const isButtonSpymaster = ( positionButton === C.SPYMASTER   )

        // > User does not have a team
        if ( !isOnTeam && isTeamCardRed && isButtonOperative )
        { props.sendUserTeam( user, props.team ); props.sendUserPosition( user, positionButton ) }
        if ( !isOnTeam && isTeamCardRed && isButtonSpymaster )
        { props.sendUserTeam( user, props.team ); props.sendUserPosition( user, positionButton ) }
        if ( !isOnTeam && isTeamCardBlue && isButtonOperative )
        { props.sendUserTeam( user, props.team ); props.sendUserPosition( user, positionButton ) }
        if ( !isOnTeam && isTeamCardBlue && isButtonSpymaster )
        { props.sendUserTeam( user, props.team ); props.sendUserPosition( user, positionButton ) }

        // > User is already on a team
        if ( isOnTeam && isTeamCardRed && isSameTeam && isUserOperative && isButtonSpymaster )
        { props.sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardRed && isSameTeam && isUserSpymaster && isButtonOperative )
        { props.sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardRed && !isSameTeam && isUserOperative && isButtonOperative )
        { props.sendUserTeam( user, props.team ) }
        if ( isOnTeam && isTeamCardRed && !isSameTeam && isUserOperative && isButtonSpymaster )
        { props.sendUserTeam( user, props.team ); props.sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardRed && !isSameTeam && isUserSpymaster && isButtonOperative )
        { props.sendUserTeam( user, props.team ); props.sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardRed && !isSameTeam && isUserSpymaster && isButtonSpymaster )
        { props.sendUserTeam( user, props.team ) }
        if ( isOnTeam && isTeamCardBlue && isSameTeam && isUserOperative && isButtonSpymaster )
        { props.sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardBlue && isSameTeam && isUserSpymaster && isButtonOperative )
        { props.sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardBlue && !isSameTeam && isUserOperative && isButtonOperative )
        { props.sendUserTeam( user, props.team ) }
        if ( isOnTeam && isTeamCardBlue && !isSameTeam && isUserOperative && isButtonSpymaster )
        { props.sendUserTeam( user, props.team ); props.sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardBlue && !isSameTeam && isUserSpymaster && isButtonOperative )
        { props.sendUserTeam( user, props.team ); props.sendUserPosition( user, positionButton ) }
        if ( isOnTeam && isTeamCardBlue && !isSameTeam && isUserSpymaster && isButtonSpymaster )
        { props.sendUserTeam( user, props.team ) }
    }
    
    /*================================================
        ANCHOR: DISPLAYING
    ==================================================*/

    const displayTeamCardClass = () => {
        return 'team-card team-' + props.team
    }

    /*======================================*/
    /*======================================*/

    const displayUsersList = ( position ) => {
        let usersList = []

        // Connected users
        if ( !( users === undefined ) && ( users.length ) ) {
            for ( let i = 0; i < users.length; i++ ) {
                if ( ( users[i].team === props.team ) && ( users[i].position === position )) {
                    usersList.push( <li key={i}>{users[i].name}</li> )
                }
            }
        }

        // Current user
        if ( ( user.team === props.team ) && ( user.position === position ) ) {
            usersList.push( <li key={users.length}>{user.name}</li> )
        }
        return usersList
    }

    /*======================================*/
    /*======================================*/

    const displayRemainingCards = () => {
        let remaining = props.team.cards
        if ( game.state === C.GAME_STATE_SETUP ) {
            remaining = '-'
        }
        return remaining
    }

    /*======================================*/
    /*======================================*/

    const displayRemainingGuesses = () => {
        let remaining = props.team.guesses
        if ( game.state === C.GAME_STATE_SETUP) {
            return '-'
        }
        return remaining
    }

    /*======================================*/
    /*======================================*/

    const displayButtonOperative = () => {
        let operativesTotal = countPositions( user, users, props.team, C.OPERATIVE )
        if ( ( operativesTotal <= C.MAX_OPERATIVES ) && ( game.state === C.GAME_STATE_SETUP ) ) {
            return (
                <Button
                    btnValue    ={C.OPERATIVE}
                    btnClasses  ={'select-operative'}
                    btnFunction ={onSelectPosition}
                    btnText     ={'Join as Operative'}
                />
            )
        }
    }

    /*======================================*/
    /*======================================*/

    const displayButtonSpymaster = () => {
        let spymastersTotal = countPositions( user, users, props.team, C.SPYMASTER )
        if ( ( spymastersTotal <= C.MAX_SPYMASTERS ) && ( game.state === C.GAME_STATE_SETUP ) ) {
            return (
                <Button
                    btnValue    ={C.SPYMASTER}
                    btnClasses  ={'select-spymaster'}
                    btnFunction ={onSelectPosition}
                    btnText     ={'Join as Spymaster'}
                />
            )
        }
    }

    /*================================================
        ANCHOR: COMPONENTS
    ==================================================*/

    return (
        <div className={displayTeamCardClass()}>
            <div className='remaining-cards'>
                <span>{displayRemainingCards()}</span>
            </div>
            <div className='remaining-guesses'>
                <div className='team-card-title'>Guess(es)</div>
                <span>{displayRemainingGuesses()}</span>
            </div>
            <div className='team-operatives'>
                <div className='team-card-title'>Operative(s)</div>
                <ul className='team-list'>
                    {displayUsersList(C.OPERATIVE)}
                </ul>
                {displayButtonOperative()}
            </div>
            <div className='team-spymaster'>
                <div className='team-card-title'>Spymaster</div>
                <ul className='team-list'>
                    {displayUsersList(C.SPYMASTER)}
                </ul>
                {displayButtonSpymaster()}
            </div>
        </div>
    )
}
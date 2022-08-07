import React from 'react'

// COMPONENETS
import Button from '../Button/Button.jsx'

// CSS + GLOBAL CONSTANTS
import * as C from '../../helpers/constants.js'
import './TeamCard.scss'

/**
 * @props team (Object) Team data for remaining guesses and cards
 * @props sendUserTeam (Function)
 * @props sendUserPosition (Function)
 */

export default function TeamCard ( props )
{

    /*================================================
        ANCHOR STATES
    ==================================================*/

    const user  = useSelector( ( state ) => { return state['user'].user } )
    const users = useSelector( ( state ) => { return state['users'].users } )
    const game  = useSelector( ( state ) => { return state['game'].game } )

    /*================================================
        ANCHOR HELPER
    ==================================================*/

    const countPositions = ( user, users, team, position ) =>
    {
        let count = 0
        for ( let i = 0; i < users.length; i++ )
        {
            if ( ( users[i].team === team ) && ( users[i].position === position ) )
            {
                count++
            }
        }
        if ( ( user.team === team ) && ( user.position === position ) )
        {
            count++
        }
        return count
    }

    /*================================================
        ANCHOR: INTERACTIONS
    ==================================================*/

    const onSelectPosition = ( positionButton ) =>
    {
        let colorUserTeam = user.team
        let positionUser  = user.position

        const isOnTeam          = colorUserTeam
        const isTeamCardRed     = ( props.team === C.onst.red )
        const isTeamCardBlue    = ( props.team === C.onst.blue )
        const isSameTeam        = ( props.team === colorUserTeam )
        const isUserOperative   = ( positionUser === C.onst.operative )
        const isUserSpymaster   = ( positionUser === C.onst.spymaster )
        const isButtonOperative = ( positionButton === C.onst.operative )
        const isButtonSpymaster = ( positionButton === C.onst.spymaster )

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

    const displayTeamCardClass = () =>
    {
        return 'team-card team-' + props.team
    }

    /*======================================*/
    /*======================================*/

    const displayUsersList = ( position ) =>
    {
        let usersList = []

        // Connected users
        if ( !( users === undefined ) && ( users.length ) )
        {
            for ( let i = 0; i < users.length; i++ )
            {
                if ( ( users[i].team === props.team ) && ( users[i].position === position ))
                {
                    usersList.push( <li key={i}>{users[i].name}</li> )
                }
            }
        }

        // Current user
        if ( ( user.team === props.team ) && ( user.position === position ) )
        {
            usersList.push( <li key={users.length}>{user.name}</li> )
        }
        return usersList
    }

    /*======================================*/
    /*======================================*/

    const displayRemainingCards = () =>
    {
        let remaining = props.teamData.remainingCards
        if ( game.state === C.onst.gameState_setup )
        {
            remaining = '-'
        }
        return remaining
    }

    /*======================================*/
    /*======================================*/

    const displayRemainingGuesses = () =>
    {
        let remaining = props.teamData.remainingGuesses
        if ( game.state === C.onst.gameState_setup)
        {
            return '-'
        }
        return remaining
    }

    /*======================================*/
    /*======================================*/

    const displayButtonOperative = () =>
    {
        let operativesTotal = countPositions( user, users, props.team, C.onst.operative )
        if ( ( operativesTotal <= C.onst.maxOperatives ) && ( game.state === C.onst.gameState_setup ) )
        {
            return (
                <Button
                    btnValue    ={C.onst.operative}
                    btnClasses  ={'select-operative'}
                    btnFunction ={onSelectPosition}
                    btnText     ={'Join as Operative'}
                />
            )
        }
    }

    /*======================================*/
    /*======================================*/

    const displayButtonSpymaster = () =>
    {
        let spymastersTotal = countPositions( user, users, props.team, C.onst.spymaster )
        if ( ( spymastersTotal <= C.onst.maxSpymasters ) && ( game.state === C.onst.gameState_setup ) )
        {
            return (
                <Button
                    btnValue    ={C.onst.spymaster}
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
                    {displayUsersList(C.onst.operative)}
                </ul>
                {displayButtonOperative()}
            </div>
            <div className='team-spymaster'>
                <div className='team-card-title'>Spymaster</div>
                <ul className='team-list'>
                    {displayUsersList(C.onst.spymaster)}
                </ul>
                {displayButtonSpymaster()}
            </div>
        </div>
    )
}
import React from 'react'
import Button from '../Button/Button.jsx'
import * as C from '../../helpers/constants.js'
import './TeamCard.scss'

/**
 * @props team (string)          Team name/color
 * @props teamData (onject)      Team data for remaining guesses and cards
 * @props teamSelect (function) Callback function for team selecting buttons
 */

export default function TeamCard ( props )
{

    /*================================================
        ANCHOR STATES
    ==================================================*/

    const user      = useSelector( ( state ) => { return state['user'].user } )
    const users     = useSelector( ( state ) => { return state['users'].users } )
    const gameState = useSelector( ( state ) => { return state['gameState'].gameState } )

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
        props.teamSelect( positionButton, props.team )
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
        if ( gameState === C.onst.gameState_setup )
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
        if ( gameState === C.onst.gameState_setup)
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
        if ( ( operativesTotal <= C.onst.maxOperatives ) && ( gameState === C.onst.gameState_setup ) )
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
        if ( ( spymastersTotal <= C.onst.maxSpymasters ) && ( gameState === C.onst.gameState_setup ) )
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
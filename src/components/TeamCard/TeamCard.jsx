import React from 'react'
import Button from '../Button/Button.jsx'
import * as C from '../../helpers/constants.js'
import './TeamCard.scss'

/**
 * @props team (string)          Team name/color
 * @props teamData (onject)      Team data for remaining guesses and cards
 * @props users (array)          Current connected users list
 * @props gameState (string)     Current state of the game
 * @props team_select (function) Callback function for team selecting buttons
 * @props user (object)   Current user information
 */

export default function TeamCard ( props )
{

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
        props.team_select( positionButton, props.team )
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
        let users = []

        // Connected users
        if ( !( props.users === undefined ) && ( props.users.length ) )
        {
            for ( let i = 0; i < props.users.length; i++ )
            {
                if ( ( props.users[i].team === props.team ) && ( props.users[i].position === position ))
                {
                    users.push( <li key={i}>{props.users[i].name}</li> )
                }
            }
        }

        // Current user
        if ( ( props.user.team === props.team ) && ( props.user.position === position ) )
        {
            users.push( <li key={props.users.length}>{props.user.name}</li> )
        }
        return users
    }

    /*======================================*/
    /*======================================*/

    const displayRemainingCards = () =>
    {
        let remaining = props.teamData.remainingCards
        if ( props.gameState === C.onst.gameState_setup )
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
        if ( props.gameState === C.onst.gameState_setup)
        {
            return '-'
        }
        return remaining
    }

    /*======================================*/
    /*======================================*/

    const displayButtonOperative = () =>
    {
        let operativesTotal = countPositions( props.user, props.users, props.team, C.onst.operative )
        if ( ( operativesTotal <= C.onst.maxOperatives ) && ( props.gameState === C.onst.gameState_setup ) )
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
        let spymastersTotal = countPositions( props.user, props.users, props.team, C.onst.spymaster )
        if ( ( spymastersTotal <= C.onst.maxSpymasters ) && ( props.gameState === C.onst.gameState_setup ) )
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
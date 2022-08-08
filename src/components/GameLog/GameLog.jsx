import React from 'react'
import { useSelector } from 'react-redux'
import { default as C } from '../../util/constants.js'
import './GameLog.scss'

/*
logItem (Object)
    type (String)
    name (String)
    team (String)
    text (String)
*/

export default function log ( props ) {
    /*================================================
        ANCHOR: STATES
    ==================================================*/

    const log       = useSelector( ( state ) => { return state['log'].log } )
    const gameState = useSelector( ( state ) => { return state['game'].game.state } )

    /*================================================
        ANCHOR: DISPLAYING
    ==================================================*/

    const displayLogItems = () => {
        if ( !( log === undefined ) && ( log.length ) ) {
            let gameLog = []
            for ( let i = 0; i < log.length; i++ ) {
                switch( log[i].type ) {

                    case 'clue': {
                        gameLog.push(
                            <li key={i} className={'team-' + log[i].team}>
                                <span>{log[i].name}</span> gives clue <span className='game-log-clue'>{log[i].text}</span>
                            </li>
                        )
                        break
                    }

                    case 'choose': {
                        gameLog.push(
                            <li key={i} className={'team-' + log[i].team}>
                                <span>{log[i].name}</span> taps <span className={'card-' + log[i].team}>{log[i].text}</span>
                            </li>
                        )
                        break
                    }
        
                    case 'end': {
                        gameLog.push(
                            <li key={i} className={'team-' + log[i].team}>
                                <span>{log[i].name}</span> ends guessing
                            </li>
                        )
                        break
                    }
        
                    case 'victory': {
                        gameLog.push(
                            <li key={i} className={'team-' + log[i].team + ' victory'}>
                                <span>{log[i].team} team</span> <span>wins</span>
                            </li>
                        )
                        break
                    }
                    default:
                }
            }
            return gameLog
        }
    }

    /*======================================*/
    /*======================================*/


    const displayLogClasses = (  ) => {
        let logClasses = 'game-log'
        if ( gameState !== C.GAME_STATE_SETUP ) {
            logClasses += ' ' + C.CLASS_ACTIVE
        }
        return logClasses
    }

    /*================================================
        ANCHOR: COMPONENTS
    ==================================================*/

    return (
        <div className={displayLogClasses()}>
            <div className='game-log-title'>
                Game Log
            </div>
            <div className='game-log-list'>
                <ul>
                    {displayLogItems()}
                </ul>
            </div>
        </div>
    )
}
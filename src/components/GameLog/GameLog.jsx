import React from 'react'
import * as C from '../../helpers/constants.js'
import './GameLog.scss'

export default function GameLog ( props )
{
    /*================================================
        ANCHOR: STATES
    ==================================================*/

    const gameLog = useSelector( ( state ) => { return state['log'].log } )
    const gameState = useSelector( ( state ) => { return state['gameState'].gameState } )

    /*================================================
        ANCHOR: INTERACTIONS
    ==================================================*/


    /*================================================
        ANCHOR: DISPLAYING
    ==================================================*/

    const displayLogItems = () =>
    {
        // console.log('===> display_log_items')
        // console.log('gameLog: ', gameLog)
        if ( !( gameLog === undefined ) && ( gameLog.length ) )
        {
            let log = []
            // console.log('> Before Log Loop')
            for ( let i = 0; i < gameLog.length; i++ )
            {
                // console.log('gameLog[i].type: ', gameLog[i].type)
                switch( gameLog[i].type )
                {
                    case 'clue':
                    {
                        // console.log('> Case: clue')
                        log.push(
                            <li key={i} className={'team-' + gameLog[i].team}>
                                <span>{gameLog[i].name}</span> gives clue <span className='game-log-clue'>{gameLog[i].text}</span>
                            </li>
                        )
                        break
                    }

                    case 'choose':
                    {
                        // console.log('> Case: choose')
                        log.push(
                            <li key={i} className={'team-' + gameLog[i].team}>
                                <span>{gameLog[i].name}</span> taps <span className={'card-' + gameLog[i].team}>{gameLog[i].text}</span>
                            </li>
                        )
                        break
                    }
        
                    case 'end':
                    {
                        // console.log('> Case: end')
                        log.push(
                            <li key={i} className={'team-' + gameLog[i].team}>
                                <span>{gameLog[i].name}</span> ends guessing
                            </li>
                        )
                        break
                    }
        
                    case 'victory':
                    {
                        // console.log('> Case: victory')
                        log.push(
                            <li key={i} className={'team-' + gameLog[i].team + ' victory'}>
                                <span>{gameLog[i].team} team</span> <span>wins</span>
                            </li>
                        )
                        break
                    }
                    default:
                }
            }
            // console.log('===> END - display_log_items')
            return log
        }
    }

    /*======================================*/
    /*======================================*/


    const displayLogClasses = (  ) =>
    {
        let logClasses = 'game-log'
        if ( gameState !== C.onst.gameState_setup )
        {
            logClasses += ' ' + C.onst.classActive
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
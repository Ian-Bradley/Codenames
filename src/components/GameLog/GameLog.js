import React, { Component } from 'react';
import * as C from '../../constants.js'
import './gameLog.scss';

export default class gameLog extends Component
{

    render()
    {
        /*======================================
            RENDER FUNCTIONS - Displaying
        ========================================*/

        const display_log_items = () =>
        {
            // console.log('===> display_log_items');
            let gameLog = this.props.gameLog;
            // console.log('gameLog: ', gameLog);
            if ( !( gameLog === undefined ) && ( gameLog.length ) )
            {
                let log = [];
                // console.log('> Before Log Loop');
                for ( let i = 0; i < gameLog.length; i++ )
                {
                    // console.log('gameLog[i].itemType: ', gameLog[i].itemType);
                    switch( gameLog[i].itemType )
                    {
                        case 'clue':
                        {
                            // console.log('> Case: clue');
                            log.push(
                                <li key={i} className={'team-' + gameLog[i].player.team}>
                                    <span>{gameLog[i].player.name}</span> gives clue <span className='game-log-clue'>{gameLog[i].clue}</span>
                                </li>
                            );
                            break;
                        }

                        case 'choose':
                        {
                            // console.log('> Case: choose');
                            log.push(
                                <li key={i} className={'team-' + gameLog[i].player.team}>
                                    <span>{gameLog[i].player.name}</span> taps <span className={'card-' + gameLog[i].player.team}>{gameLog[i].cardText}</span>
                                </li>
                            );
                            break;
                        }
            
                        case 'end':
                        {
                            // console.log('> Case: end');
                            log.push(
                                <li key={i} className={'team-' + gameLog[i].player.team}>
                                    <span>{gameLog[i].player.name}</span> ends guessing
                                </li>
                            );
                            break;
                        }
            
                        case 'victory':
                        {
                            // console.log('> Case: victory');
                            log.push(
                                <li key={i} className={'team-' + gameLog[i].player.team + ' victory'}>
                                    <span>{gameLog[i].player.team} team</span> <span>wins</span>
                                </li>
                            );
                            break;
                        }
                        default:
                    }
                }
                // console.log('===> END - display_log_items');
                return log;
            }
        }

        /*======================================*/
        /*======================================*/


        const display_log_classes = (  ) =>
        {
            let logClasses = 'game-log';
            if ( this.props.gameState !== C.onst.gameState_setup )
            {
                logClasses += ' ' + C.onst.classActive;
            }
            return logClasses;
        }

        /*======================================
            COMPONENTS
        ========================================*/

        return (
            <div className={display_log_classes()}>
                <div className='game-log-title'>
                    Game Log
                </div>
                <div className='game-log-list'>
                    <ul>
                        {display_log_items()}
                    </ul>
                </div>
            </div>
        );
    }
}
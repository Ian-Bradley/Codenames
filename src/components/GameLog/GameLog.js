import React, { Component } from 'react';
import * as C from '../../constants.js'
import './GameLog.scss';

export default class GameLog extends Component
{

    render()
    {
        /*======================================
            RENDER FUNCTIONS - Displaying
        ========================================*/

        const display_log_items = () =>
        {
            const gameLog = this.props.gameLog;
            if ( !( gameLog === undefined ) && ( gameLog.length ) )
            {
                let log = [];
                for ( let i = 0; i < gameLog; i++ )
                {
                    switch( gamelog[i].itemType )
                    {
                        case 'clue':
                        {
                            log.push(
                                <li className={'team-' + gameLog[i].player.team}>
                                    <span>{gameLog[i].player.name}</span> gives clue <span className='game-log-clue'>{gamelog[i].clue}</span>
                                </li>
                            );
                        }

                        case 'choose':
                        {
                            log.push(
                                <li className={'team-' + gameLog[i].player.team}>
                                    <span>{gameLog[i].player.name}</span> taps <span className={'card-' + gameLog[i].player.team}>{gamelog[i].cardText}</span>
                                </li>
                            );
                        }
            
                        case 'end':
                        {
                            log.push(
                                <li className={'team-' + gameLog[i].player.team}>
                                    <span>{gameLog[i].player.name}</span> ends guessing
                                </li>
                            );
                        }
            
                        case 'victory':
                        {
                            log.push(
                                <li className={'team-' + gameLog[i].player.team + ' victory'}>
                                    <span>{gameLog[i].player.team} team</span> <span>wins</span>
                                </li>
                            );
                        }
                        default:
                    }
                }
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
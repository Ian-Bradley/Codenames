import React, { Component } from 'react';
import './GameLog.scss';

export default class GameLog extends Component
{
    /*======================================
        RENDER FUNCTIONS
    ========================================*/

    render()
    {

        const create_log_item = ( itemType, teamColor ) =>
        {
            const logItem = document.createElement('li');
            const logName = document.createElement('span');
            const logClueOrCard = document.createElement('span');

            switch(itemType)
            {
                case 'clue':
                {
                    // const codename = document.createTextNode('give clue');
                    break;
                }

                case 'select':
                {
                    
                    break;
                }

                case 'end':
                {
                    
                    break;
                }

                default:
            }

            logItem.className = `team-${teamColor}`;
            logItem.appendChild(codename);
            document.querySelector('.game-log-list ul').appendChild(logItem);
        }

        /*======================================
            COMPONENTS
        ========================================*/

        return (
            <div className='game-log'>
                <div className='game-log-title'>
                    Game Log
                </div>
                <div className='game-log-list'>
                    <ul>
                        {/* <li className='team-blue'><span>Spymaster</span> gives clue <span className='game-log-clue'>CLUE</span></li>
                        <li className='team-blue'><span>Operative</span> taps <span className='card-blue'>CARD</span></li>
                        <li className='team-blue'><span>Operative</span> taps <span className='card-blue'>CARD</span></li>
                        <li className='team-blue'><span>Operative</span> ends guessing</li>
                        <li className='team-red'><span>Spymaster</span> gives clue <span className='game-log-clue'>CLUE</span></li>
                        <li className='team-red'><span>Operative</span> taps <span className='card-red'>CARD</span></li>
                        <li className='team-red'><span>Operative</span> taps <span className='card-red'>CARD</span></li>
                        <li className='team-red'><span>Operative</span> ends guessing</li> */}
                    </ul>
                </div>
            </div>
        );
    }
}
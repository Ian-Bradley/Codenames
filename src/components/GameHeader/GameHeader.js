import React from 'react';
import Button from '../Button/Button.js';
import IconFace from '../../images/icons/face.svg';
import IconUser from '../../images/icons/user.svg';
import IconQuestion from '../../images/icons/question.svg';
import IconStopwatch from '../../images/icons/stopwatch.svg';
import * as C from '../../constants.js'
import './GameHeader.scss';

/**
 * @props players (array)        Current connected players list
 * @props playersTotal (number)  Total amount of players
 * @props currentPlayer (object) Current player information
 */

export default function GameHeader ( props )
{

    /*======================================
        RENDER FUNCTIONS - Interactions
    ========================================*/

    const on_game_players = () =>
    {
        console.log('===> on_game_players');
        console.log('===> END - on_game_players');
    }

    /*======================================*/
    /*======================================*/

    const on_game_timer = () =>
    {
        console.log('===> on_game_timer');
        console.log('===> END - on_game_timer');
    }

    /*======================================*/
    /*======================================*/

    const on_game_info = () =>
    {
        console.log('===> on_game_info');
        console.log('===> END - on_game_info');
    }

    /*======================================*/
    /*======================================*/

    const on_game_reset = () =>
    {
        console.log('===> on_game_reset');
        console.log('===> END - on_game_reset');
    }

    /*======================================*/
    /*======================================*/
    
    const on_game_current_player = () =>
    {
        console.log('===> on_game_current_player');
        console.log('===> END - on_game_current_player');
    }

    /*======================================
        RENDER FUNCTIONS - Displaying
    ========================================*/

    const display_button_reset = () =>
    {
        if ( props.currentPlayer.isHost )
        {
            return (
                <Button
                    btnClasses  ={'game-reset'}
                    btnFunction ={on_game_reset}
                    btnText     ={'Reset Game'}
                />
            )
        }   
    }

    /*======================================
        COMPONENTS
    ========================================*/

    return (
        <div className='game-header'>
            <div className='game-controls-left'>
                <Button
                    btnClasses  ={'game-players'}
                    btnFunction ={on_game_players}
                    btnText     ={'Players'}
                    btnIcon     ={IconUser}
                    btnData     ={props.playersTotal}
                />
                <Button
                    btnDisplayClasses ={C.onst.classDisabled}
                    btnClasses        ={'game-timer'}
                    btnFunction       ={on_game_timer}
                    btnIcon           ={IconStopwatch}
                />
                <Button
                    btnClasses  ={'game-info'}
                    btnFunction ={on_game_info}
                    btnIcon     ={IconQuestion}
                />
            </div>
            <div className='game-controls-right'>
                {display_button_reset()}
                <Button
                    btnClasses  ={'game-current-player button-' + props.currentPlayer.team}
                    btnFunction ={on_game_current_player}
                    btnText     ={props.currentPlayer.name}
                    btnIcon     ={IconFace}
                />
            </div>
        </div>
    );
}
import React from 'react';
import Button from '../Button/Button.js';
import './GameMenu.scss';

/**
 * @props isHost (boolean)     Flag for game host
 * @props gameState (string)   Current state of the game
 * @props menu_action (string) Handler function for menu buttons
 */

export default function GameMenu ( props ) {

    /*======================================
        RENDER FUNCTIONS - Interactions
    ========================================*/

    const on_randomize_teams = () =>
    {
        console.log('==> on_randomize_teams');
        // props.menu_action();
        console.log('==> END - on_randomize_teams');
    }

    /*======================================*/
    /*======================================*/

    const on_reset_teams = () =>
    {
        console.log('===> on_reset_teams');
        // props.menu_action();
        console.log('===> END - on_reset_teams');
    }

    /*======================================*/
    /*======================================*/

    const on_start_new_game = () =>
    {
        console.log('===> on_start_new_game');
        // props.menu_action();
        console.log('===> END - on_start_new_game');
    }

    /*======================================
        RENDER FUNCTIONS - Displaying
    ========================================*/

    const display_button_classes = () =>
    {
        if ( props.currentPlayer.isHost )
        {
            return [
                (<Button
                    key         ={0}
                    btnClasses  ={'randomize-teams'}
                    btnFunction ={on_randomize_teams}
                    btnText     ={'Randomize Teams'}
                />),
                (<Button
                    key         ={1}
                    btnClasses  ={'reset-teams'}
                    btnFunction ={on_reset_teams}
                    btnText     ={'Reset Teams'}
                />),
                (<Button
                    key         ={2}
                    btnClasses  ={'start-new-game button-green'}
                    btnFunction ={on_start_new_game}
                    btnText     ={'Start New Game'}
                />)
            ]
        }
    }
    
    /*======================================
        COMPONENTS
    ========================================*/

    return (
        <div className='game-menu'>
            <div className='game-title'>
                <span>C</span>ODENAMES
            </div>

            <div className='game-menu-buttons'>
                {display_button_classes()}
            </div>
        </div>
    );
}
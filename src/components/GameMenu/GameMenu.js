import React, { Component } from 'react';
import Button from '../Button/Button.js';
import * as C from '../../constants.js'
import './GameMenu.scss';

export default class GameMenu extends Component
{

    render()
    {
        /*======================================
            RENDER FUNCTIONS - Interactions
        ========================================*/

        const on_randomize_teams = () =>
        {
            console.log('on_randomize_teams');
        }

        /*======================================*/
        /*======================================*/

        const on_reset_teams = () =>
        {
            console.log('on_reset_teams');
        }

        /*======================================*/
        /*======================================*/

        const on_start_new_game = () =>
        {
            console.log('on_start_new_game');
            // this.props_set_game_state( C.onst.gameState_deal );
        }

        /*======================================
            RENDER FUNCTIONS - Displaying
        ========================================*/

        const display_button_classes = () =>
        {
            let displayClass = '';
            if ( !this.props.currentPlayer.isHost )
            { displayClass = C.onst.classHidden; }
            return displayClass;
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
                    <Button
                        btnDisplayClasses ={display_button_classes()}
                        btnClasses        ={'randomize-teams'}
                        btnFunction       ={on_randomize_teams}
                        btnText           ={'Randomize Teams'}
                    />
                    <Button
                        btnDisplayClasses ={display_button_classes()}
                        btnClasses        ={'reset-teams'}
                        btnFunction       ={on_reset_teams}
                        btnText           ={'Reset Teams'}
                    />
                    <Button
                        btnDisplayClasses ={display_button_classes()}
                        btnClasses        ={'start-new-game button-green'}
                        btnFunction       ={on_start_new_game}
                        btnText           ={'Start New Game'}
                    />
                </div>
            </div>
        );
    }
}
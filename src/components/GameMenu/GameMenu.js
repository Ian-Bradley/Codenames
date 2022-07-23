import React, { Component } from 'react';
import Button from '../Button/Button.js';
import * as C from '../../constants.js'
import './GameMenu.scss';

export default class GameMenu extends Component
{
    /*======================================
        RENDER FUNCTIONS
    ========================================*/

    render()
    {

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

        /*======================================*/
        /*======================================*/

        const display_button_menu = () =>
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
                        btnContainerClasses={display_button_menu()}
                        btnClasses={'randomize-teams'}
                        btnFunction={on_randomize_teams}
                        btnText={'Randomize Teams'}
                    />
                    <Button
                        btnContainerClasses={display_button_menu()}
                        btnClasses={'reset-teams'}
                        btnFunction={on_reset_teams}
                        btnText={'Reset Teams'}
                    />
                    <Button
                        btnContainerClasses={display_button_menu()}
                        btnClasses={'start-new-game button-green'}
                        btnFunction={on_start_new_game}
                        btnText={'Start New Game'}
                    />
                </div>
            </div>
        );
    }
}
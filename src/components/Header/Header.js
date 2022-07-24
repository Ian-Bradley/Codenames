import React, { Component } from 'react';
import Button from '../Button/Button.js';
import IconFace from '../../images/icons/face.svg';
import IconUser from '../../images/icons/user.svg';
import IconQuestion from '../../images/icons/question.svg';
import IconStopwatch from '../../images/icons/stopwatch.svg';
import * as C from '../../constants.js'
import './Header.scss';

export default class Header extends Component
{

    render()
    {

        /*======================================
            RENDER FUNCTIONS - Player Interactions
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
            let displayClass = '';
            if ( !this.props.currentPlayer.isHost )
            { displayClass = C.onst.classHidden; }
            return displayClass;
        }

        /*======================================
            COMPONENTS
        ========================================*/

        return (
            <div className='game-header'>
                <div className='game-controls-left'>
                    <Button
                        btnClasses={'game-players'}
                        btnFunction={on_game_players}
                        btnText={'Players'}
                        btnIcon={IconUser}
                        btnData={this.props.playersTotal}
                    />
                    <Button
                        btnContainerClasses={C.onst.classDisabled}
                        btnClasses={'game-timer'}
                        btnFunction={on_game_timer}
                        btnIcon={IconStopwatch}
                    />
                    <Button
                        btnClasses={'game-info'}
                        btnFunction={on_game_info}
                        btnIcon={IconQuestion}
                    />
                </div>
                <div className='game-controls-right'>
                    <Button
                        btnContainerClasses={display_button_reset()}
                        btnClasses={'game-reset'}
                        btnFunction={on_game_reset}
                        btnText={'Reset Game'}
                    />
                    <Button
                        btnClasses={'game-current-player button-' + this.props.currentPlayer.team}
                        btnFunction={on_game_current_player}
                        btnText={this.props.currentPlayer.name}
                        btnIcon={IconFace}
                    />
                </div>
            </div>
        );
    }
}
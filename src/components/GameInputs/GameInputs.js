import React from 'react';
import Button from '../Button/Button.js';
import './GameInputs.scss';

/**
 * @props teamRed (object)       Team data for remaining guesses and cards
 * @props teamBlue (object)      Team data for remaining guesses and cards
 * @props guesses (string)       Amount of guesses given by spymaster for current clue
 * @props gameState (string)     Current state of the game
 * @props clue (string)          Current clue given by spymaster
 * @props send_clue (function)   Handler function for menu buttons
 * @props currentPlayer (object) Current player information
 */

export default function GameInputs ( props ) {

    /*======================================
        RENDER FUNCTIONS - Interactions
    ========================================*/

    const on_input_change = () =>
    {
        console.log('===> on_input_change');
        console.log('===> END - on_input_change');
    }

    /*======================================*/
    /*======================================*/

    const on_select_guesses = () =>
    {
        console.log('===> on_select_guesses');
        console.log('===> END - on_select_guesses');
    }

    /*======================================*/
    /*======================================*/

    const on_give_clue = () =>
    {
        console.log('===> on_give_clue');
        // props.send_clue();
        console.log('===> END - on_give_clue');
    }

    /*======================================*/
    /*======================================*/

    const on_end_guessing = () =>
    {
        console.log('===> on_end_guessing');
        console.log('===> END - on_end_guessing');
    }

    /*======================================
        RENDER FUNCTIONS - Displaying
    ========================================*/

    const display_select_options = () =>
    {
        // if()

        // props.teamRed
        // props.teamBlue

        // for ( let i = 0; i < props..length; i++ )
        // {

        // }



    }

    /*======================================
        COMPONENTS
    ========================================*/

    return (
        <div className='game-input'>
            <div className='clue-input-container'>

                <input
                    type         ='text'
                    className    ='clue-input'
                    placeholder  ='Type your clue here'
                    defaultValue =''
                    onChange     ={on_input_change}
                />

                <div className='guess-select-container'>
                    <input
                        type         ='button'
                        className    ='guess-select'
                        defaultValue =''
                        onClick      ={on_select_guesses}
                    />
                    {display_select_options()}
                </div>
                
                <Button
                    btnClasses  ={'give-clue button-green'}
                    btnFunction ={on_give_clue}
                    btnText     ={'Give Clue'}
                />

            </div>
            <div className='clue-container'>
                <div className='clue'>
                    {props.clue}
                </div>
                <div className='guess-amount'>
                    {props.guesses}
                </div>
            </div>
            <div className='clue-end-container'>
                <Button
                        btnClasses  ={'end-guessing button-yellow'}
                        btnFunction ={on_end_guessing}
                        btnText     ={'End Guessing'}
                    />
            </div>
        </div>
    );
}
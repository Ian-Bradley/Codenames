import React, { Component } from 'react';
import Button from '../Button/Button.js';
import './GameInputs.scss';

export default class GameInputs extends Component
{

    render()
    {

        /*======================================
            RENDER FUNCTIONS - Player Interactions
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
            COMPONENTS
        ========================================*/

        return (
            <div className='game-input'>
                <div className='guess-input-container'>
                    <input
                        type='text'
                        className='clue-input'
                        placeholder='Type your clue here'
                        defaultValue=''
                        onChange={on_input_change} />
                    <input
                        type='number'
                        className='guess-select'
                        defaultValue=''
                        onClick={on_select_guesses} />
                    <Button
                        btnClasses={'give-clue button-green'}
                        btnFunction={on_give_clue}
                        btnText={'Give Clue'}
                    />
                </div>
                <div className='guess-end-container'>
                    <Button
                            btnClasses={'end-guessing button-yellow'}
                            btnFunction={on_end_guessing}
                            btnText={'End Guessing'}
                        />
                </div>
            </div>
        );
    }
}
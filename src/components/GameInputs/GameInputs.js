import React, { Component } from 'react';
import Button from '../Button/Button.js';
import './GameInputs.scss';

export default class GameInputs extends Component
{
    /*======================================
        RENDER FUNCTIONS
    ========================================*/

    render()
    {

        const on_input_change = e =>
        {
            e.preventDefault();
            console.log('on_input_change');
        }

        /*======================================*/

        const on_select_guesses = e =>
        {
            e.preventDefault();
            console.log('on_select_guesses');
        }

        /*======================================*/

        const on_give_clue = () =>
        {
            console.log('on_give_clue');
        }

        /*======================================
            COMPONENTS
        ========================================*/

        return (
            <div className='game-input'>
                <input
                    type='text'
                    className='word-input'
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
        );
    }
}
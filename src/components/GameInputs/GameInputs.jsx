import React from 'react'
import Button from '../Button/Button.jsx'
import './GameInputs.scss'

/**
 * @props teamRed (object)     Team data for remaining guesses and cards
 * @props teamBlue (object)    Team data for remaining guesses and cards
 * @props guesses (string)     Amount of guesses given by spymaster for current clue
 * @props gameState (string)   Current state of the game
 * @props clue (string)        Current clue given by spymaster
 * @props send_clue (function) Handler function for menu buttons
 * @props user (object) Current user information
 */

export default function GameInputs ( props )
{
    /*================================================
        ANCHOR: INTERACTIONS
    ==================================================*/

    const onInputChange = () =>
    {
        console.log('===> onInputChange')
        console.log('===> END - onInputChange')
    }

    /*======================================*/
    /*======================================*/

    const onSelectGuesses = () =>
    {
        console.log('===> onSelectGuesses')
        console.log('===> END - onSelectGuesses')
    }

    /*======================================*/
    /*======================================*/

    const onGiveClue = () =>
    {
        console.log('===> onGiveClue')
        // props.send_clue()
        console.log('===> END - onGiveClue')
    }

    /*======================================*/
    /*======================================*/

    const onEndGuessing = () =>
    {
        console.log('===> onEndGuessing')
        console.log('===> END - onEndGuessing')
    }

    /*================================================
        ANCHOR: DISPLAYING
    ==================================================*/

    const displaySelectOptions = () =>
    {
        // if()

        // props.teamRed
        // props.teamBlue

        // for ( let i = 0 i < props..length i++ )
        // {

        // }
    }

    /*================================================
        ANCHOR: COMPONENTS
    ==================================================*/

    return (
        <div className='game-input'>
            <div className='clue-input-container'>

                <input
                    type         ='text'
                    className    ='clue-input'
                    placeholder  ='Type your clue here'
                    defaultValue =''
                    onChange     ={onInputChange}
                />

                <div className='guess-select-container'>
                    <input
                        type         ='button'
                        className    ='guess-select'
                        defaultValue =''
                        onClick      ={onSelectGuesses}
                    />
                    {displaySelectOptions()}
                </div>
                
                <Button
                    btnClasses  ={'give-clue button-green'}
                    btnFunction ={onGiveClue}
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
                        btnFunction ={onEndGuessing}
                        btnText     ={'End Guessing'}
                    />
            </div>
        </div>
    )
}
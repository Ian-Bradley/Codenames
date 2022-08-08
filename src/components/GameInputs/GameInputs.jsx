import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../Button/Button.jsx'
import './GameInputs.scss'

/**
 * @props sendClue (function) Handler function for menu buttons
 */

export default function GameInputs ( props ) {

    /*================================================
        ANCHOR: STATE
    ==================================================*/

    const clue    = useSelector( ( state ) => { return state['game'].game.clue } )
    const guesses = useSelector( ( state ) => { return state['game'].game.guesses } )

    /*================================================
        ANCHOR: INTERACTIONS
    ==================================================*/

    const onInputChange = () => {
        console.log('===> onInputChange')
        console.log('===> END - onInputChange')
    }

    /*======================================*/
    /*======================================*/

    const onSelectGuesses = () => {
        console.log('===> onSelectGuesses')
        console.log('===> END - onSelectGuesses')
    }

    /*======================================*/
    /*======================================*/

    const onGiveClue = () => {
        console.log('===> onGiveClue')
        // props.sendClue()
        console.log('===> END - onGiveClue')
    }

    /*======================================*/
    /*======================================*/

    const onEndGuessing = () => {
        console.log('===> onEndGuessing')
        console.log('===> END - onEndGuessing')
    }

    /*================================================
        ANCHOR: DISPLAYING
    ==================================================*/

    const displaySelectOptions = () => {
        // if()

        // teamRed
        // teamBlue

        // for ( let i = 0 i < .length i++ )
        // {

        // }
        return null;
    }

    /*======================================*/
    /*======================================*/

    const displayClue = () => {
        if ( clue ) { return clue }
        return null;
    }

    /*======================================*/
    /*======================================*/

    const displayGuesses = () => {
        if ( guesses ) { return guesses }
        return null;
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
                    {/* {displaySelectOptions} */}
                </div>
                
                <Button
                    btnClasses  ={'give-clue button-green'}
                    btnFunction ={onGiveClue}
                    btnText     ={'Give Clue'}
                />

            </div>
            <div className='clue-container'>
                <div className='clue'>
                    {/* {displayClue} */}
                </div>
                <div className='guess-amount'>
                    {/* {displayGuesses} */}
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
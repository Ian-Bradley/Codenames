import React from 'react';
import { useSelector } from 'react-redux';
import Button from '../Button/Button.jsx';
import './GameInputs.scss';

/**
 * @props sendClue (function) Handler function for menu buttons
 */

export default function GameInputs(props) {
    /*================================================
        BLOCK: STATE
    ==================================================*/

    const game = useSelector((state) => {
        return state['game'].game;
    });
    const teamRed = useSelector((state) => {
        return state['teams'].teams.red;
    });
    const teamBlue = useSelector((state) => {
        return state['teams'].teams.blue;
    });

    /*================================================
        BLOCK: INTERACTIONS
    ==================================================*/

    const onInputChange = () => {
        console.log('===> onInputChange');
        console.log('===> END - onInputChange');
    };

    /*======================================*/
    /*======================================*/

    const onSelectGuesses = () => {
        console.log('===> onSelectGuesses');
        console.log('===> END - onSelectGuesses');
    };

    /*======================================*/
    /*======================================*/

    const onGiveClue = () => {
        console.log('===> onGiveClue');
        // props.sendClue()
        console.log('===> END - onGiveClue');
    };

    /*======================================*/
    /*======================================*/

    const onEndGuessing = () => {
        console.log('===> onEndGuessing');
        console.log('===> END - onEndGuessing');
    };

    /*================================================
        BLOCK: DISPLAYING
    ==================================================*/

    const displaySelectOptions = () => {
        // if ( teamRed.cards ) {
        // }
        // if ( teamBlue.cards ) {
        // }
        // for ( let i = 0 i < .length i++ )
        // {
        // }
    };

    /*======================================*/
    /*======================================*/

    const displayClue = () => {
        if (game.clue) {
            return game.clue;
        }
    };

    /*======================================*/
    /*======================================*/

    const displayGuesses = () => {
        if (game.guesses) {
            return game.guesses;
        }
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <div className='game-input'>
            <div className='clue-input-container'>
                <input
                    type='text'
                    className='clue-input'
                    placeholder='Type your clue here'
                    defaultValue=''
                    onChange={onInputChange}
                />

                <div className='guess-select-container'>
                    <button
                        type='button'
                        className='guess-select-button'
                        defaultValue=''
                        onClick={onSelectGuesses}
                    />
                    <div className=''>{displaySelectOptions()}</div>
                </div>

                <Button
                    btnClasses={'give-clue button-green'}
                    btnFunction={onGiveClue}
                    btnText={'Give Clue'}
                />
            </div>
            <div className='clue-container'>
                <div className='clue'>{displayClue()}</div>
                <div className='guess-amount'>{displayGuesses()}</div>
            </div>
            <div className='clue-end-container'>
                <Button
                    btnClasses={'end-guessing button-yellow'}
                    btnFunction={onEndGuessing}
                    btnText={'End Guessing'}
                />
            </div>
        </div>
    );
}

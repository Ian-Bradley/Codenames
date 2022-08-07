import React from 'react'
import Button from '../Button/Button.jsx'
import './GameMenu.scss'

/**
 * @props isHost (boolean)       Flag for game host
 * @props gameState (string)     Current state of the game
 * @props menuAction (function) Handler function for menu buttons
 */

export default function GameMenu ( props )
{
    /*================================================
        ANCHOR: INTERACTIONS
    ==================================================*/

    const onRandomizeTeams = () =>
    {
        console.log('==> onRandomizeTeams')
        // props.menuAction()
        console.log('==> END - onRandomizeTeams')
    }

    /*======================================*/
    /*======================================*/

    const onResetTeams = () =>
    {
        console.log('===> onResetTeams')
        // props.menuAction()
        console.log('===> END - onResetTeams')
    }

    /*======================================*/
    /*======================================*/

    const onStartNewGame = () =>
    {
        console.log('===> onStartNewGame')
        // props.menuAction()
        console.log('===> END - onStartNewGame')
    }

    /*================================================
        ANCHOR: DISPLAYING
    ==================================================*/

    const displayButtonClasses = () =>
    {
        if ( props.isHost )
        {
            return [
                (<Button
                    key         ={0}
                    btnClasses  ={'randomize-teams'}
                    btnFunction ={onRandomizeTeams}
                    btnText     ={'Randomize Teams'}
                />),
                (<Button
                    key         ={1}
                    btnClasses  ={'reset-teams'}
                    btnFunction ={onResetTeams}
                    btnText     ={'Reset Teams'}
                />),
                (<Button
                    key         ={2}
                    btnClasses  ={'start-new-game button-green'}
                    btnFunction ={onStartNewGame}
                    btnText     ={'Start New Game'}
                />)
            ]
        }
    }
    
    /*================================================
        ANCHOR: COMPONENTS
    ==================================================*/

    return (
        <div className='game-menu'>
            <div className='game-title'>
                <span>C</span>ODENAMES
            </div>

            <div className='game-menu-buttons'>
                {displayButtonClasses()}
            </div>
        </div>
    )
}
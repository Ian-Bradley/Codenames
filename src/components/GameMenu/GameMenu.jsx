import React from 'react';
import { useSelector } from 'react-redux';

// COMPONENETS
import Button from '../Button/Button.jsx';

// CSS + GLOBAL CONSTANTS
import { GAME_STATE_SETUP } from '../../util/constants.js';
import './GameMenu.scss';

/**
 * @props menuAction (function) Handler function for menu buttons
 */

export default function GameMenu(props) {
    /*================================================
        BLOCK: STATE
    ==================================================*/

    // Redux
    const isUserHost = useSelector((state) => {
        return state['user'].user.isHost;
    });
    const gameState = useSelector((state) => {
        return state['game'].game.state;
    });

    /*================================================
        BLOCK: INTERACTIONS
    ==================================================*/

    const onRandomizeTeams = () => {
        console.log('==> onRandomizeTeams');
        // props.menuAction()
        console.log('==> END - onRandomizeTeams');
    };

    /*======================================*/
    /*======================================*/

    const onResetTeams = () => {
        console.log('===> onResetTeams');
        // props.menuAction()
        console.log('===> END - onResetTeams');
    };

    /*======================================*/
    /*======================================*/

    const onStartNewGame = () => {
        console.log('===> onStartNewGame');
        // props.menuAction()
        console.log('===> END - onStartNewGame');
    };

    /*================================================
        BLOCK: DISPLAYING
    ==================================================*/

    const displayMenu = () => {
        if (gameState === GAME_STATE_SETUP) {
            let buttons = [];
            if (isUserHost) {
                buttons = [
                    <Button
                        key={0}
                        btnClasses={'randomize-teams'}
                        btnFunction={onRandomizeTeams}
                        btnText={'Randomize Teams'}
                    />,
                    <Button
                        key={1}
                        btnClasses={'reset-teams'}
                        btnFunction={onResetTeams}
                        btnText={'Reset Teams'}
                    />,
                    <Button
                        key={2}
                        btnClasses={'start-new-game button-green'}
                        btnFunction={onStartNewGame}
                        btnText={'Start New Game'}
                    />,
                ];
            }

            return (
                <div className='game-menu'>
                    <div className='game-title'>
                        <span>C</span>ODENAMES
                    </div>

                    <div className='game-menu-buttons'>{buttons}</div>
                </div>
            );
        }
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return <React.Fragment>{displayMenu()}</React.Fragment>;
}

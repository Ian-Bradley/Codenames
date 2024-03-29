import React from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import Button from '../Button/Button.jsx';
import IconFace from '../../images/icons/face.svg';
import IconUser from '../../images/icons/user.svg';
import IconQuestion from '../../images/icons/question.svg';
import IconStopwatch from '../../images/icons/stopwatch.svg';

// CSS + GLOBAL CONSTANTS
import { CLASS_DISABLED } from '../../util/constants.js';
import './GameHeader.scss';

export default function GameHeader(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    const user = useSelector((state) => {
        return state['user'].user;
    });
    const userTotal = useSelector((state) => {
        return state['game'].game.userTotal;
    });

    /*================================================
        BLOCK: INTERACTIONS
    ==================================================*/

    const onGameUsers = () => {
        console.log('===> onGameUsers');
        console.log('===> END - onGameUsers');
    };

    /*======================================*/
    /*======================================*/

    const onGameTimer = () => {
        console.log('===> onGameTimer');
        console.log('===> END - onGameTimer');
    };

    /*======================================*/
    /*======================================*/

    const onGameInfo = () => {
        console.log('===> onGameInfo');
        console.log('===> END - onGameInfo');
    };

    /*======================================*/
    /*======================================*/

    const onGameReset = () => {
        console.log('===> onGameReset');
        console.log('===> END - onGameReset');
    };

    /*======================================*/
    /*======================================*/

    const onGameCurrentUser = () => {
        console.log('===> onGameCurrentUser');
        console.log('===> END - onGameCurrentUser');
    };

    /*================================================
        BLOCK: DISPLAYING
    ==================================================*/

    const displayButtonReset = () => {
        if (user.isHost) {
            return (
                <Button
                    btnClasses={'game-reset'}
                    btnFunction={onGameReset}
                    btnText={'Reset Game'}
                />
            );
        }
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <div className='game-header'>
            <div className='game-controls-left'>
                <Button
                    btnClasses={'game-users'}
                    btnFunction={onGameUsers}
                    btnText={'Users'}
                    btnIcon={IconUser}
                    btnData={userTotal}
                />
                <Button
                    btnDisplayClasses={CLASS_DISABLED}
                    btnClasses={'game-timer'}
                    btnFunction={onGameTimer}
                    btnIcon={IconStopwatch}
                />
                <Button btnClasses={'game-info'} btnFunction={onGameInfo} btnIcon={IconQuestion} />
            </div>
            <div className='game-controls-right'>
                {displayButtonReset()}
                <Button
                    btnClasses={'game-current-user button-' + user.team}
                    btnFunction={onGameCurrentUser}
                    btnText={user.name}
                    btnIcon={IconFace}
                />
            </div>
        </div>
    );
}

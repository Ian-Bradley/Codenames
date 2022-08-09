import React from 'react';
import { useSelector } from 'react-redux';

// COMPONENETS
import Button from '../Button/Button.jsx';

// CSS + GLOBAL CONSTANTS
import {
    OPERATIVE,
    SPYMASTER,
    MAX_OPERATIVES,
    MAX_SPYMASTERS,
    COLOR_RED,
    COLOR_BLUE,
    GAME_STATE_SETUP,
} from '../../util/constants.js';
import './TeamCard.scss';

/**
 * @props team (Object) Team data for name, and remaining guesses and cards
 * @props sendUserTeam (Function) // TODO: use SocketProvider and util function to send?
 * @props sendUserPosition (Function) // TODO: use SocketProvider and util function to send?
 */

export default function TeamCard(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    const user = useSelector((state) => {
        return state['user'].user;
    });
    const users = useSelector((state) => {
        return state['users'].users;
    });
    const game = useSelector((state) => {
        return state['game'].game;
    });

    /*================================================
        BLOCK: HELPER
    ==================================================*/

    // FUNCTION: => countPositions
    const countPositions = (user, users, team, position) => {
        let count = 0;
        for (let i = 0; i < users.length; i++) {
            if (users[i].team === team && users[i].position === position) {
                count++;
            }
        }
        if (user.team === team && user.position === position) {
            count++;
        }
        return count;
    };

    /*================================================
        BLOCK: INTERACTIONS
    ==================================================*/

    // FUNCTION: => onSelectPosition
    const onSelectPosition = (positionButton) => {
        const isOnTeam = user.team;
        const isTeamCardRed = props.team.name === COLOR_RED;
        const isTeamCardBlue = props.team.name === COLOR_BLUE;
        const isSameTeam = props.team.name === user.team;
        const isUserOperative = user.position === OPERATIVE;
        const isUserSpymaster = user.position === SPYMASTER;
        const isButtonOperative = positionButton === OPERATIVE;
        const isButtonSpymaster = positionButton === SPYMASTER;

        // > User does not have a team
        if (!isOnTeam && isTeamCardRed && isButtonOperative) {
            props.sendUserTeam(user.id, props.team.name);
            props.sendUserPosition(user.id, positionButton);
        }
        if (!isOnTeam && isTeamCardRed && isButtonSpymaster) {
            props.sendUserTeam(user.id, props.team.name);
            props.sendUserPosition(user.id, positionButton);
        }
        if (!isOnTeam && isTeamCardBlue && isButtonOperative) {
            props.sendUserTeam(user.id, props.team.name);
            props.sendUserPosition(user.id, positionButton);
        }
        if (!isOnTeam && isTeamCardBlue && isButtonSpymaster) {
            props.sendUserTeam(user.id, props.team.name);
            props.sendUserPosition(user.id, positionButton);
        }

        // > User is already on a team
        if (isOnTeam && isTeamCardRed && isSameTeam && isUserOperative && isButtonSpymaster) {
            props.sendUserPosition(user.id, positionButton);
        }
        if (isOnTeam && isTeamCardRed && isSameTeam && isUserSpymaster && isButtonOperative) {
            props.sendUserPosition(user.id, positionButton);
        }
        if (isOnTeam && isTeamCardRed && !isSameTeam && isUserOperative && isButtonOperative) {
            props.sendUserTeam(user.id, props.team.name);
        }
        if (isOnTeam && isTeamCardRed && !isSameTeam && isUserOperative && isButtonSpymaster) {
            props.sendUserTeam(user.id, props.team.name);
            props.sendUserPosition(user.id, positionButton);
        }
        if (isOnTeam && isTeamCardRed && !isSameTeam && isUserSpymaster && isButtonOperative) {
            props.sendUserTeam(user.id, props.team.name);
            props.sendUserPosition(user.id, positionButton);
        }
        if (isOnTeam && isTeamCardRed && !isSameTeam && isUserSpymaster && isButtonSpymaster) {
            props.sendUserTeam(user.id, props.team.name);
        }
        if (isOnTeam && isTeamCardBlue && isSameTeam && isUserOperative && isButtonSpymaster) {
            props.sendUserPosition(user.id, positionButton);
        }
        if (isOnTeam && isTeamCardBlue && isSameTeam && isUserSpymaster && isButtonOperative) {
            props.sendUserPosition(user.id, positionButton);
        }
        if (isOnTeam && isTeamCardBlue && !isSameTeam && isUserOperative && isButtonOperative) {
            props.sendUserTeam(user.id, props.team.name);
        }
        if (isOnTeam && isTeamCardBlue && !isSameTeam && isUserOperative && isButtonSpymaster) {
            props.sendUserTeam(user.id, props.team.name);
            props.sendUserPosition(user.id, positionButton);
        }
        if (isOnTeam && isTeamCardBlue && !isSameTeam && isUserSpymaster && isButtonOperative) {
            props.sendUserTeam(user.id, props.team.name);
            props.sendUserPosition(user.id, positionButton);
        }
        if (isOnTeam && isTeamCardBlue && !isSameTeam && isUserSpymaster && isButtonSpymaster) {
            props.sendUserTeam(user.id, props.team.name);
        }
    };

    /*================================================
        BLOCK: DISPLAYING
    ==================================================*/

    // FUNCTION: => displayUsersList
    const displayUsersList = (position) => {
        let usersList = [];
        // TODO: maybe change to map
        // Connected users
        if (!(users === undefined) && users.length) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].team === props.team && users[i].position === position) {
                    usersList.push(<li key={i}>{users[i].name}</li>);
                }
            }
        }

        // Current user
        if (user.team === props.team && user.position === position) {
            usersList.push(<li key={users.length}>{user.name}</li>);
        }
        return usersList;
    };

    /*======================================*/
    /*======================================*/

    // FUNCTION: => displayRemainingCards
    const displayRemainingCards = () => {
        let remaining = props.team.cards;
        if (game.state === GAME_STATE_SETUP) {
            remaining = '-';
        }
        return remaining;
    };

    /*======================================*/
    /*======================================*/

    // FUNCTION: => displayRemainingGuesses
    const displayRemainingGuesses = () => {
        let remaining = props.team.guesses;
        if (game.state === GAME_STATE_SETUP) {
            return '-';
        }
        return remaining;
    };

    /*======================================*/
    /*======================================*/

    // FUNCTION: => displayButtonOperative
    const displayButtonOperative = () => {
        let operativesTotal = countPositions(user, users, props.team, OPERATIVE);
        if (operativesTotal <= MAX_OPERATIVES && game.state === GAME_STATE_SETUP) {
            return (
                <Button
                    btnValue={OPERATIVE}
                    btnClasses={'select-operative'}
                    btnFunction={onSelectPosition}
                    btnText={'Join as Operative'}
                />
            );
        }
    };

    /*======================================*/
    /*======================================*/

    // FUNCTION: => displayButtonSpymaster
    const displayButtonSpymaster = () => {
        let spymastersTotal = countPositions(user, users, props.team, SPYMASTER);
        if (spymastersTotal <= MAX_SPYMASTERS && game.state === GAME_STATE_SETUP) {
            return (
                <Button
                    btnValue={SPYMASTER}
                    btnClasses={'select-spymaster'}
                    btnFunction={onSelectPosition}
                    btnText={'Join as Spymaster'}
                />
            );
        }
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <div className={'team-card team-' + props.team.name}>
            <div className='remaining-cards'>
                <span>{displayRemainingCards()}</span>
            </div>
            <div className='remaining-guesses'>
                <div className='team-card-title'>Guess(es)</div>
                <span>{displayRemainingGuesses()}</span>
            </div>
            <div className='team-operatives'>
                <div className='team-card-title'>{OPERATIVE+'(s)'}</div>
                <ul className='team-list'>{displayUsersList(OPERATIVE)}</ul>
                {displayButtonOperative()}
            </div>
            <div className='team-spymaster'>
                <div className='team-card-title'>{SPYMASTER+'(s)'}</div>
                <ul className='team-list'>{displayUsersList(SPYMASTER)}</ul>
                {displayButtonSpymaster()}
            </div>
        </div>
    );
}

import React from 'react';
import Button from '../Button/Button.js';
import * as C from '../../constants.js'
import './TeamCard.scss';

/**
 * @props team (string)          Team name/color
 * @props teamData (onject)      Team data for remaining guesses and cards
 * @props players (array)        Current connected players list
 * @props gameState (string)     Current state of the game
 * @props team_select (function) Callback function for team selecting buttons
 * @props currentPlayer (object) Current player information
 */

export default function TeamCard ( props )
{

    /*======================================
        HELPER METHODS
    ========================================*/

    const count_positions = ( currentPlayer, players, team, position ) =>
    {
        let count = 0;
        for ( let i = 0; i < players.length; i++ )
        {
            if ( ( players[i].team === team ) && ( players[i].position === position ) )
            {
                count++;
            }
        }
        if ( ( currentPlayer.team === team ) && ( currentPlayer.position === position ) )
        {
            count++;
        }
        return count;
    }

    /*======================================
        RENDER FUNCTIONS - Interactions
    ========================================*/

    const on_select_position = ( positionButton ) =>
    {
        props.team_select( positionButton, props.team );
    }
    
    /*======================================
        RENDER FUNCTIONS - Displaying
    ========================================*/

    const display_team_card_class = () =>
    {
        return 'team-card team-' + props.team;
    }

    /*======================================*/
    /*======================================*/


    const display_players_list = ( position ) =>
    {
        let players = [];

        // Connected players
        if ( !( props.players === undefined ) && ( props.players.length ) )
        {
            for ( let i = 0; i < props.players.length; i++ )
            {
                if ( ( props.players[i].team === props.team ) && ( props.players[i].position === position ))
                {
                    players.push( <li key={i}>{props.players[i].name}</li> );
                }
            }
        }

        // Current player
        if ( ( props.currentPlayer.team === props.team ) && ( props.currentPlayer.position === position ) )
        {
            players.push( <li key={props.players.length}>{props.currentPlayer.name}</li> );
        }
        return players;
    }

    /*======================================*/
    /*======================================*/

    const display_remaining_cards = () =>
    {
        let remaining = props.teamData.cards;
        if ( props.gameState === C.onst.gameState_setup )
        {
            remaining = '-'
        }
        return remaining;
    }

    /*======================================*/
    /*======================================*/

    const display_remaining_guesses = () =>
    {
        let remaining = props.teamData.guesses;
        if ( props.gameState === C.onst.gameState_setup )
        {
            remaining = '-'
        }
        return remaining;
    }

    /*======================================*/
    /*======================================*/

    const display_button_operative = () =>
    {
        let operativesTotal = count_positions( props.currentPlayer, props.players, props.team, C.onst.operative );
        if ( ( operativesTotal <= C.onst.maxOperatives ) && ( props.gameState === C.onst.gameState_setup ) )
        {
            return (
                <Button
                    btnValue    ={C.onst.operative}
                    btnClasses  ={'select-operative'}
                    btnFunction ={on_select_position}
                    btnText     ={'Join as Operative'}
                />
            )
        }
    }

    /*======================================*/
    /*======================================*/

    const display_button_spymaster = () =>
    {
        let spymastersTotal = count_positions( props.currentPlayer, props.players, props.team, C.onst.spymaster );
        if ( ( spymastersTotal <= C.onst.maxSpymasters ) && ( props.gameState === C.onst.gameState_setup ) )
        {
            return (
                <Button
                    btnValue    ={C.onst.spymaster}
                    btnClasses  ={'select-spymaster'}
                    btnFunction ={on_select_position}
                    btnText     ={'Join as Spymaster'}
                />
            )
        }
    }

    /*======================================
        COMPONENTS
    ========================================*/

    return (
        <div className={display_team_card_class()}>
            <div className='remaining-cards'>
                <span>{display_remaining_cards()}</span>
            </div>
            <div className='remaining-guesses'>
                <div className='team-card-title'>Guess(es)</div>
                <span>{display_remaining_guesses()}</span>
            </div>
            <div className='team-operatives'>
                <div className='team-card-title'>Operative(s)</div>
                <ul className='team-list'>
                    {display_players_list(C.onst.operative)}
                </ul>
                {display_button_operative()}
            </div>
            <div className='team-spymaster'>
                <div className='team-card-title'>Spymaster</div>
                <ul className='team-list'>
                    {display_players_list(C.onst.spymaster)}
                </ul>
                {display_button_spymaster()}
            </div>
        </div>
    );
}
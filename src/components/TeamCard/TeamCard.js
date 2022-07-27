import React, { Component } from 'react';
import Button from '../Button/Button.js';
import * as C from '../../constants.js'
import './TeamCard.scss';

export default class TeamCard extends Component
{

    /*======================================
        STATE + FUNCTION BINDINGS
    ========================================*/

    constructor(props)
    {
        super(props);
        this.count_positions = this.count_positions.bind(this);
    }

    /*======================================
        FUNCTIONAL METHODS
    ========================================*/

    count_positions ( currentPlayer, players, team, position )
    {
        let count = 0;
        // Connected players
        for ( let i = 0; i < players.length; i++ )
        {
            if ( ( players[i].team === team ) && ( players[i].position === position ) )
            {
                count++;
            }
        }
        // Current player
        if ( ( currentPlayer.team === team ) && ( currentPlayer.position === position ) )
        {
            count++;
        }
        return count;
    }

    /*======================================*/
    /*======================================*/

    render()
    {

        /*======================================
            RENDER FUNCTIONS - Interactions
        ========================================*/

        const on_select_position = ( buttonPosition ) =>
        {
            // Prop assignment
            let cardTeamColor   = this.props.team;
            let playerTeamColor = this.props.currentPlayer.team;
            let playerPosition  = this.props.currentPlayer.position;
            // Flags
            let isOnTeam          = playerTeamColor;
            let isTeamCardRed     = ( cardTeamColor === C.onst.red );
            let isTeamCardBlue    = ( cardTeamColor === C.onst.blue );
            let isSameTeam        = ( cardTeamColor === playerTeamColor );
            let isPlayerOperative = ( playerPosition === C.onst.operative );
            let isPlayerSpymaster = ( playerPosition === C.onst.spymaster );
            let isButtonOperative = ( buttonPosition === C.onst.operative );
            let isButtonSpymaster = ( buttonPosition === C.onst.spymaster );
            // Team Swapping Logic
            if ( isOnTeam && isTeamCardRed && isSameTeam && isPlayerOperative && isButtonSpymaster )
            { this.props.set_current_player__position( buttonPosition ); }
            if ( isOnTeam && isTeamCardRed && isSameTeam && isPlayerSpymaster && isButtonOperative )
            { this.props.set_current_player__position( buttonPosition ); }
            if ( isOnTeam && isTeamCardRed && !isSameTeam && isPlayerOperative && isButtonOperative )
            { this.props.set_current_player__team( this.props.team ); }
            if ( isOnTeam && isTeamCardRed && !isSameTeam && isPlayerOperative && isButtonSpymaster )
            { this.props.set_current_player__team( this.props.team ); this.props.set_current_player__position( buttonPosition ); }
            if ( isOnTeam && isTeamCardRed && !isSameTeam && isPlayerSpymaster && isButtonOperative )
            { this.props.set_current_player__team( this.props.team ); this.props.set_current_player__position( buttonPosition ); }
            if ( isOnTeam && isTeamCardRed && !isSameTeam && isPlayerSpymaster && isButtonSpymaster )
            { this.props.set_current_player__team( this.props.team ); }
            if ( isOnTeam && isTeamCardBlue && isSameTeam && isPlayerOperative && isButtonSpymaster )
            { this.props.set_current_player__position( buttonPosition ); }
            if ( isOnTeam && isTeamCardBlue && isSameTeam && isPlayerSpymaster && isButtonOperative )
            { this.props.set_current_player__position( buttonPosition ); }
            if ( isOnTeam && isTeamCardBlue && !isSameTeam && isPlayerOperative && isButtonOperative )
            { this.props.set_current_player__team( this.props.team ); }
            if ( isOnTeam && isTeamCardBlue && !isSameTeam && isPlayerOperative && isButtonSpymaster )
            { this.props.set_current_player__team( this.props.team ); this.props.set_current_player__position( buttonPosition ); }
            if ( isOnTeam && isTeamCardBlue && !isSameTeam && isPlayerSpymaster && isButtonOperative )
            { this.props.set_current_player__team( this.props.team ); this.props.set_current_player__position( buttonPosition ); }
            if ( isOnTeam && isTeamCardBlue && !isSameTeam && isPlayerSpymaster && isButtonSpymaster )
            { this.props.set_current_player__team( this.props.team ); }
            if ( !isOnTeam && isTeamCardRed && isButtonOperative )
            { this.props.set_current_player__position( buttonPosition ); this.props.set_current_player__team( this.props.team ); }
            if ( !isOnTeam && isTeamCardRed && isButtonSpymaster )
            { this.props.set_current_player__position( buttonPosition ); this.props.set_current_player__team( this.props.team ); }
            if ( !isOnTeam && isTeamCardBlue && isButtonOperative )
            { this.props.set_current_player__position( buttonPosition ); this.props.set_current_player__team( this.props.team ); }
            if ( !isOnTeam && isTeamCardBlue && isButtonSpymaster )
            { this.props.set_current_player__position( buttonPosition ); this.props.set_current_player__team( this.props.team ); }
        }
        
        /*======================================
            RENDER FUNCTIONS - Displaying
        ========================================*/

        const display_team_card_class = () =>
        {
            return 'team-card team-' + this.props.team;
        }

        /*======================================*/
        /*======================================*/


        const display_players_list = ( position ) =>
        {
            let players = [];

            // Connected players
            if ( !( this.props.players === undefined ) && ( this.props.players.length ) )
            {
                for ( let i = 0; i < this.props.players.length; i++ )
                {
                    if ( ( this.props.players[i].team === this.props.team )&& ( this.props.players[i].position === position ))
                    {
                        players.push( <li key={i}>{this.props.players[i].name}</li> );
                    }
                }
            }

            // Current player
            if ( ( this.props.currentPlayer.team === this.props.team ) && ( this.props.currentPlayer.position === position ) )
            {
                players.push( <li key={this.props.players.length}>{this.props.currentPlayer.name}</li> );
            }
            return players;
        }

        /*======================================*/
        /*======================================*/

        const display_remaining_cards = () =>
        {
            let remaining = this.props.teamData.cards;
            if ( this.props.gameState === C.onst.gameState_setup )
            {
                remaining = '-'
            }
            return remaining;
        }

        /*======================================*/
        /*======================================*/

        const display_remaining_guesses = () =>
        {
            let remaining = this.props.teamData.guesses;
            if ( this.props.gameState === C.onst.gameState_setup )
            {
                remaining = '-'
            }
            return remaining;
        }

        /*======================================*/
        /*======================================*/

        const display_button_operative = () =>
        {
            let operativesTotal = this.count_positions( this.props.currentPlayer, this.props.players, this.props.team, C.onst.operative );
            if ( ( operativesTotal <= C.onst.maxOperatives ) || ( this.props.gameState === C.onst.gameState_setup ) )
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
            let spymastersTotal = this.count_positions( this.props.currentPlayer, this.props.players, this.props.team, C.onst.spymaster );
            if ( ( spymastersTotal <= C.onst.maxSpymasters ) || ( this.props.gameState === C.onst.gameState_setup ) )
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
        //this.props.team
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
}
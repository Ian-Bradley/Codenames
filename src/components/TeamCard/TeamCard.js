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

    // ANCHOR: count_positions
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

    /*======================================
        RENDER FUNCTIONS
    ========================================*/

    render()
    {

        // ANCHOR: on_select_position
        const on_select_position = ( buttonPosition ) =>
        {
            // Prop assignment
            let cardTeamColor   = this.props.team;
            let playerTeamColor = this.props.currentPlayer.team;
            let playerPosition  = this.props.currentPlayer.position;
            // Flags
            let isOnTeam          = playerTeamColor;
            let isTeamCardRed     = ( cardTeamColor === C.onst.teamRed );
            let isTeamCardBlue    = ( cardTeamColor === C.onst.teamBlue );
            let isSameTeam        = ( cardTeamColor === playerTeamColor );
            let isPlayerOperative = ( playerPosition === C.onst.positionOperative );
            let isPlayerSpymaster = ( playerPosition === C.onst.positionSpymaster );
            let isButtonOperative = ( buttonPosition === C.onst.positionOperative );
            let isButtonSpymaster = ( buttonPosition === C.onst.positionSpymaster );
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
        
        /*======================================*/

        // ANCHOR: list_players
        const list_players = ( position ) =>
        {
            let players = [];
            // Connected players
            if ( this.props.players.length )
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

        // ANCHOR: display_remaining_cards
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

        // ANCHOR: display_remaining_guesses
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

        // ANCHOR: display_button_operative
        const display_button_operative = () =>
        {
            let operativesTotal = this.count_positions( this.props.currentPlayer, this.props.players, this.props.team, C.onst.positionOperative );
            let displayClass = '';
            if ( ( operativesTotal >= C.onst.maxOperatives ) || ( this.props.gameState !== C.onst.gameState_setup ) )
            { displayClass = C.onst.classHidden; }
            return displayClass;
        }

        /*======================================*/

        // ANCHOR: display_button_spymaster
        const display_button_spymaster = () =>
        {
            let spymastersTotal = this.count_positions( this.props.currentPlayer, this.props.players, this.props.team, C.onst.positionSpymaster );
            let displayClass = '';
            if ( ( spymastersTotal >= C.onst.maxSpymasters ) || ( this.props.gameState !== C.onst.gameState_setup ) )
            { displayClass = C.onst.classHidden; }
            return displayClass;
        }

        /*======================================
            COMPONENTS
        ========================================*/

        return (
            <div className='team-card'>
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
                        {list_players(C.onst.positionOperative)}
                    </ul>
                    <Button
                        btnValue={C.onst.positionOperative}
                        btnContainerClasses={display_button_operative()}
                        btnClasses={'select-operative'}
                        btnFunction={on_select_position}
                        btnText={'Join as Operative'}
                    />
                </div>
                <div className='team-spymaster'>
                    <div className='team-card-title'>Spymaster</div>
                    <ul className='team-list'>
                        {list_players(C.onst.positionSpymaster)}
                    </ul>
                    <Button
                        btnValue={C.onst.positionSpymaster}
                        btnContainerClasses={display_button_spymaster()}
                        btnClasses={'select-spymaster'}
                        btnFunction={on_select_position}
                        btnText={'Join as Spymaster'}
                    />
                </div>
            </div>
        );
    }
}
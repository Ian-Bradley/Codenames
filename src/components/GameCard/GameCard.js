import React, { Component } from 'react';
import Button from '../Button/Button.js';
import IconHand from '../../images/icons/hand.svg';
import * as C from '../../constants.js'
import './GameCard.scss';

export default class GameCard extends Component
{
    /*======================================
        STATE + FUNCTION BINDINGS
    ========================================*/

    constructor(props)
    {
        super(props);
        this.state = {
            cardHighlight: '',
        };
        this.set_card_highlight = this.set_card_highlight.bind(this);
    }

    /*======================================
        STATE METHODS
    ========================================*/

    set_card_highlight ( stateClass )
    {
        this.setState({ cardHighlight: stateClass }); 
    }

    /*======================================*/
    /*======================================*/

    render()
    {

        /*======================================
            RENDER FUNCTIONS - Player Interactions
        ========================================*/

        const on_card_highlight = () =>
        {
            // console.log('===> on_card_highlight');
            if ( !this.props.cardChosen )
            {
                // Operative action
                if ( this.props.currentPlayer.position === C.onst.positionOperative )
                {
                    // console.log('> Operative - Highlight');
                    this.props.card_highlight( this.props.cardIndex );
                    // console.log('> END - Operative - Highlight');
                }

                // Spymaster action
                if ( this.props.currentPlayer.position === C.onst.positionSpymaster )
                {
                    // console.log('> Spymaster - Highlight');
                    // console.log('> Spymaster - Adding border highlight');
                    // console.log('> Spymaster - Removing border highlight');
                    // TODO: add check for already having been highlighted (new state var?)

                    // // this.set_card_highlight( C.onst.classHighlighted );
                    // this.set_card_highlight( '' );

                    // TODO: add to guesses on clue input bar for spymaster
                    // TODO: check for gameState so only specific spymaster can select cards
                    // console.log('> END - Spymaster - Highlight');
                }
            }
            // console.log('===> END - on_card_highlight');
        }

        /*======================================*/
        /*======================================*/

        const on_card_choose = () =>
        {
            console.log('===> on_card_choose');
            // make spymaster not able to see choose button, so only operative can choose
            // this.props.card_choose( this.props.cardIndex );
            console.log('===> END - on_card_choose');
        }

        /*======================================
            RENDER FUNCTIONS - Displaying
        ========================================*/

        const list_highlighting_players = () =>
        {
            if ( !( this.props.highlights === undefined ) && ( this.props.highlights.length ) )
            {
                // console.log('===> list_highlighting_players');
                let highlights = [];
                // console.log('this.props.highlights: ', this.props.highlights);
                // console.log('> Beggining highlight array.push loop');
                for ( let i = 0; i < this.props.highlights.length; i++ )
                {
                    highlights.push(
                        <li key={i} className={'player-' + this.props.highlights[i].team}>
                            {this.props.highlights[i].name}
                        </li>
                    );
                }
                // console.log('highlights: ', highlights);
                // console.log('===> END - list_highlighting_players');
                return highlights;
            }
            return [];
        }

        /*======================================*/
        /*======================================*/

        const list_classes = () =>
        {
            // Class for displaying card type to spymasters
            let cardClass = '';
            if ( this.props.currentPlayer.position === C.onst.positionSpymaster )
            {
                if ( this.props.cardType === C.onst.teamRed   ) { cardClass += C.onst.cardRed;   }
                if ( this.props.cardType === C.onst.teamBlue  ) { cardClass += C.onst.cardBlue;  }
                if ( this.props.cardType === C.onst.teamBlack ) { cardClass += C.onst.cardBlack; }
                if ( this.props.cardType === C.onst.teamGreen ) { cardClass += C.onst.cardGreen; }
            }
            // Class for chosen cards to disable interaction
            if ( this.props.cardChosen ) { cardClass += ' ' + C.onst.classChosen }
            return cardClass;
        }

        /*======================================
            COMPONENTS
        ========================================*/

        return (
            <div
                className={
                    'game-card'
                    + ' '
                    + list_classes()
                }
                style={{
                    width: this.props.cardWidth + 'px',
                    height: this.props.cardHeight + 'px'
                }}
            >
                <div
                    className={
                        'game-card-clickable'
                        + ' '
                        + this.state.cardHighlight
                    }
                    onClick={on_card_highlight}>
                </div>
                <div className='game-card-highlighted'>
                    <ul>
                        {list_highlighting_players()}
                    </ul>
                </div>
                <Button
                    btnClasses          ={'card-choose'}
                    btnContainerClasses ={'game-card-button'}
                    btnFunction         ={on_card_choose}
                    btnIcon             ={IconHand}
                />
                <div
                    className='game-card-text'
                    style={{marginBottom: this.props.cardTextMargin + 'px'}}
                >
                    {this.props.cardText}
                </div>
            </div>
        );
    }
}
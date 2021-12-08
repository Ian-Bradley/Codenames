import React, { Component } from 'react';
import Button from '../Button/Button.js';
import IconHand from '../../images/icons/hand.svg';
import * as C from '../../constants.js'
import './GameCard.scss';

export default class GameCard extends Component
{
    /*======================================
        ANCHOR: STATE + FUNCTION BINDINGS
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
        ANCHOR: STATE METHODS
    ========================================*/

    set_card_highlight ( state )
    {
        this.setState({ cardHighlight: state });
    }

    /*======================================
        ANCHOR: RENDER FUNCTIONS
    ========================================*/

    render()
    {

        const on_card_highlight = e =>
        {
            if ( !this.props.cardChosen )
            {
                // if (  )
                // {

                // }


                if ( this.state.cardHighlight )
                {
                    this.set_card_highlight( '' );
                    this.props.remove_highlight( this.props.cardIndex );
                }
                else
                {
                    this.set_card_highlight( C.onst.classHighlighted );
                    this.props.add_highlight( this.props.cardIndex );
                }





            }
        }

        /*======================================*/

        const on_card_choose = () =>
        {
            if ( this.state.cardHighlight )
            { this.set_card_highlight( '' ); }
            this.props.card_choose( this.props.cardIndex );
        }

        /*======================================*/

        const list_highlighting_players = () =>
        {
            let highlighting = [];
            if ( this.props.highlights.length )
            {
                for ( let i = 0; i < this.props.highlights.length; i++ )
                {
                    highlighting.push(
                        <li key={i} className={'player-' + this.props.highlights[i].team}>
                            {this.props.highlights[i].name}
                        </li>
                    );
                }
            }
            return highlighting;
        }

        /*======================================
            ANCHOR: COMPONENTS
        ========================================*/

        return (
            <div
                className={
                    'game-card'
                    + ' ' + this.props.cardClasses
                }
                style={{
                    width: this.props.cardWidth + 'px',
                    height: this.props.cardHeight + 'px'
                }}
            >
                <div
                    className={
                        'game-card-clickable'
                        + ' ' + this.state.cardHighlight
                    }
                    onClick={on_card_highlight}>
                </div>
                <div className='game-card-highlighted'>
                    <ul>
                        {list_highlighting_players()}
                    </ul>
                </div>
                <Button
                    btnClasses={'card-choose'}
                    btnContainerClasses={'game-card-button'}
                    btnFunction={on_card_choose}
                    btnIcon={IconHand}
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
import React, { Component } from 'react';
import GameCard from '../GameCard/GameCard.js';
import * as C from '../../constants.js'
import './GameBoard.scss';

export default class GameBoard extends Component
{
    /*======================================
        STATE + FUNCTION BINDINGS
    ========================================*/

    constructor(props)
    {
        super(props);
        this.state = {
            boardWidth: 0,
        };
        this.set_board_width = this.set_board_width.bind(this);
    }

    /*======================================
        STATE METHODS
    ========================================*/

    set_board_width ()
    {
        console.log('===> set_board_width');

        console.log('===> END - set_board_width');
    }

    /*======================================
        COMPONENT ACTIONS
    ========================================*/

    componentDidMount()
    {
        console.log('> Setting board width');
        this.set_board_width();
        console.log('> Setting even listener');
        let debounceResize = this.props.debounce( this.set_board_width, C.onst.debounceDelay, false );
        window.addEventListener( 'resize', debounceResize );
    }

    componentWillUnmount() {
        console.log('> Unsetting even listener');
        let debounceResize = this.props.debounce( this.set_board_width, C.onst.debounceDelay, false );
        window.removeEventListener( 'resize', debounceResize );
    }

    /*======================================*/
    /*======================================*/

    render()
    {
        /*======================================
            RENDER FUNCTIONS - Displaying
        ========================================*/

        const display_cards = () =>
        {
            
            if
            (
                ( !( this.props.cards.length === undefined ) && ( this.props.cards.length ) )
                &&
                ( this.state.boardWidth !== 0 )
            )
            {
                // Cards - Sizing
                // let cardWidth  = ( ( document.querySelector('.game-board').offsetWidth - C.onst.cardMarginWidth - 1 ) * 0.2 ); // -1 for safety | 0.2 for 1/5 (5x5)
                console.log('this.state.boardWidth: ', this.state.boardWidth);
                let cardWidth  = ( ( this.state.boardWidth - C.onst.cardMarginWidth - 1 ) * 0.2 ); // -1 for safety | 0.2 for 1/5 (5x5)
                let cardHeight = ( cardWidth * C.onst.cardSizeRatio );
                let cardMargin = ( cardHeight * C.onst.cardTextRatio ); // amount to space text properly // TODO: refine


                // Cards - Building
                let cardArray  = [];
                for ( let i = 0; i < this.props.cards.length; i++ )
                {
                    // Get highlights - Current Player
                    let highlights = [];
                    if
                    (
                        !( this.props.currentPlayer.highlights === undefined )
                        &&
                        ( this.props.currentPlayer.highlights.length )
                        &&
                        ( this.props.currentPlayer.highlights.includes( this.props.cards[i].index ) )
                    )
                    {
                        highlights.push(
                            {
                                name: this.props.currentPlayer.name,
                                team: this.props.currentPlayer.team
                            }
                        );
                    }

                    // Get highlights - Other Players
                    if ( !( this.props.players === undefined ) && ( this.props.players.length ) ) 
                    {
                        for ( let j = 0; j < this.props.players.length; j++ )
                        {
                            if ( this.props.players[j].highlights.includes( this.props.cards[i].index ) )
                            {
                                highlights.push(
                                    {
                                        name: this.props.players[j].name,
                                        team: this.props.players[j].team
                                    }
                                );
                            }
                        }
                    }

                    // if ( !( highlights === undefined ) && ( highlights.length ) )
                    // {
                    //     console.log('==> display_cards > highlights: ', highlights);
                    // }

                    // Add to component array
                    cardArray.push(
                        <GameCard
                            key={i}
                            highlights     ={highlights}
                            cardWidth      ={cardWidth}
                            cardHeight     ={cardHeight}
                            cardMargin     ={cardMargin}
                            currentPlayer  ={this.props.currentPlayer}
                            cardType       ={this.props.cards[i].type}
                            cardIndex      ={this.props.cards[i].index}
                            cardText       ={this.props.cards[i].text}
                            cardChosen     ={this.props.cards[i].chosen}
                            send_card      ={this.props.send_card}
                            send_highlight ={this.props.send_highlight}
                        />
                    )
                } // End - For loop
                return cardArray;
            } // End - If array empty check
        } // End - display_cards
        
        /*======================================
            COMPONENTS
        ========================================*/

        return (
            <div className='game-board' >
                {display_cards()}
            </div>
        );
    }
}
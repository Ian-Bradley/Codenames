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
            cardWidth: 0,
            cardHeight: 0,
            cardTextMargin: 0,
        };
        this.set_card_width       = this.set_card_width.bind(this);
        this.set_card_height      = this.set_card_height.bind(this);
        this.set_card_text_margin = this.set_card_text_margin.bind(this);
        this.cards_resize         = this.cards_resize.bind(this);
    }

    /*======================================
        STATE METHODS
    ========================================*/

    set_card_width ( width )
    {
        this.setState({ cardWidth: width });
    }

    /*======================================*/

    set_card_height ( height )
    {
        this.setState({ cardHeight: height });
    }
    
    /*======================================*/

    set_card_text_margin ( margin )
    {
        this.setState({ cardTextMargin: margin });
    }

    /*======================================
        FUNCTIONAL METHODS
    ========================================*/

    cards_resize ()
    {
        console.log('cards_resize');
        let cardWidth        = ( ( document.querySelector('.game-board').offsetWidth - C.onst.cardMarginWidth - 1 ) * 0.2 ); // -1 for safety | 0.2 for 1/5
        let cardHeight       = ( cardWidth * C.onst.cardSizeRatio );
        let cardTextMargin   = ( cardHeight * C.onst.cardTextRatio ); // refine
        this.set_card_width( cardWidth );
        this.set_card_height( cardHeight );
        this.set_card_text_margin( cardTextMargin );
    }

    /*======================================
        COMPONENT ACTIONS
    ========================================*/

    componentDidMount()
    {
        this.cards_resize();
        let debounceResize = this.props.debounce( this.cards_resize, C.onst.debounceDelay, false );
        window.addEventListener( 'resize', debounceResize );
    }

    componentWillUnmount() {
        let debounceResize = this.props.debounce( this.cards_resize, C.onst.debounceDelay, false );
        window.removeEventListener( 'resize', debounceResize );
    }

    /*======================================
        RENDER FUNCTIONS
    ========================================*/
    
    render()
    {

        const list_cards = () =>
        {
            if ( this.props.cards.length )
            {
                let cardArray  = [];
                let playerPosition = this.props.currentPlayer.position;
                for ( let i = 0; i < this.props.cards.length; i++ )
                {
                    let highlights = [];
                    // Highlighting --> connected players
                    if ( this.props.players.length )
                    {
                        for ( let j = 0; j < this.props.players.length; j++ )
                        {
                            if ( this.props.players[j].highlights.includes( this.props.cards[i].index ) )
                            {
                                highlights.push( this.props.players[j] );
                            }
                        }
                    }
                    // Highlighting --> current player
                    if ( this.props.currentPlayer.highlights.length )
                    {
                        if ( this.props.currentPlayer.highlights.includes( this.props.cards[i].index ) )
                        {
                            highlights.push( this.props.currentPlayer );
                        }
                    }
                    // Class for displaying card type to spymasters
                    let cardClass = '';
                    if ( playerPosition === C.onst.positionSpymaster )
                    {
                        if ( this.props.cards[i].type === C.onst.teamRed   ) { cardClass = C.onst.cardRed;   }
                        if ( this.props.cards[i].type === C.onst.teamBlue  ) { cardClass = C.onst.cardBlue;  }
                        if ( this.props.cards[i].type === C.onst.teamBlack ) { cardClass = C.onst.cardBlack; }
                        if ( this.props.cards[i].type === C.onst.teamGreen ) { cardClass = C.onst.cardGreen; }
                    }
                    cardArray.push(
                        <GameCard
                            key={i}
                            highlights={highlights}
                            cardWidth={this.state.cardWidth}
                            cardHeight={this.state.cardHeight}
                            cardClasses={cardClass}
                            cardIndex={this.props.cards[i].index}
                            cardText={this.props.cards[i].text}
                            cardChosen={this.props.cards[i].chosen}
                            card_choose={this.props.card_choose}
                            add_highlight={this.props.add_highlight}
                            remove_highlight={this.props.remove_highlight}
                        />
                    )
                }
                return cardArray;
            }
        }
        
        /*======================================
            COMPONENTS
        ========================================*/

        return (
            <div className='game-board'>
                {list_cards()}
            </div>
        );
    }
}
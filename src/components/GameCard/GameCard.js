import React from 'react';
import Button from '../Button/Button.js';
import IconHand from '../../images/icons/hand.svg';
import * as C from '../../constants.js'
import './GameCard.scss';

export default function GameCard ( props )
{
    /*======================================
        ANCHOR: RENDER FUNCTIONS - Interactions
    ========================================*/

    const on_send_highlight = () =>
    {
        // console.log('===> on_send_highlight');
        if ( !props.card.chosen )
        {
            // Operative action
            if ( props.currentPlayer.position === C.onst.operative )
            {
                // console.log('> Operative - Highlight');
                props.send_highlight( props.card.index );
                // console.log('> END - Operative - Highlight');
            }

            // Spymaster action
            // NOTE: also check for team so that opposing spymaster cannot see your highlights
            // props.card.highlighted (boolean)
            if ( props.currentPlayer.position === C.onst.spymaster )
            {
                // TODO: Spymaster highlighting
                // console.log('> Spymaster - Highlight');
                // console.log('> Spymaster - Adding border highlight');
                // console.log('> Spymaster - Removing border highlight');
                // add check for already having been highlighted

                // // this.  ( C.onst.classHighlighted );
                // this.  ( '' );

                // add to guesses on clue input bar for spymaster
                // check for gameState so only specific spymaster can select cards
                // console.log('> END - Spymaster - Highlight');
            }
        }
        // console.log('===> END - on_send_highlight');
    }

    /*======================================*/
    /*======================================*/

    const on_send_card = () =>
    {
        console.log('===> on_send_card');
        // make spymaster not able to see choose button, so only operative can choose
        // props.send_card( props.card.index );
        console.log('===> END - on_send_card');
    }

    /*======================================
        ANCHOR: RENDER FUNCTIONS - Displaying
    ========================================*/

    const display_highlighting = () =>
    {
        if ( !( props.highlights === undefined ) && ( props.highlights.length ) )
        {
            // console.log('===> display_highlighting');
            let highlights = [];
            // console.log('props.highlights: ', props.highlights);
            // console.log('> Beggining highlight array.push loop');
            for ( let i = 0; i < props.highlights.length; i++ )
            {
                highlights.push(
                    <li key={i} className={'player-' + props.highlights[i].team}>
                        {props.highlights[i].name}
                    </li>
                );
            }
            // console.log('highlights: ', highlights);
            // console.log('===> END - display_highlighting');
            return highlights;
        }
    }

    /*======================================*/
    /*======================================*/

    const display_classes = () =>
    {
        // Class for displaying card type to spymasters
        // TODO: change to server-only storage of card colors
        // only send to spymasters during non-set-up game states
        let cardClass = '';
        if ( props.currentPlayer.position === C.onst.spymaster )
        {
            if ( props.card.type === C.onst.red   ) { cardClass += C.onst.cardRed;   }
            if ( props.card.type === C.onst.blue  ) { cardClass += C.onst.cardBlue;  }
            if ( props.card.type === C.onst.black ) { cardClass += C.onst.cardBlack; }
            if ( props.card.type === C.onst.green ) { cardClass += C.onst.cardGreen; }
        }
        // Class for chosen cards to disable interaction
        if ( props.card.chosen ) { cardClass += ' ' + C.onst.classChosen }
        return cardClass;
    }

    /*======================================
        ANCHOR: COMPONENTS
    ========================================*/

    return (
        <div
            className={'game-card'+' '+ display_classes()}
            style={{
                top: props.positionData.top.toString() + 'px',
                left: props.positionData.left.toString() + 'px',
            }}
        >
            <div
                className={'game-card-clickable'}
                onClick={on_send_highlight}
            >
            </div>
            <div className='game-card-highlighted'>
                <ul>
                    {display_highlighting()}
                </ul>
            </div>
            <Button
                btnDisplayClasses ={'game-card-button'}
                btnClasses        ={'card-choose'}
                btnFunction       ={on_send_card}
                btnIcon           ={IconHand}
            />
            <div className='game-card-text'>
                {props.card.text}
            </div>
        </div>
    );
}
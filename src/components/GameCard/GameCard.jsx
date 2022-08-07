import React from 'react'

// COMPONENTS
import Button from '../Button/Button.jsx'
import IconHand from '../../images/icons/hand.svg'

// CSS + GLOBAL CONSTANTS
import * as C from '../../helpers/constants.js'
import './GameCard.scss'

/*
@props highlights (Array)
@props positionData (Object)
    top: (Number)
    left: (Number)
@props card (Object)
    index: (Number)
    text: (String)
    type: (String)
    highlighted: (Boolean)
    chosen: (Boolean)
@props sendCard (Function)
@props sendHighlight (Function)
*/

export default function GameCard ( props )
{
    /*================================================
        ANCHOR: STATE
    ==================================================*/

    // Redux
    const user      = useSelector( ( state ) => { return state['user'].user } )
    const gameState = useSelector( ( state ) => { return state['game'].game.state } )

    /*================================================
        ANCHOR: INTERACTIONS
    ==================================================*/

    const onSendHighlight = () =>
    {
        // console.log('===> onSendHighlight')
        if ( !props.card.chosen )
        {
            // Operative action
            if ( user.position === C.onst.operative )
            {
                // console.log('> Operative - Highlight')
                props.sendHighlight( props.card.index )
                // console.log('> END - Operative - Highlight')
            }

            // Spymaster action
            // NOTE: also check for team so that opposing spymaster cannot see your highlights
            // props.card.highlighted (boolean)
            if ( user.position === C.onst.spymaster )
            {
                // TODO: Spymaster highlighting
                // console.log('> Spymaster - Highlight')
                // console.log('> Spymaster - Adding border highlight')
                // console.log('> Spymaster - Removing border highlight')
                // add check for already having been highlighted

                // // this.  ( C.onst.classHighlighted )
                // this.  ( '' )

                // add to guesses on clue input bar for spymaster
                // check for gameState so only specific spymaster can select cards
                // console.log('> END - Spymaster - Highlight')
            }
        }
        // console.log('===> END - onSendHighlight')
    }

    /*======================================*/
    /*======================================*/

    const onSendCard = () =>
    {
        console.log('===> onSendCard')
        // make spymaster not able to see choose button, so only operative can choose
        // props.sendCard( props.card.index )
        console.log('===> END - onSendCard')
    }

    /*================================================
        ANCHOR: DISPLAYING
    ==================================================*/

    const displayClasses = () =>
    {
        // Class for displaying card type to spymasters
        // TODO: change to server-only storage of card colors
        // only send to spymasters during non-set-up game states
        let cardClass = ''
        if ( user.position === C.onst.spymaster )
        {
            if ( props.card.type === C.onst.red   ) { cardClass += C.onst.cardRed   }
            if ( props.card.type === C.onst.blue  ) { cardClass += C.onst.cardBlue  }
            if ( props.card.type === C.onst.black ) { cardClass += C.onst.cardBlack }
            if ( props.card.type === C.onst.green ) { cardClass += C.onst.cardGreen }
        }
        // Class for chosen cards to disable interaction
        if ( props.card.chosen ) { cardClass += ' ' + C.onst.classChosen }
        return cardClass
    }

    /*======================================*/
    /*======================================*/

    const displayHighlighting = () =>
    {
        if ( !( props.highlights === undefined ) && ( props.highlights.length ) )
        {
            let highlights = []
            for ( let i = 0; i < props.highlights.length; i++ )
            {
                highlights.push(
                    <li key={i} className={'user-' + props.highlights[i].team}>
                        {props.highlights[i].name}
                    </li>
                )
            }
            return highlights
        }
    }

    /*======================================*/
    /*======================================*/

    const displayText = () =>
    {
        let words = props.card.text.split(' ')
        console.log('props.card.text: ', props.card.text)
        console.log('words: ', words)
        if ( ( words.length === 1 ) && ( props.card.text.length > 10 ) )
        {
            console.log('test1')
        }
        if ( words.length > 1 )
        {
            console.log('test2')
        }
        return props.card.text
    }
    
    /*================================================
        ANCHOR: COMPONENTS
    ==================================================*/

    return (
        <div
            className={'game-card'+' '+ displayClasses()}
            style={{
                top: props.positionData.top.toString() + 'px',
                left: props.positionData.left.toString() + 'px',
            }}
        >
            <div
                className={'game-card-clickable'}
                onClick={onSendHighlight}
            >
            </div>
            <div className='game-card-highlighted'>
                <ul>
                    {displayHighlighting()}
                </ul>
            </div>
            <Button
                btnDisplayClasses ={'game-card-button'}
                btnClasses        ={'card-choose'}
                btnFunction       ={onSendCard}
                btnIcon           ={IconHand}
            />
            <div className='game-card-text'>
                {displayText()}
            </div>
        </div>
    )
}
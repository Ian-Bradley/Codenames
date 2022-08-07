import React from 'react'
import './GameMessage.scss'

export default function GameMessage ( props )
{
    /*================================================
        ANCHOR: STATE
    ==================================================*/

    const instruction = useSelector( ( state ) => { return state['game'].game.instruction } )
    
    /*================================================
        ANCHOR: COMPONENTS
    ==================================================*/

    return (
        <div className='game-instruction'>
            <div>
                <span>{instruction}</span>
            </div>
        </div>
    )
}
import React from 'react';
import './GameMessage.scss';

/**
 * @props message (string) Turn-message to be displayed to instruct players
 */

export default function GameMessage ( props )
{
    return (
        <div className='game-message'>
            <div>
                <span>{props.message}</span>
            </div>
        </div>
    );
}
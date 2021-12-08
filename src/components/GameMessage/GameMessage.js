import React, { Component } from 'react';
import './GameMessage.scss';

export default class GameMessage extends Component
{
    render()
    {
        return (
            <div className='game-message'> 
                <span>Turn Message</span>
            </div>
        );
    }
}
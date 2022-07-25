import React, { Component } from 'react';
import './GameMessage.scss';

export default class GameMessage extends Component
{
    render()
    {

        /*======================================
            RENDER FUNCTIONS - Displaying
        ========================================*/


        /*======================================
            COMPONENTS
        ========================================*/

        return (
            <div className='game-message'> 
                <span>{this.props.message}</span>
            </div>
        );
    }
}
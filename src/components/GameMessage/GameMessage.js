import React, { Component } from 'react';
import './GameMessage.scss';

function GameMessage (props) {
    return (
        <div className='game-message'> 
            <span>{props.message}</span>
        </div>
    );
  }



// export default class GameMessage extends Component
// {
//     render()
//     {


//     }
// }
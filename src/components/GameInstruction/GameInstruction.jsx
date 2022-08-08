import React from 'react';
import { useSelector } from 'react-redux';
import './GameInstruction.scss';

export default function GameInstruction(props) {
    /*================================================
        BLOCK: STATE
    ==================================================*/

    const instruction = useSelector((state) => {
        return state['game'].game.instruction;
    });

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <div className='game-instruction'>
            <div>
                <span>{instruction}</span>
            </div>
        </div>
    );
}

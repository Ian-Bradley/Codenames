import React, { Component } from 'react';
import './Button.scss';

export default class Button extends Component
{
    
    render()
    {

        /*======================================
            RENDER FUNCTIONS - Interactions
        ========================================*/

        const on_button_click = e =>
        {
            // e.preventDefault();
            if( e.target.getAttribute('data-value') )
            {
                this.props.btnFunction( e.target.getAttribute('data-value') );
            }
            else
            {
                this.props.btnFunction();
            }
        }

        /*======================================
            RENDER FUNCTIONS - Displaying
        ========================================*/

        const display_classes = () =>
        {
            let displayClasses = 'button-container';
            if ( this.props.btnDisplayClasses )
            {
                displayClasses += ' ' + this.props.btnDisplayClasses;
            }
            return displayClasses;
        }

        /*======================================*/
        /*======================================*/

        const display_button_classes = () =>
        {
            let buttonClasses = 'game-button';
            if ( this.props.btnIcon && ( !this.props.btnText && !this.props.btnData ) )
            {
                buttonClasses += ' btn-icon-only';
            }
            if ( this.props.btnClasses )
            {
                buttonClasses += ' ' + this.props.btnClasses;
            }
            return buttonClasses;
        }

        /*======================================*/
        /*======================================*/

        const display_button_icon = () =>
        {
            if ( this.props.btnIcon )
            {
                let iconClasses = 'btn-icon';
                if ( this.props.btnText ) { iconClasses += ' btn-m-left'; }
                if ( this.props.btnData ) { iconClasses += ' btn-m-right'; }
                return <img src={this.props.btnIcon} className={iconClasses}/>
            }
        }

        /*======================================
            COMPONENTS
        ========================================*/

        return (
            <div className={display_classes()}>
                <button
                    type       ='button'
                    data-value ={this.props.btnValue}
                    className  ={display_button_classes()}
                    onClick    ={on_button_click}>
                    {this.props.btnText} {display_button_icon()} {this.props.btnData}
                </button>
            </div>
        );
    }
}
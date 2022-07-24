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
            e.preventDefault();
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
            let additionalClasses = '';
            if ( this.props.btnDisplayClasses )
            {
                additionalClasses += ' ' + this.props.btnDisplayClasses;
            }
            return 'button-container' + additionalClasses;
        }

        /*======================================*/
        /*======================================*/

        const display_button_classes = () =>
        {
            let additionalClasses = '';
            if ( this.props.btnIcon && ( !this.props.btnText && !this.props.btnData ) )
            {
                additionalClasses += ' btn-icon-only';
            }
            if ( this.props.btnClasses )
            {
                additionalClasses += ' ' + this.props.btnClasses;
            }
            return 'game-button' + additionalClasses;
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
import React, { Component } from 'react';
import './Button.scss';

export default class Button extends Component
{
    /*======================================
        RENDER FUNCTIONS
    ========================================*/

    render()
    {

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

        /*======================================*/

        const container_classes = () =>
        {
            let additionalClasses = '';
            if ( this.props.btnContainerClasses )
            {
                additionalClasses += ' ' + this.props.btnContainerClasses;
            }
            return 'button-container' + additionalClasses;
        }

        /*======================================*/

        const button_classes = () =>
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

        const button_icon = () =>
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
            <div className={container_classes()}>
                <button
                    type='button'
                    data-value={this.props.btnValue}
                    className={button_classes()}
                    onClick={on_button_click}>
                    {this.props.btnText} {button_icon()} {this.props.btnData}
                </button>
            </div>
        );
    }
}
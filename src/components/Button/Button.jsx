import React from 'react'
import './Button.scss'

/**
 * @props btnIcon (string)           File destinaton to find image
 * @props btnData (string || number) Data to be displayed on button (ex: total users)
 * @props btnText (string)           Text to be displayed on button
 * @props btnValue (string)          Value to be inserted into "data-value" attribute
 * @props btnClasses (string)        Main class for button and optional color class (ex: "reset-button button-green")
 * @props btnFunction (function)     Callback function for button action
 * @props btnDisplayClasses (string) Classes for modifying button display (ex: hide/show or disable interactions)
 */

export default function Button ( props )
{

    /*================================================
        ANCHOR: INTERACTIONS
    ==================================================*/

    const onButtonClick = e =>
    {
        // e.preventDefault()
        if( e.target.getAttribute('data-value') )
        {
            props.btnFunction( e.target.getAttribute('data-value') )
        }
        else
        {
            props.btnFunction()
        }
    }

    /*================================================
        ANCHOR: DISPLAYING
    ==================================================*/

    const displayClasses = () =>
    {
        let displayClasses = 'button-container'
        if ( props.btnDisplayClasses )
        {
            displayClasses += ' ' + props.btnDisplayClasses
        }
        return displayClasses
    }

    /*======================================*/
    /*======================================*/

    const displayButtonClasses = () =>
    {
        let buttonClasses = 'game-button'
        if ( props.btnIcon && ( !props.btnText && !props.btnData ) )
        {
            buttonClasses += ' btn-icon-only'
        }
        if ( props.btnClasses )
        {
            buttonClasses += ' ' + props.btnClasses
        }
        return buttonClasses
    }

    /*======================================*/
    /*======================================*/

    const displayButtonIcon = () =>
    {
        if ( props.btnIcon )
        {
            let iconClasses = 'btn-icon'
            if ( props.btnText ) { iconClasses += ' btn-m-left' }
            if ( props.btnData ) { iconClasses += ' btn-m-right' }
            return <img src={props.btnIcon} className={iconClasses}/>
        }
    }

    /*================================================
        ANCHOR: COMPONENTS
    ==================================================*/

    return (
        <div className={displayClasses()}>
            <button
                type       ='button'
                data-value ={props.btnValue}
                className  ={displayButtonClasses()}
                onClick    ={onButtonClick}>
                {props.btnText} {displayButtonIcon()} {props.btnData}
            </button>
        </div>
    )
}
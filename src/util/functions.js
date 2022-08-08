
import { default as C } from './constants.js'
export default Object.freeze({
    /*======================================*/
    // FUNCTION: => generateRandomID
    generateRandomID: function ()
    {
        let randomID = ''
        let characters = '0123456789abcdefghijklmnopqrstuvwxyz'
        for (let i=0; i < 10; i++)
        {randomID += characters.charAt(Math.floor(Math.random() * characters.length))}
        return randomID
    },
    /*======================================*/
    // FUNCTION: => generateRandomName
    generateRandomName: function ( withNumbers )
    {
        let randomName = ''
        let randomNumber = ''
        let numbers = '0123456789'
        if(withNumbers) {
        randomNumber += '-'
        for (let i=0; i < 7; i++)
        {randomNumber += numbers.charAt(Math.floor(Math.random() * numbers.length))}}
        randomName += C.LOTR_NAMES[(Math.floor(Math.random() * C.LOTR_NAMES.length))]
        return (randomName + randomNumber)
    },
    /*======================================*/
    // FUNCTION: => debounce
    debounce: function ( func, wait, immediate )
    {
        var timeout
        return function() {
            var context = this, args = arguments
            var later = function() {
                timeout = null
                if (!immediate) func.apply(context, args)
            }
            var callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (callNow) func.apply(context, args)
        }
    },
    /*======================================*/
    // FUNCTION: => setCookie
    setCookie: function ( name, value, days )
    {
        var expires = ''
        if ( days )
        {
            var date = new Date()
            date.setTime(date.getTime() + ( days*24*60*60*1000 ) )
            expires = ' expires=' + date.toUTCString()
        }
        document.cookie = name + '=' + ( value || '' )  + expires + ' path=/'
    },
    /*======================================*/
    // FUNCTION: => getCookie
    getCookie: function ( name )
    {
        var nameEQ = name + '='
        var ca = document.cookie.split( '' )
        for ( var i = 0; i < ca.length; i++ )
        {
            var c = ca[i]
            while ( c.charAt(0)==' ' )
            { c = c.substring( 1, c.length ) }
            if ( c.indexOf( nameEQ ) == 0 )
            { return c.substring( nameEQ.length, c.length ) }
        }
        return null
    },
    /*======================================*/
})
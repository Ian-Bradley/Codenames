import { LOTR_NAMES } from './constants.js';
/*======================================*/
/*======================================*/
// FUNCTION: => generateRandomID
// export const generateRandomID = () => {
//     let randomID = '';
//     let characters = '0123456789abcdefghijklmnopqrstuvwxyz';
//     for (let i = 0; i < 10; i++) {
//         randomID += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return randomID;
// };
/*======================================*/
/*======================================*/
// FUNCTION: => generateRandomName
export const generateRandomName = (withNumbers) => {
    let randomName = '';
    let randomNumber = '';
    let numbers = '0123456789';
    if (withNumbers) {
        randomNumber += '-';
        for (let i = 0; i < 7; i++) {
            randomNumber += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
    }
    randomName += LOTR_NAMES[Math.floor(Math.random() * LOTR_NAMES.length)];
    return randomName + randomNumber;
};
/*======================================*/
/*======================================*/
// FUNCTION: => debounce
export const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        let context = this,
            args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
/*======================================*/
/*======================================*/
// FUNCTION: => setCookie
export const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = ' expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + ' path=/';
};
/*======================================*/
/*======================================*/
// FUNCTION: => getCookie
export const getCookie = (name) => {
    let nameEQ = name + '=';
    let ca = document.cookie.split('');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};
/*======================================*/
/*======================================*/
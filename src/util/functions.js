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





// ONLY FOR TESTINGS
/*======================================*/
// FUNCTION: => shuffleArray
const shuffleArray = ( arr ) => {
    let tmp, current, top = arr.length;
    if( top ) while( --top ) {
        current = Math.floor( Math.random() * ( top + 1 ) );
        tmp = arr[current];
        arr[current] = arr[top];
        arr[top] = tmp;
    }
    return arr;
};
/*======================================*/
// FUNCTION: => getCodenames
const getCodenames = () => {
    return [
        'butter',
        'clock',
        'island',
        'Paris',
        'wish',
        'soccer',
        'crash',
        'battery',
        'carrot',
        'tower',
        'venus',
        'sugar',
        'magenta',
        'trigger',
        'queen',
        'leg',
        'window',
        'joint',
        'polar',
        'machine',
        'tiger',
        'pine',
        'anteater',
        'pillow',
        'aloe',
    ];
};
/*======================================*/
// FUNCTION: => createCardIndexes
const createCardIndexes = () => {
    let indexArray = [];
    for (let i = 1; i <= 25; i++) {
        indexArray.push(i);
    }
    indexArray = shuffleArray(indexArray);
    return indexArray;
};
/*======================================*/
// FUNCTION: => createCards
export const createCards = () => {
    let codenames = getCodenames();
    let indexes = createCardIndexes();
    let cards = [];
    for (let i = 0; i < codenames.length; i++) {
        let cardType = '';
        if (0 <= indexes[i] && indexes[i] <= 6) {
            cardType = 'neutral';
        }
        if (7 <= indexes[i] && indexes[i] <= 15) {
            cardType = 'red';
        }
        if (16 <= indexes[i] && indexes[i] <= 23) {
            cardType = 'blue';
        }
        if (indexes[i] === 24) {
            cardType = 'black';
        }
        let card = {
            index: indexes[i],
            text: codenames[i],
            type: cardType,
            chosen: false,
            highlighted: false,
        };
        cards.push(card);
    }
    return cards;
};

import * as C from './constants.js';
export const elper = {

    generateRandomID: function (  )
    {
        let randomID = ''
        let characters = '0123456789abcdefghijklmnopqrstuvwxyz'
        for (let i = 0; i < 10; i++)
        {randomID += characters.charAt(Math.floor(Math.random() * characters.length))}
        return randomID
    },

    generateRandomName: function ( withNumbers )
    {
        let randomName = ''
        let randomNumber = '';
        let numbers = '0123456789';
        if(withNumbers) {
        randomNumber += '-';
        for (let i = 0; i < 7; i++)
        {randomNumber += numbers.charAt(Math.floor(Math.random() * numbers.length));} }
        randomName += C.onst.lotrNames[(Math.floor(Math.random() * C.onst.lotrNames.length))];
        return (randomName + randomNumber);
    },
}
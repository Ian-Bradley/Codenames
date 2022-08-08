module.exports = Object.freeze({
    /*======================================*/
    // FUNCTION: => shuffleArray
    shuffleArray: function ( arr ) {
        let tmp, current, top = arr.length;
        if( top ) while( --top ) {
            current = Math.floor( Math.random() * ( top + 1 ) );
            tmp = arr[current];
            arr[current] = arr[top];
            arr[top] = tmp;
        }
        return arr;
    },
    /*======================================*/
})
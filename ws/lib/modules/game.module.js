/*================================================
    BLOCK: STATE METHODS - Game Settings
==================================================*/

module.exports = {
    /*======================================*/
    // FUNCTION: => setGameState
    setGameState ( state ) {
        console.log('==> setGameState: ', state)
        console.log('> BEFORE: ', this.state.gameState)
        this.state.gameState = state
        console.log('> AFTER: ', this.state.gameState)
        console.log('==> END - setGameState')
    }
    /*======================================*/
}

import logReducer from './features/log.feature.js'
import clueReducer from './features/clue.feature.js'
import userReducer from './features/user.feature.js'
import usersReducer from './features/users.feature.js'
import cardsReducer from './features/cards.feature.js'
import roundReducer from './features/round.feature.js'
import guessesReducer from './features/guesses.feature.js'
import messagesReducer from './features/messages.feature.js'
import userTotalReducer from './features/userTotal.feature.js'
import gameStateReducer from './features/gameState.feature.js'
import dimensionsReducer from './features/dimensions.feature.js'
import instructionsReducer from './features/instructions.feature.js'

const rootReducer = {
    log: logReducer,
    clue: clueReducer,
    user: userReducer,
    users: usersReducer,
    cards: cardsReducer,
    round: roundReducer,
    guesses: guessesReducer,
    messages: messagesReducer,
    userTotal: userTotalReducer,
    gameState: gameStateReducer,
    dimensions: dimensionsReducer,
    instructions: instructionsReducer,
}
export default rootReducer
import logReducer from './features/log.feature.js'
import cardsReducer from './features/cards.feature.js'
import messagesReducer from './features/messages.feature.js'
import teamsReducer from './features/teams.feature.js'

import userReducer from './features/user.feature.js'
import usersReducer from './features/users.feature.js'

import gameReducer from './features/game.feature.js'
import dimensionsReducer from './features/dimensions.feature.js'

const rootReducer = {
    log: logReducer,
    game: gameReducer,
    user: userReducer,
    teams: teamsReducer,
    users: usersReducer,
    cards: cardsReducer,
    messages: messagesReducer,
    dimensions: dimensionsReducer,
}
export default rootReducer
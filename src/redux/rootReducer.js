import logReducer from './features/log.feature.js'
import userReducer from './features/user.feature.js'
import usersReducer from './features/users.feature.js'
import messagesReducer from './features/messages.feature.js'
import userTotalReducer from './features/userTotal.feature.js'

const rootReducer = {
    log: logReducer,
    user: userReducer,
    users: usersReducer,
    messages: messagesReducer,
    userTotal: userTotalReducer,
}
export default rootReducer
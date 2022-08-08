/*================================================
    BLOCK: REQUIRES
==================================================*/

const C = require('./lib/util/constants.js');
const F = require('./lib/util/functions.js');

// const { setGameState } = require('./modules/game.module.js')

/*================================================
    BLOCK: HELPERS
==================================================*/

/*================================================
    BLOCK: CONSTRUCTION METHODS
==================================================*/

// FUNCTION: => getCodenames
const getCodenames = () => {
    return C.FAKE_CARD_NAMES;
};

/*======================================*/
/*======================================*/

// FUNCTION: => createCardIndexes
const createCardIndexes = () => {
    let indexArray = [];
    for (let i = 1; i <= 25; i++) {
        indexArray.push(i);
    }
    indexArray = F.shuffleArray(indexArray);
    return indexArray;
};

/*======================================*/
/*======================================*/

// C.onst.cardTotalNeutral: 7,   N,   0-6
// C.onst.cardTotalBlue:    8,   B,   7-14
// C.onst.cardTotalRed:     9,   R,   15-23
// C.onst.cardTotalBlack:   1,  Bl,   24
// [  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] array key
// [  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25] position key
// [ 10,  9, 25, 14,  4, 24, 16, 11, 19,  3, 22,  5,  7, 17, 13, 18,  2, 21, 15,  1,  6, 20, 12,  8, 23] index (random)
// [  N,  N,  N,  N,  N,  N,  N,  R,  R,  R,  R,  R,  R,  R,  R,  R,  B,  B,  B,  B,  B,  B,  B,  B, Bl] card-type

// FUNCTION: => createCards
const createCards = () => {
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
        cards[i] = card;
    }
    return cards;
};

/*================================================
    BLOCK: GAME CLASS
==================================================*/

module.exports = class Game {
    constructor() {
        /*================================================
            INNERBLOCK: > STATE
        ==================================================*/

        this.state = {
            // Host
            originalHost: '', // ID of user
            host: '', // ID of user

            // Game
            clue: '',
            cards: createCards(),
            round: 0,
            guesses: 0,
            gameState: C.GAME_STATE_SETUP,

            // Teams
            // TODO: maybe combine
            teamRed: {
                name: C.RED,
                cards: 0,
                guesses: 0,
            },
            teamBlue: {
                name: C.BLUE,
                cards: 0,
                guesses: 0,
            },

            // Users
            users: [],
            usersDisconnected: [],

            // Highlights
            highlights: [],

            // Game Log
            log: [],

            // Messages
            messages: [],
        };

        /*================================================
            INNERBLOCK: > METHOD BINDING
        ==================================================*/

        // State methods - Host
        // TODO: maybe change to getUserIsHost
        this.isUserHost = this.isUserHost.bind(this);
        this.setHost = this.setHost.bind(this);
        this.setOriginalHost = this.setOriginalHost.bind(this);

        // State methods - Game Settings
        this.setGameState = this.setGameState.bind(this);
        this.setGuesses = this.setGuesses.bind(this);
        this.setRound = this.setRound.bind(this);
        this.setClue = this.setClue.bind(this);

        // State methods - Teams
        this.setTeamCards = this.setTeamCards.bind(this);
        this.setTeamGuesses = this.setTeamGuesses.bind(this);

        // State methods - Users
        this.addUser = this.addUser.bind(this);
        this.removeUser = this.removeUser.bind(this);

        // State methods - User Info
        this.setUserName = this.setUserName.bind(this);
        this.setUserTeam = this.setUserTeam.bind(this);
        this.setUserPosition = this.setUserPosition.bind(this);

        // State methods - Highlighting
        this.addHighlight = this.addHighlight.bind(this);
        this.deleteHighlight = this.deleteHighlight.bind(this);
        this.deleteUserHighlights = this.deleteUserHighlights.bind(this);
        this.deleteCardHighlights = this.deleteCardHighlights.bind(this);
        this.deleteAllHighlights = this.deleteAllHighlights.bind(this);

        // State methods - Game Log
        this.addLogItem = this.addLogItem.bind(this);
        this.deleteAllLogItems = this.deleteAllLogItems.bind(this);
    }

    /*================================================
        BLOCK: STATE METHODS - Host
    ==================================================*/

    // FUNCTION: => isUserHost
    // TODO
    isUserHost(userID) {
        console.log('==> isUserHost: ', userID);
        if (this.state.host === userID) {
            console.log('==> END - isUserHost - user found');
            return true;
        }
        console.log('==> END - isUserHost - user not found');
        return false;
    }

    /*======================================*/
    /*======================================*/

    // FUNCTION: => setUserIsHost
    // TODO
    setHost(user) {
        console.log('==> setUserIsHost: ', user);
        if (this.state.users.length) {
            for (let i = 0; i < this.state.users.length; i++) {
                // Unset any other host user
                if (this.state.users[i].id !== user.id && this.state.users[i].isHost) {
                    // console.log('> BEFORE: ', this.state.users[i].isHost) // false
                    this.state.users[i].isHost = false;
                    // console.log('> AFTER: ', this.state.users[i].isHost) // true
                    console.log('> (Other) User removed as host');
                }

                // Set user as host
                if (this.state.users[i].id === user.id) {
                    if (!this.state.users[i].isHost) {
                        // console.log('> BEFORE: ', this.state.users[i].isHost) // false
                        this.state.users[i].isHost = true;
                        // console.log('> AFTER: ', this.state.users[i].isHost) // true
                        console.log('> User set as host');
                        console.log('==> END - setHost');
                        return true;
                    } else {
                        console.log('> User is already host');
                        console.log('==> END - setHost');
                        return false;
                    }
                } else {
                    console.log('> Cannot find user');
                    console.log('==> END - setHost');
                    return false;
                }
            }
        } else {
            console.log('> No users');
            console.log('==> END - setHost');
            return false;
        }
    }

    /*======================================*/
    /*======================================*/

    // FUNCTION: => setOriginalHost
    // TODO
    setOriginalHost(userID) {
        console.log('==> setOriginalHost: ', userID);
        console.log('> BEFORE: ', this.state.originalHost);
        this.state.originalHost = userID;
        console.log('> AFTER: ', this.state.originalHost);
        console.log('==> END - setOriginalHost');
    }

    /*================================================
        BLOCK: STATE METHODS - Game Settings
    ==================================================*/

    // FUNCTION: => setGameState
    setGameState(state) {
        console.log('==> setGameState: ', state);
        console.log('> BEFORE: ', this.state.gameState);
        this.state.gameState = state;
        console.log('> AFTER: ', this.state.gameState);
        console.log('==> END - setGameState');
    }

    /*======================================*/
    /*======================================*/

    // FUNCTION: => setGuesses
    setGuesses(guesses) {
        console.log('==> setRound');
        console.log('> BEFORE: ', this.state.guesses);
        this.state.guesses = guesses;
        console.log('> AFTER: ', this.state.guesses);
        console.log('==> END - setRound');
    }

    /*======================================*/
    /*======================================*/

    // FUNCTION: => setRound
    setRound(round) {
        console.log('==> setRound');
        console.log('> BEFORE: ', this.state.round);
        this.state.round = round;
        console.log('> AFTER: ', this.state.round);
        console.log('==> END - setRound');
    }

    /*======================================*/
    /*======================================*/

    // FUNCTION: => setRound
    setClue(clue) {
        console.log('==> setClue');
        console.log('> BEFORE: ', this.state.clue);
        this.state.clue = clue;
        console.log('> AFTER: ', this.state.clue);
        console.log('==> END - setClue');
    }

    /*================================================
        BLOCK: STATE METHODS - Team Info
    ==================================================*/

    // FUNCTION: => setTeamCards
    setTeamCards(team, cards) {
        console.log('==> setTeamCards: ', team, ' ', cards);
        if (team === 'red') {
            console.log('> BEFORE: ', this.state.teamRed.cards);
            this.state.teamRed.cards = cards;
            console.log('> AFTER: ', this.state.teamRed.cards);
        }
        if (team === 'blue') {
            console.log('> BEFORE: ', this.state.teamBlue.cards);
            this.state.teamBlue.cards = cards;
            console.log('> AFTER: ', this.state.teamBlue.cards);
        }
        console.log('==> END - setTeamCards');
    }

    /*======================================*/
    /*======================================*/

    // FUNCTION: => setTeamGuesses
    setTeamGuesses(team, guesses) {
        console.log('==> setTeamGuesses: ', team, ' ', guesses);
        if (team === 'red') {
            console.log('> BEFORE: ', this.state.teamRed.guesses);
            this.state.teamRed.guesses = guesses;
            console.log('> AFTER: ', this.state.teamRed.guesses);
        }
        if (team === 'blue') {
            console.log('> BEFORE: ', this.state.teamBlue.guesses);
            this.state.teamBlue.guesses = guesses;
            console.log('> AFTER: ', this.state.teamBlue.guesses);
        }
        console.log('==> END - setTeamGuesses');
    }

    /*================================================
        BLOCK: STATE METHODS - Users
    ==================================================*/

    // FUNCTION: => addUser
    addUser(user) {
        console.log('==> addUser: ', user);
        console.log('> BEFORE: ', this.state.users);
        this.state.users.push(user);
        console.log('> AFTER: ', this.state.users);
        console.log('==> END - addUser');
    }

    /*======================================*/
    /*======================================*/

    // FUNCTION: => removeUser
    removeUser(userID) {
        console.log('==> removeUser: ', userID);
        console.log('> BEFORE: ', this.state.users);
        this.state.users = this.state.users.filter((user) => user.id !== userID);
        console.log('> AFTER: ', this.state.users);
        console.log('==> END - removeUser');
    }

    /*================================================
        BLOCK: STATE METHODS - User Info
    ==================================================*/

    // FUNCTION: => setUserName
    setUserName(user, newName) {
        console.log('==> setUserName: ', user, ' ', newName);
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].id === user.id) {
                console.log('> BEFORE: ', this.state.users[i].name);
                this.state.users[i].name = newName;
                console.log('> AFTER: ', this.state.users[i].name);
            }
        }
        console.log('==> END - setUserName');
    }

    /*======================================*/
    /*======================================*/

    // FUNCTION: => setUserTeam
    setUserTeam(user, newTeam) {
        console.log('==> setUserTeam: ', user, ' ', newTeam);
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].id === user.id) {
                console.log('> BEFORE: ', this.state.users[i].team);
                this.state.users[i].team = newTeam;
                console.log('> AFTER: ', this.state.users[i].team);
            }
        }
        console.log('==> END - setUserTeam');
    }

    /*======================================*/
    /*======================================*/

    // FUNCTION: => setUserPosition
    setUserPosition(user, newPosition) {
        console.log('==> setUserPosition: ', user, ' ', newPosition);
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].id === user.id) {
                console.log('> BEFORE: ', this.state.users[i].position);
                this.state.users[i].position = newPosition;
                console.log('> AFTER: ', this.state.users[i].position);
            }
        }
        console.log('==> END - setUserPosition');
    }

    /*================================================
        BLOCK: STATE METHODS - Highlighting
    ==================================================*/

    // FUNCTION: => addHighlight
    // TODO
    addHighlight(highlight) {
        console.log('==> addHighlight: ', highlight);
        console.log('> BEFORE: ', this.state.highlights);
        this.state.highlights.push(highlight);
        console.log('> AFTER: ', this.state.highlights);
        console.log('==> END - addHighlight');
    }

    /*======================================*/
    /*======================================*/

    // FUNCTION: => deleteHighlight
    // TODO
    deleteHighlight(userID, cardIndex) {
        console.log('==> deleteHighlight: ', userID, ' ', cardIndex);
        console.log('> BEFORE: ', this.state.highlights);
        this.state.highlights.filter(
            (highlight) => highlight.cardIndex !== cardIndex && highlight.userID !== userID
        );
        console.log('> AFTER: ', this.state.highlights);
        console.log('==> END - deleteHighlight');
    }

    /*======================================*/
    /*======================================*/

    // FUNCTION: => deleteUserHighlight
    // TODO
    deleteUserHighlights(userID) {
        console.log('==> deleteCardHighlights: ', userID);
        console.log('> BEFORE: ', this.state.highlights);
        this.state.highlights.filter((highlight) => highlight.userID !== userID);
        console.log('> AFTER: ', this.state.highlights);
        console.log('==> END - deleteCardHighlights');
    }

    /*======================================*/
    /*======================================*/

    // FUNCTION: => deleteCardHighlight
    // TODO
    deleteCardHighlights(cardIndex) {
        console.log('==> deleteCardHighlights: ', cardIndex);
        console.log('> BEFORE: ', this.state.highlights);
        this.state.highlights.filter((highlight) => highlight.cardIndex !== cardIndex);
        console.log('> AFTER: ', this.state.highlights);
        console.log('==> END - deleteCardHighlights');
    }

    /*======================================*/
    /*======================================*/

    // FUNCTION: => deleteAllHighlights
    // TODO
    deleteAllHighlights() {
        console.log('==> deleteAllHighlights');
        console.log('> BEFORE: ', this.state.highlights);
        this.state.highlights = [];
        console.log('> AFTER: ', this.state.highlights);
        console.log('==> END - deleteAllHighlights');
    }

    /*================================================
        BLOCK: STATE METHODS - Game Log
    ==================================================*/

    // FUNCTION: => addLogItem
    // TODO
    addLogItem(logItem) {
        console.log('==> addLogItem: ', logItem);
        console.log('> BEFORE: ', this.state.log);
        this.state.log.push(logItem);
        console.log('> AFTER: ', this.state.log);
        console.log('==> END - addLogItem');
    }

    /*======================================*/
    /*======================================*/

    // FUNCTION: => deleteAllLogItems
    // TODO
    deleteAllLogItems() {
        console.log('==> deleteAllLogItems');
        this.state.log = [];
        console.log('==> END - deleteAllLogItems');
    }
};

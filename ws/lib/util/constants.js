module.exports = Object.freeze({
    MODE_DEV: true,
    WS_PORT: 3001,

    MAX_OPERATIVES: 5,
    MAX_SPYMASTERS: 2,
    MAX_PLAYERS:    14,

    CARD_TOTAL:         25, // 5x5 board
    CARD_TOTAL_NEUTRAL: 7,
    CARD_TOTAL_BLUE:    8,
    CARD_TOTAL_RED:     9,
    CARD_TOTAL_BLACK:   1,

    SPYMASTER: 'spymaster',
    OPERATIVE: 'operative',

    TAN:   'tan',
    RED:   'red',
    BLUE:  'blue',
    BLACK: 'black',
    GREEN: 'green',

    GAME_STATE_AUTH:           'auth',
    GAME_STATE_SETUP:          'setup',
    GAME_STATE_SPYMASTER_RED:  'spymaster-red',
    GAME_STATE_OPERATIVE_RED:  'operative-red',
    GAME_STATE_SPYMASTER_BLUE: 'spymaster-blue',
    GAME_STATE_OPERATIVE_BLUE: 'operative-blue',
    GAME_STATE_END:            'end',
})
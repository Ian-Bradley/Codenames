export const onst = {
    dev: true,

    debounceDelay: 200,

    maxOperatives: 3,
    maxSpymasters: 1,
    maxPlayers:    8,

    classActive:      'active',
    classDisabled:    'disabled',
    classHidden:      'hidden',
    classHighlighted: 'highlighted',

    transitionTime__fade:        200,
    transitionTime__stateChange: 2000,

    positionSpymaster: 'spymaster',
    positionOperative: 'operative',

    teamTan:   'tan',
    teamRed:   'red',
    teamBlue:  'blue',
    teamBlack: 'black',
    teamGreen: 'green',

    cardNeutral: 'card-neutral',
    cardRed:     'card-red',
    cardBlue:    'card-blue',
    cardBlack:   'card-black',
    cardGreen:   'card-green',

    gameState_setup:          'setup',
    gameState_redSpymaster:   'red-spymaster',
    gameState_redOperatives:  'red-operatives',
    gameState_blueSpymaster:  'blue-spymaster',
    gameState_blueOperatives: 'blue-operatives',
    gameState_end:            'end',

    // cardSizeRatio: 1.5493827,
    cardSizeRatio: 0.6454183,
    cardTextRatio: 0.16,

    cardTotal:        25, // 5x5 board
    cardTotalNeutral: 7,
    cardTotalBlue:    8,
    cardTotalRed:     9,
    cardTotalBlack:   1,

    cardMarginRight: 6,
    cardMarginWidth: 24, // cardMarginRight * 4 (5x5 board with 4 gaps between rows/columns)

    messageOpponent__waitingSpymaster:  'The opponent spymaster is playing, wait for your turn...',
    messageOpponent__waitingOperatives: 'The opponent operatives are playing, wait for your turn...',
    messageOperative:                   'Try to guess a word or clck the End Guessing button',
    messageOperative__waiting:          'Wait for your spymaster to give you a clue...',
    messageSpymaster:                   'Give your operatives a clue.',
    messageSpymaster__waiting:          'Your operatives are guessing now...',
    messageGame__setup:                 'Set up a game',
    messageGame__endRed:                'Red team wins!',
    messageGame__endBlue:               'Blue team wins!',
}
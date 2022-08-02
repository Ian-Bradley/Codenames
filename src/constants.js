export const onst = {
    dev: true,

    debounceDelay: 200,

    maxOperatives: 5,
    maxSpymasters: 2,
    maxPlayers:    12,

    appWidth:      1920,
    appHeight:     1080,

    cardWidth:     214.32, // 208.32(Card) + 6(Margin)
    cardHeight:    140.4, // 134.4(Card) + 6(Margin)
    cardLeftBase:  425, // 340(Sidebar) + 85(Margin)
    cardTopBase:   0,
    cardTextSpacing1: 0.16,
    cardTextSpacing2: 0.16,

    cardTotal:        25, // 5x5 board
    cardTotalNeutral: 7,
    cardTotalBlue:    8,
    cardTotalRed:     9,
    cardTotalBlack:   1,

    transitionTime__fade:        200,
    transitionTime__stateChange: 2000,

    classActive:      'active',
    classDisabled:    'disabled',
    classHidden:      'hidden',
    classHighlighted: 'highlighted',
    classChosen:      'chosen',

    spymaster: 'spymaster',
    operative: 'operative',

    tan:   'tan',
    red:   'red',
    blue:  'blue',
    black: 'black',
    green: 'green',

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

    messageOpponent__waitingSpymaster:  'The opponent spymaster is playing, wait for your turn...',
    messageOpponent__waitingOperatives: 'The opponent operatives are playing, wait for your turn...',
    messageOperative:                   'Try to guess a word or clck the End Guessing button',
    messageOperative__waiting:          'Wait for your spymaster to give you a clue...',
    messageSpymaster:                   'Give your operatives a clue.',
    messageSpymaster__waiting:          'Your operatives are guessing now...',
    messageGame__setup:                 'Set up a game',
    messageGame__endRed:                'Red team wins!',
    messageGame__endBlue:               'Blue team wins!',


    fakeLog: [
        { player: {team: 'red', name: 'Chilled'}, itemType: 'clue', clue: 'Food' },
        { player: {team: 'blue', name: 'Platy'}, itemType: 'choose', cardText: 'Tower' },
        { player: {team: 'red', name: 'Tom Fawkes'}, itemType: 'choose', cardText: 'Spring' },
        { player: {team: 'blue', name: 'Courtilly'}, itemType: 'choose', cardText: 'Soldier' },
        { player: {team: 'red', name: 'Junk'}, itemType: 'end' },
        { player: {team: 'red', name: 'Raven'}, itemType: 'choose', cardText: 'Cheque' },
        { player: {team: 'red', name: 'Kara'}, itemType: 'choose', cardText: 'Sorting' },
        { player: {team: 'blue', name: 'Chibi'}, itemType: 'choose', cardText: 'Dragons' },
        { player: {team: 'red', name: 'Cheesy'}, itemType: 'choose', cardText: 'I Want The Pipe' },
        { player: {team: 'blue', name: 'Silver'}, itemType: 'choose', cardText: 'Baraka' },
        { player: {team: 'red', name: 'Kat'}, itemType: 'choose', cardText: 'Cow' },
        { player: {team: 'red', name: 'Jeremy'}, itemType: 'choose', cardText: 'Purple' },
        { player: {team: 'blue', name: 'Alfredo'}, itemType: 'end' },
        { player: {team: 'red', name: 'Jackie'}, itemType: 'choose', cardText: 'Nachos' },
        { player: {team: 'red', name: 'Fooya'}, itemType: 'choose', cardText: 'Zepplin' },
        { player: {team: 'blue', name: 'Knovis'}, itemType: 'choose', cardText: 'Plain' },
        { player: {team: 'blue', name: 'Speedy'}, itemType: 'choose', cardText: 'Mucho' },
        { player: {team: 'blue', name: 'SideArms'}, itemType: 'choose', cardText: 'Taco' },
        { player: {team: 'red', name: 'ZeRoyalViking'}, itemType: 'choose', cardText: 'Salad' },
        { player: {team: 'red', name: 'Tay'}, itemType: 'victory' },
    ],
}
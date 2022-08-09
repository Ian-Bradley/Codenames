export const MODE_DEV = true;
export const WS_URL = 'ws://localhost:3001';

export const DEBOUNCE_DELAY= 200;

// TODO change to actual math...
// rows = x+1, columns = x+5, loop for length 5 for both
export const COLUMNS=  {
    TWO: [1, 6, 11, 16, 21],
    THREE: [2, 7, 12, 17, 22],
    FOUR: [3, 8, 13, 18, 23],
    FIVE: [4, 9, 14, 19, 24],
};
export const ROWS = {
    TWO: [5, 6, 7, 8, 9],
    THREE: [10, 11, 12, 13, 14],
    FOUR: [15, 16, 17, 18, 19],
    FIVE: [20, 21, 22, 23, 24],
};

export const MAX_OPERATIVES = 5;
export const MAX_SPYMASTERS = 2;
export const MAX_PLAYERS = 14;

export const APP_WIDTH = 1920;
export const APP_HEIGHT = 1080;

export const CARD_WIDTH = 214.32; // 208.32 (Card) + 6(Margin)
export const CARD_HEIGHT = 140.4; // 134.4  (Card) + 6(Margin)
export const CARD_BASE_LEFT = 425; // 340 (Sidebar) + 85(Margin)
export const CARD_BASE_TOP = 0;
export const CARD_TEXT_RAISER_1 = 0.16;
export const CARD_TEXT_RAISER_2 = 0.16;

export const TRANSITION_DURATION_FADE = 200;
export const TRANSITION_DURATION_STATE = 2000;

export const CLASS_ACTIVE = 'active';
export const CLASS_DISABLED = 'disabled';
export const CLASS_HIDDEN = 'hidden';
export const CLASS_HIGHLIGHTED = 'highlighted';
export const CLASS_CHOSEN = 'chosen';

export const SPYMASTER = 'spymaster';
export const OPERATIVE = 'operative';

export const COLOR_TAN = 'tan';
export const COLOR_RED = 'red';
export const COLOR_BLUE = 'blue';
export const COLOR_BLACK = 'black';
export const COLOR_GREEN = 'green';

export const CARD_RED = 'card-red';
export const CARD_BLUE = 'card-blue';
export const CARD_BLACK = 'card-black';
export const CARD_GREEN = 'card-green';
export const CARD_NEUTRAL = 'card-neutral';

export const GAME_STATE_AUTH = 'auth';
export const GAME_STATE_SETUP = 'setup';
export const GAME_STATE_SPYMASTER_RED = 'spymaster-red';
export const GAME_STATE_OPERATIVE_RED = 'operative-red';
export const GAME_STATE_SPYMASTER_BLUE = 'spymaster-blue';
export const GAME_STATE_OPERATIVE_BLUE = 'operative-blue';
export const GAME_STATE_END = 'end';

//TODO RENAME
export const TEXT_Opponent__waitingSpymaster =
    'The opponent spymaster is playing, wait for your turn...';
export const TEXT_Opponent__waitingOperatives =
    'The opponent operatives are playing, wait for your turn...';
export const TEXT_OPERATIVE_PLAYING = 'Try to guess a word or clck the End Guessing button';
export const TEXT_OPERATIVE_WAITING = 'Wait for your spymaster to give you a clue...';
export const TEXT_SPYMASTER_PLAYING = 'Give your operatives a clue.';
export const TEXT_SPYMASTER_WAITING = 'Your operatives are guessing now...';
export const TEXT_GAME_SETUP = 'Set up a game';
export const TEXT_GAME_END_RED = 'Red team wins!';
export const TEXT_GAME_END_BLUE = 'Blue team wins!';

export const FAKE_LOG = [
    { team: 'red', name: 'Chilled', type: 'clue', clueText: 'Food' },
    { team: 'blue', name: 'Platy', type: 'choose', cardText: 'Tower' },
    { team: 'red', name: 'Tom Fawkes', type: 'choose', cardText: 'Spring' },
    { team: 'blue', name: 'Courtilly', type: 'choose', cardText: 'Soldier' },
    { team: 'red', name: 'Junk', type: 'end' },
    { team: 'red', name: 'Raven', type: 'choose', cardText: 'Cheque' },
    { team: 'red', name: 'Kara', type: 'choose', cardText: 'Sorting' },
    { team: 'blue', name: 'Chibi', type: 'choose', cardText: 'Dragons' },
    { team: 'red', name: 'Cheesy', type: 'choose', cardText: 'I Want The Pipe' },
    { team: 'blue', name: 'Silver', type: 'choose', cardText: 'Baraka' },
    { team: 'red', name: 'Kat', type: 'choose', cardText: 'Cow' },
    { team: 'red', name: 'Jeremy', type: 'choose', cardText: 'Purple' },
    { team: 'blue', name: 'Alfredo', type: 'end' },
    { team: 'red', name: 'Jackie', type: 'choose', cardText: 'Nachos' },
    { team: 'red', name: 'Fooya', type: 'choose', cardText: 'Zepplin' },
    { team: 'blue', name: 'Knovis', type: 'choose', cardText: 'Plain' },
    { team: 'blue', name: 'Speedy', type: 'choose', cardText: 'Mucho' },
    { team: 'blue', name: 'SideArms', type: 'choose', cardText: 'Taco' },
    { team: 'red', name: 'ZeRoyalViking', type: 'choose', cardText: 'Salad' },
    { team: 'red', name: 'Tay', type: 'victory' },
];

export const LOTR_NAMES = [
    'Adalgrim Took','Adanedhel','Adanel','Adrahil','Adrahil II','Aegnor','Ælfwine','Aerin','Agarwaen','Aikanáro','Aiwendil','Alatar','Alatáriel','Aldamir','Aldaron',
    'Aldor','Amandil','Amdír','Amlaith','Amras','Amrod','Amroth','Amrothos','Anairë','Anardil','Anárion','Anborn','Ancalagon','Andrast','Andreth','Andróg','Anfauglir',
    'Angbor','Angrod','Annatar','Ar-Abattârik','Ar-Adûnakhôr','Ar-Gimilzôr','Ar-Inziladûn','Ar-Pharazôn','Ar-Sakalthôr','Ar-Zimraphel','Ar-Zimrathôn','Arador','Araglas',
    'Aragorn I','Aragorn II','Aragost','Arahad','Arahad I','Arahad II','Arahael','Aranarth','Arantar','Aranuir','Araphant','Araphor','Arassuil','Aratan','Aratar',
    'Arathorn I','Arathorn II','Araval','Aravir','Aravorn','Aredhel','Aredhel','Argeleb','Argeleb I','Argeleb II','Argon','Argonui','Arien','Aros','Arthedain','Arvedui',
    'Arvegil','Arveleg I','Arveleg II','Arwen','Atanatar','Atanatar I','Atanatar II','Aulë','Ausir','Avranc','Azaghâl','Azog','Balbo Baggins','Baldor','Balin','Baragund',
    'Barahir','Baran','Bard the Bowman','Barliman Butterbur','Bauglir','Beechbone','Belecthor I','Belecthor II','Beleg','Beleg of Arnor','Belegorn','Belegund','Belemir',
    'Belladonna Took','Bëor','Beorn','Bereg','Beregond','Beren','Bergil','Berúthiel','Berylla Boffin','Bifur','Bilbo Baggins','Bill Ferny','Bill the Pony','Bob','Bofur',
    'Boldog','Bolg','Bombur','Bór','Borin','Boromir','Boron','Borondir','Brand','Brand II','Brandir','Brego','Bregolas','Bregor','Brodda','Brytta Léofa',
    'Bucca of the Marish','Bullroarer Took','Bungo Baggins','Calembel','Calimehtar','Calmacil','Captain of the Haven','Caranthir','Carcharoth','Carl Cotton',
    'Castamir the Usurper','Celeborn','Celebrían','Celebrimbor','Celebrindor','Celegorm','Celepharn','Cemendur','Ceorl','Círdan','Cirion','Ciryaher','Ciryandil',
    'Ciryon','Curufin','Curunír','Daeron','Dáin I','Dáin II Ironfoot','Damrod','Déagol','Denethor','Denethor I','Denethor II','Déor','Deórwine','Déorwine','Dernhelm',
    'Derufin','Dervorin','Diamond of Long Cleeve','Dior','Dís','Dori','Dorlas','Draugluin','Duilin','Duilin son of Duinhir','Duinhir','Dúnhere','Durin','Durin II',
    'Durin III','Durin IV','Durin V','Durin VI','Durin VII','Durin\'s Bane','Dwalin','Eärendil','Eärendil of Gondor','Eärendur of Andúnië','Eärendur of Arnor',
    'Eärendur son of Tar-Amandil','Eärnil I','Eärnil II','Eärnur','Eärwen','Ecthelion','Ecthelion I','Ecthelion II','Ecthelion of the Fountain','Egalmoth','Eiliniel',
    'Elanor the Fair','Elbereth','Eldacar','Eldacar of Arnor','Eldacar of Gondor','Eldarion','Elemmakil','Elendil','Elendor','Elendur of Arnor','Elendur son of Isildur',
    'Elenna','Elenwë','Elessar','Elfhelm','Elfhild','Elfwine','Elladan','Elmo','Elrohir','Elrond','Elros','Elu','Eluréd and Elurín','Elven-king','Elwë','Elwing',
    'Emeldir','Emerië','Enel','Enelyë','Eöl','Éomer','Éomund','Eönwë','Eorl the Young','Éothain','Éothéod','Éowyn','Eradan','Erendis','Erestor','Erkenbrand',
    'Eru Ilúvatar','Estë','Estel','Estelmo','Faniel','Faramir','Faramir Took','Farmer Cotton','Farmer Maggot','Fastred of Greenholm','Fëanor','Felaróf','Fengel',
    'Ferumbras III  Took','Fíli','Finarfin','Findis','Finduilas','Finduilas of Dol Amroth','Fingolfin','Fingon','Finrod Felagund','Finvain','Finwë','Fíriel',
    'Folco Boffin','Folcwine','Forlong the Fat','Fortinbras II  Took','Fréa','Fréaláf Hildeson','Fréawine','Freca','Fredegar Bolger','Frerin','Frodo Baggins',
    'Frór','Fuinur','Fundin','Gaffer Gamgee','Galador','Galadriel','Galdor of Gondolin','Galdor of the Havens','Galdor the Tall','Gamil Zirak','Gamling','Gandalf',
    'Gárulf','Gerontius Took','Ghân-buri-Ghân','Gil-galad','Gildor Inglorion','Gilrain','Gimilkhâd','Gimli','Ginglith','Girion','Glanhír','Glaurung','Gléowine','Glóin',
    'Glóredhel','Glorfindel','Golasgil','Goldberry','Goldwine','Golfimbul','Gollum','Gorbag','Gorlim','Gormadoc Brandybuck','Gorthaur','Gothmog','Gram','Gríma',
    'Grimbold','Grishnákh','Grór','Guthláf','Gwaihir','Gwathir','Gwindor','Hador','Halbarad','Haldad','Haldan','Haldar','Haldir','Haldir of Lórien','Haleth','Hallas',
    'Halmir','Háma','Hamfast Gamgee','Handir','Hardang','Harding','Hareth','Harry Goatleaf','Helm Hammerhand','Herefara','Herion','Herubrand','Herucalmo','Herumor',
    'Hirgon','Hiril','Hirluin','Hob Hayward','Hound of Sauron','Huan','Hundar','Huor','Húrin','Húrin I','Húrin II','Húrin the Tall','Hyarmendacil I','Hyarmendacil II',
    'Ibûn','Idril','Ilmarë','Ilúvatar','Imbar','Imin','Iminyë','Imrahil','Indis','Inglor','Ingold','Ingwë','Inzilbêth','Ioreth','Iorlas','Írildë','Irimë','Irmo',
    'Isildur','Isilmë','Isilmo','Isumbras Took','Ivriniel','Khamûl','Khîm','Kíli','King of the Dead','Lagduf','Lalaith','Landroval','Leaflock','Legolas','Lenwë','Léod',
    'Lindir','Lobelia Sackville-Baggins','Lotho Sackville-Baggins','Lugdush','Lúthien','Mablung','Maedhros','Maeglin','Maglor','Magor','Mahtan','Maiar','Malach',
    'Malbeth the Seer','Mallor','Malvegil','Man in the Moon','Manthor','Manwë','Marach','Mardil Voronwë','Mat Heathertoes','Mauhúr','Meleth','Melian','Meneldil',
    'Meneldor','Meriadoc Brandybuck','Mîm','Minalcar','Minardil','Míriel','Mithrandir','Morgoth','Morwen','Morwen Steelsheen','Mouth of Sauron','Muzgash','Nahar','Náin',
    'Náin I','Náin II','Námo','Narmacil I','Narmacil II','Narvi','Nazgûl','Nerdanel','Nessa','Nienna','Nienor','Nimloth','Nimrodel','Níniel','Nob','Nóm','Nori',
    'Odo Proudfoot','Ohtar','Óin son of Glóin','Óin son of Gróin','Old Man Willow','Old Noakes','Olórin','Olwë','Ondoher','Ori','Ornendil','Orodreth','Oromë','Oropher',
    'Orophin','Ossë','Ostoher','Paladin II Took','Paladin Took','Pallando','Pearl Took','Pelendur','Pengolodh','Peregrin Took','Pervinca Took','Pimpernel Took',
    'Primula Brandybuck','Queen Berúthiel','Quickbeam','Radagast','Radbug','Rían','Robin Smallburrow','Rómendacil I','Rómendacil II','Rosie Cotton','Rowlie Appledore',
    'Rúmil','Sador','Saeros','Salgant','Salmar','Samwise Gamgee','Sancho Proudfoot','Saruman','Sauron','Scatha','Shadowfax','Shagrat','Shelob','Silmariën','Singollo',
    'Siriondil','Skinbark','Smaug','Sméagol','Snaga','Snowmane','Soronto','Strider','Tal-Elmar','Tar-Alcarin','Tar-Aldarion','Tar-Amandil','Tar-Anárion','Tar-Ancalimë',
    'Tar-Ancalimon','Tar-Anducal','Tar-Ardamin','Tar-Atanamir','Tar-Calion','Tar-Calmacil','Tar-Ciryatan','Tar-Elendil','Tar-Falassion','Tar-Herunúmen','Tar-Hostamir',
    'Tar-Meneldur','Tar-Minastir','Tar-Minyatur','Tar-Palantir','Tar-Súrion','Tar-Telemmaitë, ','Tar-Telemnar','Tar-Telperiën','Tar-Vanimeldë','Tarannon Falastur',
    'Tarcil','Targon','Tarondor of Arnor','Tarondor of Gondor','Tata','Tatië','Ted Sandyman','Telchar','Telemnar','Telumehtar','Thengel','Théoden','Théodred','Théodwyn',
    'Thingol','Thorin I','Thorin II Oakenshield','Thorin III Stonehelm','Thorondir','Thorondor','Thráin I','Thráin II','Thranduil','Thrór','Tilion','Tindomiel',
    'Tinúviel','Tom Bombadil','Tom Pickthorn','Treebeard','Trotter','Tulkas','Tuor','Turambar','Turgon','Túrin','Túrin I','Túrin II','Ufthak','Uglúk','Uinen','Uldor',
    'Ulfang','Ulfast','Ulmo','Ulwarth','Umbardacil','Undómiel','Ungoliant','Uolë Kúvion','Urwen','Vairë','Valacar','Valandil of Andúnië','Valandil of Arnor','Valandur',
    'Vána','Varda','Vardamir Nólimon','Vidugavia','Vidumavi','Vinyarion','Vorondil the Hunter','Voronwë','Walda','Watcher in the Water','Wídfara','Will Whitfoot',
    'Witch-king of Angmar','Wormtongue','Wulf','Yavanna','Yávien'
];
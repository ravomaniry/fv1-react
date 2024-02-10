export interface AppTexts {
  title1: string;
  title2: string;
  shortTitle1: string;
  shortTitle2: string;
  appSlogan: string;
  continueButton: string;
  login: string;
  loginTitle: string;
  createAccount: string;
  continueAsGuest: string;
  noAccountYet: string;
  score: string;
  quizHelp: string;
  requiredFieldMessage: string;
  explorerHelp: string;
  errorInternet: string;
  errorUnknown: string;
  errorAudioPlayer: string;
  errorInvalidCredentials: string;
  loadingAudio: string;
  errorNotConnected: string;
  errorDuplicateUsername: string;
  errorWeakPassword: string;
  errorProgressNotSaved: string;
  noNewTeaching: string;
  username: string;
  password: string;
  or: string;
  logOut: string;
  close: string;
  teachingsInProgress: string;
  teachingsAvailable: string;
  helpTitle: string;
  helpLoginTitle: string;
  helpLoginDescription: string;
  helpHomeTitle: string;
  helpHomeDescription: string;
  helpTeachingSummaryTitle: string;
  helpTeachingSummaryDescription: string;
  helpChapterTitle: string;
  helpChapterDescription: string;
  helpQuizTitle: string;
  helpQuizDescription: string;
}

export const mgTexts: AppTexts = {
  title1: 'fitiavana',
  title2: 'voalohany',
  shortTitle1: 'fitia',
  shortTitle2: 'v1',
  appSlogan: '... fa ny fahasoavana sy ny fahamarinana kosa dia tonga tamin’ ny alalan’ i Jesosy Kristy - Jaona 1:17',
  continueButton: 'TOHIZANA',
  login: 'HIDITRA',
  loginTitle: "Hiditra amin'ny kaontinao:",
  score: 'Valiny marina',
  quizHelp: 'Valio ireto fanontaniana manaraka ireto ' + 'araka ny fahazoanao ny fampianarana:',
  requiredFieldMessage: 'Valio ity fanontaniana ity azafady.',
  explorerHelp:
    'Tsy misy fampianarana azo aseho.\n' +
    '- Tsindrio ny bokotra 🔍 hahitanao ireo fampianarana azo arahina.\n' +
    '- Mila internet vao afaka mahita ireo lisitry ny fampianarana.',
  errorInternet: 'Misy olana ny internet.',
  errorUnknown: 'Misy olana. ' + 'Akatony ary avereno akatona ny application azafady.',
  errorAudioPlayer: 'Tsy afaka henoina ny audio. Avereno vakiana azafady.',
  loadingAudio: 'Eo am-panokafana ny "audio". Mandrasa kely azafady.',
  noNewTeaching:
    'Mbola tsy misy fampianarana vaovao. ' +
    'Raha hijery ireo fampianarana efa natombokao dia ' +
    'jereo ny pejy voalohany azafady.',
  errorInvalidCredentials:
    'Diso ny anarana na ny teny miafina. ' +
    'Avereno azafady, na manokafa kaonty vaovao raha mbola tsy manana kaonty ianao.',
  errorNotConnected: 'Misy olana ny kaontinao fa akatony ary miverena miditra azafady.',
  errorDuplicateUsername: 'Efa misy io anarana io. Soloy hafa azafady.',
  errorWeakPassword: 'Tsotra loatra ily teny miafina nataonao. Ataovy lavalava azafady.',
  errorProgressNotSaved: 'Tsy voatahiry valim-panontaniana nomenao. Mety misy olana ny internet.',
  username: 'Anarana',
  password: 'Teny miafina',
  continueAsGuest: 'HAMPIASA KAONTY TSY MISY ANARANA',
  createAccount: 'HANOKATRA KAONTY VAOVAO',
  noAccountYet: 'Mbola tsy manana kaonty ve ianao?',
  or: 'na',
  logOut: 'HIALA',
  close: 'Akatona',
  teachingsInProgress: 'Ireo fampianarana arahinao:',
  teachingsAvailable: 'Fampianarana vaovao:',
  helpTitle: 'Torolalana',
  helpLoginTitle: "1. Miditra ao amin'ny kaonty",
  helpLoginDescription:
    '**Raha efa manana kaonty ianao**:\n' +
    '- **(1)** Fenoy ny anarana sy ny teny mifina\n' +
    '- **(2)** Tsindrio ny bokotra "Hiditra"\n\n' +
    "**Raha mbola tsy manana kanonty ianao dia afaka manao ny iray amin'ireto:**\n" +
    '- **(3)** Manokatra kaonty vaovao misy anarana:' +
    "\\\nafaka sokafanao amin'ny smartphone na ordinateur hafa ny kaonty misy anarana.\n" +
    '- **(4)** Manokatra kaonty **tsy misy** anarana:' +
    '\\\nafaka mampiasa ny appilcation manontolo ianao fa tsy afaka manokatra ilay kaonty ' +
    "amin'ny smarphone na ordinateur hafa satria tsy fantatrao ny anarana sy ny teny miafina.",
  helpHomeTitle: '2. Lisitry ny fampianarana',
  helpHomeDescription:
    '**(1)** Ny lisitry ny fampianarana efa natombokao. ' +
    'Tsindrio izay tianao hotohizan.\n\n' +
    '**(2)** Tsindrio ity bokotra ity raha te hijery ireo fampianarana vaovao mbola tsy natombokao ianao.',
  helpTeachingSummaryTitle: '3. Fampianarana',
  helpTeachingSummaryDescription:
    "Rehefa manokatra fampianarana ianao dia hitanao hoe taiza ianao no nijanona tamin'ny farany." +
    'Tsindrio ny lohahevitra tianao hotohizana.',
  helpChapterTitle: '4. Lohahevitra',
  helpChapterDescription:
    'Ny fampianarana iray dia mizara lohahaevitra maromaro. Ny lohahevitra tsirairay dia misy audio miaraka aminy.\n\n' +
    '**(1)** Ny hevitra: Tsindrio eo raha te hihaino ny fampianarana ianao.\\\n' +
    "**(2)** Ny tenin'Andriamanitra,\\\n" +
    '**(3)** Fanazavana fohy',
  helpQuizTitle: '5. Fanontainana',
  helpQuizDescription:
    'Isaky ny mahavita lohahevitra iray ianao dia misy fanontaniana vitsivitsy valiana ' +
    'ahafahanao manamafy ny zavatra nianarana.',
};

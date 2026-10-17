/* Word lists: ONLY the words from the study-guide table (Present continuous ING writing). Edit here to change vocabulary. */
const VERBS=['bouncing','kicking','catching','running','hitting','throwing','jumping','cheering','teaching','scoring','walking','crawling'];
const BASE={bouncing:'bounce',kicking:'kick',catching:'catch',running:'run',hitting:'hit',throwing:'throw',jumping:'jump',cheering:'cheer',teaching:'teach',scoring:'score',walking:'walk',crawling:'crawl'};
const PREPS=['on','into','over','through','across','around'];
const PLACES=['track','bleacher','court','field','diamond','sand','circuit'];
const SPORTS=['basketball','volleyball','soccer','baseball','tennis'];
const VOCAB=['goal','bat','bar','whistle','megaphone','hoop','ball','hurdles','team','net','racquet','cones','chair','rope','stick'];
const FORMS={hurdles:['hurdles','hurdle'],cones:['cones','cone'],bleacher:['bleacher','bleachers'],fans:['fans','fan'],racquet:['racquet','racket']};
const PLURAL={runner:'runners',player:'players',athlete:'athletes',coach:'coaches',teacher:'teachers',goalkeeper:'goalkeepers'};

const MEMBER_WORDS=new Set(['player','players','goalkeeper','goalkeepers','runner','runners','athlete','athletes','coach','coaches','fan','fans','teacher','teachers']);
const PLACE_WORDS=new Set(['track','tracks','bleacher','bleachers','court','courts','field','fields','diamond','sand','circuit']);
const VERB_SET=new Set(VERBS), PREP_SET=new Set(PREPS);
const VOCAB_WORDS=new Set([...VOCAB,...SPORTS,'goals','bats','bars','whistles','megaphones','hoops','balls','hurdle','teams','nets','racquets','racket','cone','chairs','ropes','sticks']);
const ROLES=['coach','runner','player','fans','teacher','athlete','goalkeeper','team'];
const ALL_WORDS=new Set([...VERBS,...Object.values(BASE),...PREPS,...PLACES,...SPORTS,...VOCAB,...MEMBER_WORDS,...VOCAB_WORDS,...ROLES]);

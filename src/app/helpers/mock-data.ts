import {User} from "../models/user";
import {Book} from "../models/book";

export const users: User[] = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];
export const books: Book[] = [
  { id: '1',
    name: 'Programarea în limbajul C/C++ pentru liceu',
    authors: ['MARINEL SERBAN', 'EMANUELA CERCHEZ'],
    image: 'https://cdn.dc5.ro/img-prod/1393591309-0-240.jpeg',
    description: 'Structura cărții include atât materia prevăzută în programele școlare actuale de la clasele de profil, cât și teme care se studiază în Centrele de Excelență, pentru o pregătire de performanță. Conținutul teoretic este susținut prin exemple aplicative și prin numeroase rezolvări de probleme, iar fiecare temă este însoțită de un set consistent de probleme reprezentative, propuse spre rezolvare. Limbajul de programare C a devenit un standard: noile limbaje (de programare sau de scripting) care se impun pe piața dezvoltatorilor de software au ca punct de plecare sintaxa C/C++ (Java, Javascript, ActionScript, PHP etc.).',
    count: 2
  },
  { id: '2',
    name: 'Web Design de Succes',
    authors: ['VICTOR MARCOIANU'],
    image: 'https://cdn.dc5.ro/img-prod/1339361245-0-240.jpeg',
    description: 'Structura cărții include atât materia prevăzută în programele școlare actuale de la clasele de profil, cât și teme care se studiază în Centrele de Excelență, pentru o pregătire de performanță. Conținutul teoretic este susținut prin exemple aplicative și prin numeroase rezolvări de probleme, iar fiecare temă este însoțită de un set consistent de probleme reprezentative, propuse spre rezolvare. Limbajul de programare C a devenit un standard: noile limbaje (de programare sau de scripting) care se impun pe piața dezvoltatorilor de software au ca punct de plecare sintaxa C/C++ (Java, Javascript, ActionScript, PHP etc.).',
    count: 1
  },
  { id: '3',
    name: 'Programarea placii Arduino',
    authors: ['TRAIAN ANGHEL'],
    image: 'https://cdn.dc5.ro/img-prod/819715408-0.jpeg',
    description: 'Structura cărții include atât materia prevăzută în programele școlare actuale de la clasele de profil, cât și teme care se studiază în Centrele de Excelență, pentru o pregătire de performanță. Conținutul teoretic este susținut prin exemple aplicative și prin numeroase rezolvări de probleme, iar fiecare temă este însoțită de un set consistent de probleme reprezentative, propuse spre rezolvare. Limbajul de programare C a devenit un standard: noile limbaje (de programare sau de scripting) care se impun pe piața dezvoltatorilor de software au ca punct de plecare sintaxa C/C++ (Java, Javascript, ActionScript, PHP etc.).',
    count: 1
  },
  { id: '4',
    name: 'Java de la 0 la expert ',
    authors: ['STEFAN TANASA'],
    image: 'https://cdn.dc5.ro/img-prod/9789734624058-1860916.jpg',
    description: 'Structura cărții include atât materia prevăzută în programele școlare actuale de la clasele de profil, cât și teme care se studiază în Centrele de Excelență, pentru o pregătire de performanță. Conținutul teoretic este susținut prin exemple aplicative și prin numeroase rezolvări de probleme, iar fiecare temă este însoțită de un set consistent de probleme reprezentative, propuse spre rezolvare. Limbajul de programare C a devenit un standard: noile limbaje (de programare sau de scripting) care se impun pe piața dezvoltatorilor de software au ca punct de plecare sintaxa C/C++ (Java, Javascript, ActionScript, PHP etc.).',
    count: 1
  },
  { id: '5',
    name: 'Programare Web in bash si Perl',
    authors: ['SABIN BURAGA','STEFAN TANASA'],
    image: 'https://cdn.dc5.ro/img-prod/1658099-0.jpeg',
    description: 'Structura cărții include atât materia prevăzută în programele școlare actuale de la clasele de profil, cât și teme care se studiază în Centrele de Excelență, pentru o pregătire de performanță. Conținutul teoretic este susținut prin exemple aplicative și prin numeroase rezolvări de probleme, iar fiecare temă este însoțită de un set consistent de probleme reprezentative, propuse spre rezolvare. Limbajul de programare C a devenit un standard: noile limbaje (de programare sau de scripting) care se impun pe piața dezvoltatorilor de software au ca punct de plecare sintaxa C/C++ (Java, Javascript, ActionScript, PHP etc.).',
    count: 1
  },
  { id: '6',
    name: 'Programare C Si C++ Pentru Linux',
    authors: ['DRAGOS ACOSTACHIOAIE'],
    image: 'https://cdn.dc5.ro/img-prod/71812-0.jpeg',
    description: 'Structura cărții include atât materia prevăzută în programele școlare actuale de la clasele de profil, cât și teme care se studiază în Centrele de Excelență, pentru o pregătire de performanță. Conținutul teoretic este susținut prin exemple aplicative și prin numeroase rezolvări de probleme, iar fiecare temă este însoțită de un set consistent de probleme reprezentative, propuse spre rezolvare. Limbajul de programare C a devenit un standard: noile limbaje (de programare sau de scripting) care se impun pe piața dezvoltatorilor de software au ca punct de plecare sintaxa C/C++ (Java, Javascript, ActionScript, PHP etc.).',
    count: 0
  },
  { id: '7',
    name: 'Dictionar de informatica',
    authors: ['TRAIAN ANGHEL'],
    image: 'https://cdn.dc5.ro/img-prod/1992996-1.jpeg',
    description: 'Structura cărții include atât materia prevăzută în programele școlare actuale de la clasele de profil, cât și teme care se studiază în Centrele de Excelență, pentru o pregătire de performanță. Conținutul teoretic este susținut prin exemple aplicative și prin numeroase rezolvări de probleme, iar fiecare temă este însoțită de un set consistent de probleme reprezentative, propuse spre rezolvare. Limbajul de programare C a devenit un standard: noile limbaje (de programare sau de scripting) care se impun pe piața dezvoltatorilor de software au ca punct de plecare sintaxa C/C++ (Java, Javascript, ActionScript, PHP etc.).',
    count: 3
  },
  { id: '8',
    name: 'Hello, world!',
    authors: ['HANNAH FRY'],
    image: 'https://cdn.dc5.ro/img-prod/333041448-1.jpeg',
    description: 'Structura cărții include atât materia prevăzută în programele școlare actuale de la clasele de profil, cât și teme care se studiază în Centrele de Excelență, pentru o pregătire de performanță. Conținutul teoretic este susținut prin exemple aplicative și prin numeroase rezolvări de probleme, iar fiecare temă este însoțită de un set consistent de probleme reprezentative, propuse spre rezolvare. Limbajul de programare C a devenit un standard: noile limbaje (de programare sau de scripting) care se impun pe piața dezvoltatorilor de software au ca punct de plecare sintaxa C/C++ (Java, Javascript, ActionScript, PHP etc.).',
    count: 3
  },
  { id: '9',
    name: 'Novacenul. Viitoarea epoca a hiperinteligentei',
    authors: ['JAMES LOVELOCK'],
    image: 'https://cdn.dc5.ro/img-prod/691148788-0.jpeg',
    description: 'Structura cărții include atât materia prevăzută în programele școlare actuale de la clasele de profil, cât și teme care se studiază în Centrele de Excelență, pentru o pregătire de performanță. Conținutul teoretic este susținut prin exemple aplicative și prin numeroase rezolvări de probleme, iar fiecare temă este însoțită de un set consistent de probleme reprezentative, propuse spre rezolvare. Limbajul de programare C a devenit un standard: noile limbaje (de programare sau de scripting) care se impun pe piața dezvoltatorilor de software au ca punct de plecare sintaxa C/C++ (Java, Javascript, ActionScript, PHP etc.).',
    count: 0
  },
  { id: '10',
    name: 'Inteligenta artificiala',
    authors: ['ANGIE SMIBERT'],
    image: 'https://cdn.dc5.ro/img-prod/857189496-0.jpeg',
    description: 'Structura cărții include atât materia prevăzută în programele școlare actuale de la clasele de profil, cât și teme care se studiază în Centrele de Excelență, pentru o pregătire de performanță. Conținutul teoretic este susținut prin exemple aplicative și prin numeroase rezolvări de probleme, iar fiecare temă este însoțită de un set consistent de probleme reprezentative, propuse spre rezolvare. Limbajul de programare C a devenit un standard: noile limbaje (de programare sau de scripting) care se impun pe piața dezvoltatorilor de software au ca punct de plecare sintaxa C/C++ (Java, Javascript, ActionScript, PHP etc.).',
    count: 3
  },
  { id: '11',
    name: 'Get Technology',
    authors: ['GERALD LYNCH'],
    image: 'https://cdn.dc5.ro/img-prod/253588195-0.jpeg',
    description: 'Structura cărții include atât materia prevăzută în programele școlare actuale de la clasele de profil, cât și teme care se studiază în Centrele de Excelență, pentru o pregătire de performanță. Conținutul teoretic este susținut prin exemple aplicative și prin numeroase rezolvări de probleme, iar fiecare temă este însoțită de un set consistent de probleme reprezentative, propuse spre rezolvare. Limbajul de programare C a devenit un standard: noile limbaje (de programare sau de scripting) care se impun pe piața dezvoltatorilor de software au ca punct de plecare sintaxa C/C++ (Java, Javascript, ActionScript, PHP etc.).',
    count: 3
  },
  { id: '12',
    name: 'Mitul inteligentei artificiale',
    authors: ['ERIK J. LARSON'],
    image: 'https://cdn.dc5.ro/img-prod/1700989293-0.jpeg',
    description: 'Structura cărții include atât materia prevăzută în programele școlare actuale de la clasele de profil, cât și teme care se studiază în Centrele de Excelență, pentru o pregătire de performanță. Conținutul teoretic este susținut prin exemple aplicative și prin numeroase rezolvări de probleme, iar fiecare temă este însoțită de un set consistent de probleme reprezentative, propuse spre rezolvare. Limbajul de programare C a devenit un standard: noile limbaje (de programare sau de scripting) care se impun pe piața dezvoltatorilor de software au ca punct de plecare sintaxa C/C++ (Java, Javascript, ActionScript, PHP etc.).',
    count: 3
  }
];

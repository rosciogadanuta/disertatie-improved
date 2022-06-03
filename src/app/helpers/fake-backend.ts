import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';
import {users} from './mock-data';
import {Book} from "../models/book";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url, method, headers, body} = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/borrowBook') && method === 'POST':
          return borrowBook();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.endsWith('/books') && method === 'GET':
          return getBooks();
        case url.match(/\/book\/\d+$/) && method === 'GET':
          return getBooksById();

        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions
    function authenticate() {
      const {username, password} = body;
      const user = users.find(x => x.username === username && x.password === password);

      if (!user) return error('Username-ul sau parola sunt incorecte. Daca problema persista, contacteaza administratia Universitatii!');

      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        year: user.year,
        group: user.group,
        token: 'fake-jwt-token'
      })
    }

    function borrowBook() {const {borrowBook} = body;
     const newBooks: Book[] = [];

     let foundedBook: Book = new Book();

     books.forEach(book =>{
       if(book.id === borrowBook.bookId) {
         book.count = book.count - 1;
         foundedBook = book;
       }
       newBooks.push(book);
     })

    books = newBooks;

      return ok({
        id: foundedBook?.id,
        name: foundedBook?.name,
        authors: foundedBook?.authors,
        description: foundedBook?.description,
        count: foundedBook?.count as number - 1
      })
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function getBooks() {
      if (!isLoggedIn()) return unauthorized();
      return ok(books);
    }

    function getBooksById() {
      if (!isLoggedIn()) return unauthorized();
      const book =books.find(x => x.id === idFromUrl());
      return ok(book);
    }

    // helper functions
    function ok(body?) {
      return of(new HttpResponse({status: 200, body}))
    }

    function error(message) {
      return throwError({error: {message}});
    }

    function unauthorized() {
      return throwError({status: 401, error: {message: 'Unauthorised'}});
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1];
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};


let books: Book[] = [
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

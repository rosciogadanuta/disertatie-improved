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
import * as uuid from 'uuid';

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
      .pipe(dematerialize()) as Observable<HttpEvent<any>>;

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/borrowBook') && method === 'PUT':
          return borrowBook();
        case url.endsWith('/add-book') && method === 'POST':
          return addBook();
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
        role:user.role,
        token: 'fake-jwt-token'
      })
    }

    function addBook() {
      if (!isLoggedIn()) return unauthorized();

      let book = body;

      console.log(body)

      let books = JSON.parse(localStorage.getItem('books') as string);

      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));

      return ok(JSON.parse(localStorage.getItem('books') as string));
    }

    function borrowBook() {
      if (!isLoggedIn()) return unauthorized();

      let borrowBook = body;
      let books = JSON.parse(localStorage.getItem('books') as string);

      borrowBook.count = borrowBook.count - 1;
      borrowBook.generatedCode = uuid.v4();

      Object.assign(books.find(x => x.id === borrowBook.bookId), borrowBook);
      localStorage.setItem('books', JSON.stringify(books));

      return ok(borrowBook);
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function getBooks() {
      if (!isLoggedIn()) return unauthorized();
      return ok(JSON.parse(localStorage.getItem('books') as string));
    }

    function getBooksById() {
      let books = JSON.parse(localStorage.getItem('books') as string);
      if (!isLoggedIn()) return unauthorized();
      const book = books.find(x => x.id === idFromUrl());
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

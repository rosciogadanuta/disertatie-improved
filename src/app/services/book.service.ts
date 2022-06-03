import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Book} from "../models/book";
import {BorrowBook} from "../models/borrowBook";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class BookService {
  private currentBooksSubject: BehaviorSubject<Book[]>;
  public currentBooks: Observable<Book[]>;
  constructor(private http: HttpClient) {
    this.currentBooksSubject = new BehaviorSubject<Book[]>(JSON.parse(<string>localStorage.getItem('books')));
    this.currentBooks = this.currentBooksSubject.asObservable();
  }
  getAll() {
    return this.http.get<Book[]>(`${environment.apiUrl}/books`).pipe(map(books=>{
      const allBooks = this.currentBooksSubject.value;
      this.currentBooksSubject.next(allBooks);
      return allBooks;
    }))
  }

  getBookById(id: string) {
    return this.http.get<Book>(`${environment.apiUrl}/book/${id}`);
  }

  borrowBook(borrowBook:BorrowBook){
    return this.http.post<BorrowBook>(`${environment.apiUrl}/borrowBook`, {borrowBook}).pipe(map(books=> {
      let oldBooks = this.currentBooksSubject.value;
      oldBooks.forEach((book, index) => {
        console.log(book)
        if(book.id === borrowBook.bookId){
          book.count -= 1;
        }
      });
      localStorage.setItem('books', JSON.stringify(oldBooks));
      this.currentBooksSubject.next(oldBooks);
      return oldBooks;
    }));
  }
}

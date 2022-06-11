import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Book} from "../models/book";
import {BorrowBook} from "../models/borrowBook";

@Injectable({providedIn: 'root'})
export class BookService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Book[]>(`${environment.apiUrl}/books`);
  }

  getBookById(id: string) {
    return this.http.get<Book>(`${environment.apiUrl}/book/${id}`);
  }

  addBook(book: Book) {
    return this.http.post<any>(`${environment.apiUrl}/add-book`, book);
  }

  borrowBook(borrowBook: BorrowBook) {
    return this.http.put<any>(`${environment.apiUrl}/borrowBook`, borrowBook);
  }

  deleteBook(id: string) {
    return this.http.delete<any>(`${environment.apiUrl}/delete-book/${id}`);
  }
}

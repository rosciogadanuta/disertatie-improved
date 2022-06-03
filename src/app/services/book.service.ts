import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Book} from "../models/book";

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
}

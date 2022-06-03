import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {BorrowBook} from "../models/borrowBook";

@Injectable({providedIn: 'root'})
export class BorrowBookService {
  constructor(private http: HttpClient) {
  }

  borrowBook(borrowBook:BorrowBook){
    return this.http.post<BorrowBook>(`${environment.apiUrl}/borrowBook`, {borrowBook});
  }
}

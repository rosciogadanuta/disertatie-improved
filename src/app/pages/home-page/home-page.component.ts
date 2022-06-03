import { Component, } from '@angular/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/autentication.service";
import {Book} from "../../models/book";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  currentUser: User;
  books: Book[];
  searchText;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private readonly  bookService: BookService
  ) {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
    this.loadBooks();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  loadBooks() {
    this.bookService.getAll()
    .subscribe(data=>{
      console.log(data)
      this.books = data;
    })
  }

  getBookDetails(id){
    this.router.navigate(['book', id]);
  }

}

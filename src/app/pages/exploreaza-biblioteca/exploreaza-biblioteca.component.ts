import { Component, OnInit } from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../models/book";
import {finalize} from "rxjs";

@Component({
  selector: 'app-exploreaza-biblioteca',
  templateUrl: './exploreaza-biblioteca.component.html',
  styleUrls: ['./exploreaza-biblioteca.component.css']
})
export class ExploreazaBibliotecaComponent implements OnInit {

  books: Book[] = [];
  isLoading = false;

  constructor(
    private readonly  bookService: BookService
  ){}

  ngOnInit(): void {
    this.loadBook();
  }

  loadBook() {
    this.isLoading = true;
    this.bookService.getAll().pipe(
      finalize(()=> this.isLoading = false)
    ).subscribe(data=>{
      this.books = data;
    })
  }
}

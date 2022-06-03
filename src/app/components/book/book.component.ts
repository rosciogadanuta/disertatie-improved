import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../models/book";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: Book;

  constructor(
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
  }

  seeBookDetails(id: string) {
    this.router.navigate(['book',id]);
  }
}

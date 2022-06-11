import { Component, OnInit } from '@angular/core';
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {

  bookCode: string;
  isDeleted = false;
  error:string

  constructor(
    private readonly bookService: BookService
  ) { }

  ngOnInit(): void {
  }

  onDeleteBook() {
    this.error ="";
    this.bookService.deleteBook(this.bookCode).subscribe(()=>{
      this.isDeleting();
    },
      error => {this.error = error});
  }

  isDeleting() {
    this.isDeleted = true;
    this.bookCode = "";
    setTimeout(()=>{this.isDeleted = false}, 1000);
  }
}

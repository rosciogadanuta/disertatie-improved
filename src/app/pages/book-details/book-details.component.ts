import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Book} from "../../models/book";
import {BookService} from "../../services/book.service";
import {finalize} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ReserveBookDialogComponent} from "../../components/reserve-book-dialog/reserve-book-dialog.component";
import {Location} from '@angular/common';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book;
  isLoading = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly bookService: BookService,
    private readonly dialog: MatDialog,
    private readonly location: Location
  ) {
  }

  private get bookId(): string {
    return this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getBookById(this.bookId);
  }

  getBookById(id: string) {
    this.isLoading = true;
    this.bookService.getBookById(id).pipe(finalize(() =>
      this.isLoading = false
    )).subscribe(data => {
      this.book = data;
    })
  }

  reserveBook() {
    const dialogRef = this.dialog.open(ReserveBookDialogComponent, {
      width: '500px',
      data: {book: this.book},
    });
  }

  onBack() {
    this.location.back();
  }
}

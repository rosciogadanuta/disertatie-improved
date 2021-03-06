import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/autentication.service";
import {User} from "../../models/user";
import * as uuid from 'uuid';
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-reserve-book-dialog',
  templateUrl: './reserve-book-dialog.component.html',
  styleUrls: ['./reserve-book-dialog.component.css']
})
export class ReserveBookDialogComponent implements OnInit {

  formGroup: FormGroup;
  currentUser: User;
  isSubmitted = false;
  generatedCode: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly dialogData: any,
    private readonly dialogRef: MatDialogRef<ReserveBookDialogComponent>,
    private readonly authenticationService: AuthenticationService,
    private readonly bookService: BookService
  ) {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.formGroup = this.initForm();
    });
  }

  ngOnInit(): void {
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.bookService.borrowBook(this.composeBorrow()).subscribe((data) => {
      this.generatedCode = data.generatedCode;
      this.isSubmitted = true;
    });
  }

  private initForm() {
    return new FormGroup({
      firstName: new FormControl({value: this.currentUser.firstName, disabled: true}, [Validators.required]),
      lastName: new FormControl({value: this.currentUser.lastName, disabled: true}, [Validators.required]),
      year: new FormControl({value: this.currentUser.year, disabled: true}, [Validators.required]),
      group: new FormControl({value: this.currentUser.group, disabled: true}, [Validators.required]),
      numberOfDays: new FormControl({value: this.dialogData.book.count, disabled: false}, [Validators.required, Validators.max(21),  Validators.min(1)])
    });
  }

  private composeBorrow() {
    return {
      userId: this.currentUser.id,
      bookId: this.dialogData.book.id as string,
      count: this.dialogData.book.count as string,
      numberOfDays: 12,
    }
  }
}

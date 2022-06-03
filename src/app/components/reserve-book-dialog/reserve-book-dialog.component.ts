import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/autentication.service";
import {User} from "../../models/user";
import * as uuid from 'uuid';
import {BorrowBookService} from "../../services/borrowBook.service";

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
    private readonly borrowBookService: BorrowBookService
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
    // if(this.formGroup.valid) {
      console.log("here")
      this.isSubmitted = true;
      this.generatedCode = this.generateCode();
      this.borrowBookService.borrowBook(this.composeBorrow()).subscribe((data)=>{
        console.log(data)
      })
    // }
  }

  private initForm() {
    return new FormGroup({
      firstName: new FormControl({value: this.currentUser.firstName, disabled:true},[Validators.required]),
      lastName: new FormControl({value: this.currentUser.lastName, disabled:true}, [Validators.required]),
      year: new FormControl({value: this.currentUser.year, disabled:true}, [Validators.required]),
      group: new FormControl({value: this.currentUser.group, disabled:true}, [Validators.required]),
    });
  }

  private composeBorrow(){
    return {
      userId: this.currentUser.id,
      bookId: this.dialogData.book.id as string,
      mentions: 'lalala',
      numberOfDays: 12,
    }
  }

  private generateCode() {
    return uuid.v4();
  }
}

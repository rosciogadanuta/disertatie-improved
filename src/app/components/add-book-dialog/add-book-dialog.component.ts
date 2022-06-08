import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.css']
})
export class AddBookDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly dialogData: any,
    private readonly dialogRef: MatDialogRef<AddBookDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  onCloseDialog() {
    this.dialogRef.close();
  }
}

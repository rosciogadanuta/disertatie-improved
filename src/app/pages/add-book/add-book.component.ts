import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Book} from "../../models/book";
import * as uuid from 'uuid';
import {BookService} from "../../services/book.service";
import {books} from "../../helpers/mock-data";
import {MatDialog} from "@angular/material/dialog";
import {AddBookDialogComponent} from "../../components/add-book-dialog/add-book-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  formGroup: FormGroup;
  isSubmitted = false;
  imageSrc: string;
  accept = 'image/png, image/jpeg';
  generatedCode: string;
  books:Book[];
  bookId;

  constructor(
    private readonly bookService: BookService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
  ) {
    this.formGroup = this.initForm();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.books = JSON.parse(localStorage.getItem('books') as string);
    this.generatedCode = uuid.v4();

    if (this.formGroup.valid) {
      this.generatedCode = uuid.v4();

      const book: Book = {
        id: (+this.books[this.books.length -1].id + 1).toString(),
        name: this.formGroup.controls.name.value,
        authors: this.parseAuthors(),
        image: "https://cdn.dc5.ro/img-prod/691149040-0.jpeg",
        description: this.formGroup.controls.description.value,
        count: this.formGroup.controls.count.value,
        type: this.formGroup.controls.type.value,
        edition: this.formGroup.controls.edition.value,
        code: this.generatedCode
      }

       this.bookService.addBook(book).subscribe(()=> {
         this.openAddBookDialog(this.generatedCode);
       });
    }
  }

  private initForm() {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(3)]),
      author: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(3)]),
      image: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]),
      count: new FormControl(undefined, [Validators.required, Validators.max(20), Validators.min(1)]),
      type: new FormControl('', [Validators.required]),
      edition: new FormControl(undefined, [Validators.required, Validators.max(2022), Validators.min(1990)])
    });
  }

  private parseAuthors(){
    return this.formGroup.controls.author.value.split(',');
  }

  private openAddBookDialog(generatedCode:string){
    const dialog = this.dialog.open(AddBookDialogComponent, {
      width: '500px',
      data: {generatedCode: generatedCode},
    });

    this.dialog.afterAllClosed.subscribe(()=>{
      this.router.navigate(['/explore-library']);
    })

  }
}

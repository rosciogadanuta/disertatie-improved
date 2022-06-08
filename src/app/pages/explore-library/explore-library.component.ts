import {Component, OnInit} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../models/book";
import {finalize} from "rxjs";
import {books} from "../../helpers/mock-data";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-explore-library',
  templateUrl: './explore-library.component.html',
  styleUrls: ['./explore-library.component.css']
})
export class ExploreLibraryComponent implements OnInit {

  books: Book[] = [];
  isLoading = false;
  searchText;

  constructor(
    private readonly bookService: BookService
  ) {
  }

  ngOnInit(): void {
    this.loadBook();
  }

  loadBook() {
    this.isLoading = true;
    this.bookService.getAll().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(data => {
      this.books = data;
      this.books.map(book=> ({ ...book, image : this.getImage(book.image)}))
    })
  }

  private getImage (imageBook: File | string): string | File {
    let newImage;
    if(typeof imageBook === 'string') {
      newImage = imageBook
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(imageBook);
      reader.onload = () => {
        newImage =  reader.result as string;
      };
    }
    return newImage;
  }
}

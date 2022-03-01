import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { CometIntegrationService } from '../../services/comet-integration.service';
import { CometStorageService } from '../../services/comet-storage.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  private _books: Book[] = [];

  public get books(): Book[] {
    return this._books;
  }

  public set books(value: Book[]) {
    this._books = value;

    this.addEmptyBook();
  }

  constructor(public comet: CometStorageService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  // Adds an empty book to edit if there are none
  public addEmptyBook() {
    var idx = this._books.findIndex(b => b.id == null);

    if (idx < 0)
      this._books.push(new Book());
  }

  // Adds or saves the book to the list... handling the service interface
  public addBook(book: Book) {
    book.authors = book.authors.filter(a => a != '' && a.length > 0);

    if (book.id != null) {
      this.comet.updateBook(book).subscribe({
        next: (value) => {
          this.loadBooks();
        },
        error: (error) => {

        }
      });
    }
    else {
      // Get the largest id and add one - used if the mockservice is in place.
      var mids = this.books.filter(b => b.id != null).map(b => b.id).sort();
      var mid = (mids[mids.length - 1] as number) + 1;

      book.id = (mid != null && !isNaN(mid)) ? mid : 1;

      this.comet.addBook(book).subscribe({
        next: (value) => {
          this.loadBooks();
        },
        error: (error) => {

        }
      });
    }
  }

  public deleteBook(book: Book) {
    if (book.id != null) {
      this.comet.deleteBook(book).subscribe({
        next: (string) => {
          this.loadBooks();
        },
        error: (error) => {

        }
      })
    }
  }

  public loadBooks() {
    // Update the list from the service interface
    this.comet.listBooks(null).subscribe({
      next: (books) => {
        this.books = books.map(b => new Book(b));
      },
      error: (error) => {
        this.books = [];
      }
    });
  }
}

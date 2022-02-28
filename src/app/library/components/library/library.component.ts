import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { CometIntegrationService } from '../../services/comet-integration.service';

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

  constructor(public comet: CometIntegrationService) { }

  ngOnInit(): void {
    // Update the list from the service interface
    this.comet.listBooks(null).subscribe({
      next: (books) => {
        this.books = books.map(b => new Book(b));
      },
      error: (error) => {
        this.books = [new Book({
          name: 'teste',
          authors: ['autor1', 'autor2', 'autor3'],
          year: 2011,
          summary: 'teste',
          id: 1
        })];
      }
    });
  }

  // Adds an empty book to edit if there are none
  public addEmptyBook() {
    var idx = this._books.findIndex(b => b.id == null);

    if (idx < 0)
      this._books.push(new Book());
  }

  // Adds the book to the list... handling the service interface
  public addBook(book: Book) {
    if (book.id != null) {
      this.comet.updateBook(book).subscribe({
        next: (value) => {

        },
        error: (error) => {

        }
      });
    }
    else {
      this.comet.addBook(book).subscribe({
        next: (value) => {

        },
        error: (error) => {

        }
      });
    }
  }
}

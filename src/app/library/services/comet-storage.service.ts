import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { ValidationError } from '../models/validation-error.model';
import { IComet } from './comet.interface';

@Injectable({
  providedIn: 'root'
})
export class CometStorageService implements IComet {

  public readonly storage_key: string = 'comet_library';

  constructor() { }

  // Interface for reading the book objects from the local storage
  // Mocks the service in a way.
  listBooks(queryname: string | null): Observable<Book[]> {
    let obs = new Observable<Book[]>((subs) => {
      let item = localStorage.getItem(this.storage_key);

      if (item != null) {
        var json = JSON.parse(item) as any[];
        var books = json.map((b: Book) => new Book(b));

        // Emulate search by name
        if (queryname != null && queryname.length > 0) {
          books = books.filter(b => b.name.toLowerCase().includes(queryname.toLowerCase()));
        }

        subs.next(books);
        subs.complete();
      }
      else subs.next([]);
      subs.complete();
    });

    return obs;
  }

  // Interface for adding a book into the book list - also updates the localstorage.
  addBook(book: Book): Observable<Book | ValidationError> {
    let obs = new Observable<Book>((subs) => {
      this.listBooks(null).subscribe({
        next: (books) => {
          books.push(book);
          localStorage.setItem(this.storage_key, JSON.stringify(books));
          subs.next(book);
          subs.complete();
        }
      });
    });

    return obs;
  }

  // Interface for updating a book into the book list - also updates the localstorage.
  updateBook(book: Book): Observable<Book | ValidationError> {
    let obs = new Observable<Book>((subs) => {
      this.listBooks(null).subscribe({
        next: (books) => {
          var pos = books.findIndex(b => b.id);
          if (pos >= 0) {
            books.splice(pos, 1, book);
            localStorage.setItem(this.storage_key, JSON.stringify(books));
            subs.next(book);
            subs.complete();
          }
          else {
            subs.error(pos);
            subs.complete();
          }
        }
      });
    });

    return obs;
  }

  // Interface for deleting a book in the booklist.
  deleteBook(book: Book): Observable<string | ValidationError> {
    let obs = new Observable<string>((subs) => {
      this.listBooks(null).subscribe({
        next: (books) => {
          var pos = books.findIndex(b => b.id);
          if (pos >= 0) {
            books.splice(pos, 1);
            localStorage.setItem(this.storage_key, JSON.stringify(books));
            subs.next('');
            subs.complete();
          }
          else {
            subs.error(pos);
            subs.complete();
          }
        }
      });
    });

    return obs;
  }
}

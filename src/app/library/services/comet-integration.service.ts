import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { IComet } from './comet.interface';
import { ValidationError } from '../models/validation-error.model';

@Injectable({
  providedIn: 'root'
})
export class CometIntegrationService implements IComet {

  private _baseurl = 'https://publishing-house-service.herokuapp.com';

  constructor(public http: HttpClient) { }

  // Adds a book to the back-end.
  addBook(book: Book): Observable<Book | ValidationError> {
    let url = `${this._baseurl}/api/v1/books`;
    return this.http.post<Book | ValidationError>(url, book);
  }

  // Update a given book in the back-end.
  updateBook(book: Book): Observable<Book | ValidationError> {
    let url = `${this._baseurl}/api/v1/books/${book.id}`;
    return this.http.put<Book | ValidationError>(url, book);
  }

  // Delete specific book in the back-end.
  deleteBook(book: Book): Observable<string | ValidationError> {
    let url = `${this._baseurl}/api/v1/books/${book.id}`;
    return this.http.delete<string | ValidationError>(url);
  }

  // Lists all the users from the back-end.
  public listBooks(queryname: string | null): Observable<Book[]> {
    let url = `${this._baseurl}/api/v1/books`;

    if (queryname != null && queryname.length > 0)
      url = `${url}&name=${queryname}`;

    return this.http.get<Book[]>(url);
  }
}

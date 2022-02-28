import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class CometIntegrationService {

  private _baseurl = 'https://publishing-house-service.herokuapp.com';

  constructor(public http: HttpClient) { }

  // Lists all the users from the back-end.
  public listBooks(queryname: string | null): Observable<Book[]> {
    let url = `${this._baseurl}/api/v1/books`;

    if (queryname != null && queryname.length > 0)
      url = `${url}&name=${queryname}`;

    return this.http.get<Book[]>(url);
  }
}

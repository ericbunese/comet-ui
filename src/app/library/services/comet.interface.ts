import { Observable } from "rxjs";
import { Book } from "../models/book.model";
import { ValidationError } from "../models/validation-error.model";

export interface IComet {
    listBooks(queryname: string | null): Observable<Book[]>;
    addBook(book: Book): Observable<Book | ValidationError>;
    updateBook(book: Book): Observable<Book | ValidationError>;
    deleteBook(book: Book): Observable<string | ValidationError>;
}
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/library/models/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() book: Book | null = null;
  @Output() bookChange: EventEmitter<Book> = new EventEmitter<Book>();
  @Output() bookDelete: EventEmitter<boolean> = new EventEmitter<boolean>();

  public authorvalue: string = '';
  public editMode: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  // Replaces an author at the given list position.
  public setAuthor(position: number) {
    if (this.book != null)
      this.book.authors[position] = this.authorvalue;
  }

  // Adds an empty author if possible
  public addAuthor(last: boolean) {
    if (last &&
      this.book != null &&
      this.book?.authors.findIndex(a => a == '' || a.length <= 0) < 0) {
      this.book?.authors.push('');
      this.authorvalue = '';
    }
  }

  public saveBook() {
    if (this.book)
      this.bookChange.next(this.book);

    this.editMode = false;
  }

  public edit() {
    this.editMode = true;
  }

  public deleteBook() {
    this.bookDelete.next(true);
  }
}

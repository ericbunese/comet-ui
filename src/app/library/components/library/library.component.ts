import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { CometIntegrationService } from '../../services/comet-integration.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  public books: Book[] = [];

  constructor(public comet: CometIntegrationService) { }

  ngOnInit(): void {
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

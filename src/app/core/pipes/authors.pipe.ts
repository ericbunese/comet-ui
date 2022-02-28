import { Pipe, PipeTransform } from '@angular/core';
import { Book } from 'src/app/library/models/book.model';

@Pipe({
  name: 'authors'
})
export class AuthorsPipe implements PipeTransform {

  transform(book: Book | null): unknown {
    return book?.authors.join(', ')
  }

}

import { Book } from 'src/app/library/models/book.model';
import { AuthorsPipe } from './authors.pipe';

describe('AuthorsPipe', () => {
  it('create an instance', () => {
    const pipe = new AuthorsPipe();
    expect(pipe).toBeTruthy();
  });

  it('Pipe book authors', () => {
    const pipe = new AuthorsPipe();
    const book = new Book({
      name: 'Book',
      authors: ['Author 1', 'Author 2', 'Author 3']
    });

    expect(pipe.transform(book)).toBe(book.authors.join(', '));
  });
});

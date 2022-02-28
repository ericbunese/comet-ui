export class Book {
    public name: string = '';
    public year: number | null = null;
    public authors: string[] = [];
    public summary: string = '';

    // This is used only for persisted entities in the back-end.
    public id: number | null = null;

    constructor(init?: Partial<Book>) {
        Object.assign(this, init);
    }
}
export class User {
    public username: string = '';

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
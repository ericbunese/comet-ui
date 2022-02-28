import { User } from "./user.model";

export class Token {
    public invalid: boolean = false;
    public user: User = new User();

    constructor(init?: Partial<Token>) {
        Object.assign(this, init);
    }
}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements CanActivate {

  // List of accepted usernames
  private _acceptedUsers: User[] = [
    new User({
      username: 'admin'
    })
  ];

  // Token interface for identifying authenticated users.
  private token: Token = new Token({ invalid: true });

  constructor() { }

  // Login method, checks if the username is present in the accepted usernames array.
  // If it is, returns an Observable of the new Token.
  // Otherwise, pushes an error in the stream with an invalid token and presents an error message onscreen.
  public logIn(username: string, password: string): Observable<Token> {

    let obs = new Observable<Token>((subs) => {
      if (this.token == null || this.token.invalid) {
        var user = this._acceptedUsers.find(u => u.username == username);
        if (user != null) {
          this.token = new Token({ invalid: false, user: user })
          subs.next(this.token);
        }
        else {
          this.token = new Token({ invalid: true })
          subs.error(this.token);
        }
        subs.complete();
      }
    });

    return obs;
  }

  // Guard used for activating routes, otherwise will fallback to login screen.
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let obs = new Observable<boolean | UrlTree>((subs) => {
      subs.next(!this.token.invalid);
      subs.complete();
    });

    return obs;
  }

  // Returns a stringified token from the authenticated object.
  public getToken(): string {
    return JSON.stringify(this.token);
  }
}

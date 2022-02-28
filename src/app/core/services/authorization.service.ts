import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements CanActivate {

  private _acceptedUsers: User[] = [
    new User({
      username: 'admin'
    })
  ];

  private token: Token = new Token({ invalid: true });

  constructor() { }

  public logIn(username: string, password: string): Observable<Token> {

    let obs = new Observable<Token>((subs) => {
      if (this.token == null || this.token.invalid) {
        var user = this._acceptedUsers.find(u => u.username == username);
        if (user != null)
          subs.next(new Token({ invalid: false, user: user }));
        else subs.error(new Token({ invalid: true }));
        subs.complete();
      }
    });

    return obs;
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let obs = new Observable<boolean | UrlTree>((subs) => {
      subs.next(!this.token.invalid);
      subs.complete();
    });

    return obs;
  }
}

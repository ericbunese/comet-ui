import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(public auth: AuthorizationService) { }

  // Intercept any outgoing requests to add specific headers.
  // The token comes from the authorization service that provides a login interface.
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers = new HttpHeaders({
      'Authorization': this.auth.getToken(),
      'Content-Type': 'application/json'
    });

    let req = request.clone({ headers });

    return next.handle(request);
  }
}

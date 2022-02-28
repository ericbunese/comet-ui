import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../../models/token.model';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string = '';
  public password: string = '';
  public error: string = '';

  constructor(public auth: AuthorizationService,
    public router: Router) { }

  ngOnInit(): void {
  }

  public submit() {
    this.auth.logIn(this.username, this.password).subscribe({
      next: (value: Token) => {
        this.error = '';
        this.router.navigateByUrl('library');
      },
      error: (error: Token) => {
        if (error != null && error.invalid)
          this.error = 'Invalid Credentials';
      }
    });
  }
}

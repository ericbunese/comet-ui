import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AuthorizationService } from './core/services/authorization.service';
import { LibraryComponent } from './library/components/library/library.component';

const routes: Routes = [
  {
    // Basic login screen route
    path: '',
    component: LoginComponent
  },
  {
    // Guarded library screen route
    path: 'library',
    component: LibraryComponent,
    canActivate: [AuthorizationService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

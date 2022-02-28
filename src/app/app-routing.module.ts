import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AuthorizationService } from './core/services/authorization.service';
import { LibraryComponent } from './library/components/library/library.component';

const routes: Routes = [
  {
    // Guarded library screen route
    path: 'library',
    component: LibraryComponent,
    canActivate: [AuthorizationService]
  },
  {
    // Basic login screen route
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

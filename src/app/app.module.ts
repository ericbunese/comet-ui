import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationService } from './core/services/authorization.service';
import { LoginComponent } from './core/components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LibraryComponent } from './library/components/library/library.component';
import { CometIntegrationService } from './library/services/comet-integration.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from './core/services/network.interceptor';
import { BookComponent } from './library/components/book/book/book.component';
import { AuthorsPipe } from './core/pipes/authors.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LibraryComponent,
    BookComponent,
    AuthorsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthorizationService,
    CometIntegrationService,
    { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

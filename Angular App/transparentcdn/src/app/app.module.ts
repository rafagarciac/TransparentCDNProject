import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { BooksListComponent } from './books-list/books-list.component';
import { DialogAddNewBook, DialogRemoveBook, DialogBorrowBook } from './books-list/books-list.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ApiService } from './api.service';
import { ApiGuard } from './api.guard';


@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    DialogAddNewBook,
    DialogRemoveBook,
    DialogBorrowBook,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomMaterialModule,
    HttpClientModule,
    HttpModule,
    FormsModule
  ],
  entryComponents: [
    DialogAddNewBook,
    DialogRemoveBook,
    DialogBorrowBook
  ],
  providers: [ApiService, ApiGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

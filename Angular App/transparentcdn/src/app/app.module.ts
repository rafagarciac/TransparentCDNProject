import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { BooksListComponent } from './books-list/books-list.component';
import { DialogAddNewBook, DialogRemoveBook } from './books-list/books-list.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    DialogAddNewBook,
    DialogRemoveBook,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomMaterialModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents: [
    DialogAddNewBook,
    DialogRemoveBook
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

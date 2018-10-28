import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BooksListComponent } from './books-list/books-list.component';
import { ApiGuard } from './api.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'books', component: BooksListComponent, canActivate: [ApiGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    // { enableTracing: true } // <-- debugging purposes only
    // )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

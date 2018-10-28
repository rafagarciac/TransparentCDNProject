import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

export interface DialogData {
  id: number;
  ISBNCode: string;
  title: string;
  author: string;
}

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  private books: Array<object> = [];
  private borrowedBooks: Array<object> = [];
  private notBorrowedBooks: Array<object> = [];
  private morososBooks: Array<object> = [];
  private users: Array<object> = [];

  // Books
  id: number;
  ISBNCode: string;
  title: string;
  author: string;

  // User
  permision: string;
  isAdmin: boolean;

  constructor(private apiService: ApiService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.getBooksList();
    this.getBorrowedBooksList();
    this.getNotBorrowedBooksList();
    this.getMorososBooksList();
    this.getUsersList();
    this.permision = localStorage.getItem('permision');
    this.isAdmin = this.isUserorAdmin();
  }

  logout(): void {
    localStorage.removeItem('permision');
    localStorage.removeItem('loggedIn');
    // localStorage.clear();
    this.router.navigateByUrl('login');
  }

  isUserorAdmin(): boolean {
    return this.permision.toUpperCase() === 'ADMIN' ? true : false;
  }

  public getBooksList () {
    this.apiService.getBooksList().subscribe((data: Array<object>) => {
      this.books = data;
    });
  }

  public getBorrowedBooksList () {
    this.apiService.getBorrowedBooksList().subscribe((data: Array<object>) => {
      this.borrowedBooks = data;
    });
  }

  public getNotBorrowedBooksList () {
    this.apiService.getNotBorrowedBooksList().subscribe((data: Array<object>) => {
      this.notBorrowedBooks = data;
    });
  }

  public getMorososBooksList () {
    this.apiService.getMorososBooksList().subscribe((data: Array<object>) => {
      this.morososBooks = data;
    });
  }

  public getUsersList () {
    this.apiService.getUsers().subscribe((data: Array<object>) => {
      this.users = data;
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DialogAddNewBook, {
      width: '250px',
      data: {ISBNCode: this.ISBNCode, title: this.title, author: this.author}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.apiService.addNewBook(result);
        location.reload();
      }
    });
  }

  openDeleteDialog(_id, _title): void {
    const dialogRef = this.dialog.open(DialogRemoveBook, {
      width: '500px',
      data: {bookid: _id, title: _title}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        delete result.title;
        this.apiService.deleteBook(result);
        location.reload();
      }
    });
  }

  openBorrowDialog(_id): void {
    const dialogRef = this.dialog.open(DialogBorrowBook, {
      width: '500px',
      data: {bookid: _id, users: this.users}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        delete result.users;  // Remove the users from the json to POST
        this.apiService.borrowBookToUser(result);
        location.reload();
      }
    });
  }

  openUnBorrowDialog(_id): void {
    const dialogRef = this.dialog.open(DialogRemoveBook, {
      width: '500px',
      data: {bookid: _id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        result = {'bookid': result.toString()};
        this.apiService.unborrowBookToUser(result);
        location.reload();
      }
    });
  }

  openDetailDialog(_id, _ISBNCode, _title, _author): void {
    const dialogRef = this.dialog.open(DialogAddNewBook, {
      width: '250px',
      data: {id: _id, ISBNCode: _ISBNCode, title: _title, author: _author}
    });

    dialogRef.afterClosed().subscribe(result => {
      // Nothing to do...
    });
  }

}

@Component({
  selector: 'dialog-add-new-book-modal',
  templateUrl: './dialogs/dialog-add-new-book-modal.html',
})
export class DialogAddNewBook {

  constructor(
    public dialogRef: MatDialogRef<DialogAddNewBook>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-remove-book-modal',
  templateUrl: './dialogs/dialog-remove-book-modal.html',
})
export class DialogRemoveBook {

  constructor(
    public dialogRef: MatDialogRef<DialogRemoveBook>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-borrow-book-modal',
  templateUrl: './dialogs/dialog-borrow-book-modal.html',
})
export class DialogBorrowBook {

  constructor(
    public dialogRef: MatDialogRef<DialogBorrowBook>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

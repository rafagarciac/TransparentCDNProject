import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Identifiers } from '@angular/compiler';


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
  private books:  Array<object> = [];

  id: number;
  ISBNCode: string;
  title: string;
  author: string;

  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getBooksList();
  }

  public getBooksList () {
    this.apiService.getBooksList().subscribe((data: Array<object>) => {
      this.books = data;
    });
  }

  openDialog(): void {
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

  openDeleteDialog(_id): void {
    const dialogRef = this.dialog.open(DialogRemoveBook, {
      width: '500px',
      data: {id: _id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.apiService.deleteBook(result);
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

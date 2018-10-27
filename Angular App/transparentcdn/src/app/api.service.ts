import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  API_URL = 'http://127.0.0.1:8000/';
  constructor(private httpClient: HttpClient) { }

  // Return a Books List
  getBooksList() {
    return this.httpClient.get(`${this.API_URL}books/`);
  }

  // Add new Book
  addNewBook(data) {
    return this.httpClient.post(`${this.API_URL}books/`, data, httpOptions)
      .subscribe(
          _data => {
              console.log('POST Request is successful ', _data);
          },
          error => {
              console.log('Error', error);
          }
      );
  }

  // Delete Book
  deleteBook(id) {
    return this.httpClient.delete(`${this.API_URL}books/${id}/`)
        .subscribe(
            data => {
                console.log('DELETE Request is successful ', data);
            },
            error => {
                console.log('Error', error);
            }
        );
  }

}

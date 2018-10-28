import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

export interface IUser {
  n_socio: string;
  email: string;
  password: string;
  user_permision: {
    id: string;
    permision: string;
  };
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  // Declarations
  API_URL = 'http://127.0.0.1:8000/';
  loggedInStatus = false;

  constructor(private httpClient: HttpClient) { }

  // Provide Routing Protection
  get isLoggedIn() {
    return this.loggedInStatus;
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

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

    // Delete Book
    login(data): Observable<HttpResponse<IUser>> {
      const httpHeaders = new HttpHeaders({
        'Content-Type' : 'application/json'
      });

      return this.httpClient.post<IUser>(`${this.API_URL}login/`, data,
            {
              headers: httpHeaders,
              observe: 'response'
            });
    }

}

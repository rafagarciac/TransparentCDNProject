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
  loggedInStatus = JSON.parse(localStorage.getItem('loggedIn')) || false;

  constructor(private httpClient: HttpClient) { }

  // Provide Routing Protection
  get isLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn')) || this.loggedInStatus.toString();
  }

  setLoggedIn(value: boolean) {
    localStorage.setItem('loggedIn', 'true');
  }

  // Return All Books List
  getBooksList() {
    return this.httpClient.get(`${this.API_URL}books/`);
  }

  // Return a Books List
  getBorrowedBooksList() {
    return this.httpClient.get(`${this.API_URL}books/borrowed`);
  }

  // Return a Books List
  getNotBorrowedBooksList() {
    return this.httpClient.get(`${this.API_URL}books/notborrowed`);
  }

  // Return a Morosos Books List
  getMorososBooksList() {
    return this.httpClient.get(`${this.API_URL}books/morosos`);
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
    return this.httpClient.delete(`${this.API_URL}books/${id}`)
        .subscribe(
            data => {
                console.log('DELETE Request is successful ', data);
            },
            error => {
                console.log('Error', error);
            }
        );
  }

  // Get All Users
  getUsers() {
    return this.httpClient.get(`${this.API_URL}users/`);
  }

  // Get User by n_socio
  getUser(n_socio: string) {
    return this.httpClient.get(`${this.API_URL}users/${n_socio}`);
  }

  // Borrow Book to User (Only Admin Users)
  borrowBookToUser(data) {
    return this.httpClient.post(`${this.API_URL}books/borrowed`, data, httpOptions)
      .subscribe(
          _data => {
              console.log('POST Request is successful ', _data);
          },
          error => {
              console.log('Error', error);
          }
      );
  }

    // Unborrowed Book from User (Only Admin Users)
    unborrowBookToUser(data) {
      return this.httpClient.post(`${this.API_URL}books/notborrowed`, data, httpOptions)
        .subscribe(
            _data => {
                console.log('POST Request is successful ', _data);
            },
            error => {
                console.log('Error', error);
            }
        );
    }


  // Login!
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

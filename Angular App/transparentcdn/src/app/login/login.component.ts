import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApiService } from '../api.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private apiService: ApiService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.matcher = new MyErrorStateMatcher();
  }

  openSnackBar(message: string, status: string) {
    this.snackBar.open(message, 'OK', {
      duration: 1500,
      panelClass: [`${status}-snackbar`]
    });
  }

  goToPage(link) {
    this.router.navigateByUrl(link);
    this.apiService.setLoggedIn(true);
    // this.router.navigate([link]);
  }

  login(_email, _password): void {
    const data = { email: _email, password: _password };
    this.apiService.login(data);

    this.apiService.login(data).subscribe(res => {
      localStorage.setItem('permision', res.body.user_permision.permision);
      this.openSnackBar('Login Successfully!', 'success');
      this.goToPage('books');
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred.
          console.log('An error occurred:', err.error.message);
        } else {
          // Backend returns unsuccessful response code s such as 404, 500 etc.
          console.log('Backend returned status code: ', err.status);
          this.openSnackBar(err.error.message, 'error');
        }
      }
    );
  }
}

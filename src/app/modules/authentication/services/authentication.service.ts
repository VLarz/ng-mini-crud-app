import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { ErrorResponse } from '../../../enum/error-response.enum';
import { ERROR_MESSAGE } from '../../../const/error-message.const';
import { AuthenticationResponse } from '../models/authentication-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
               ) { }

  signUp(email: string, password: string): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      `${environment.auth.url}${environment.auth.signUp}${environment.auth.key}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    )
    .pipe(
       catchError(this.handleError)
    );
  }

  login(email: string, password: string): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      `${environment.auth.url}${environment.auth.signIn}${environment.auth.key}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(errorResponse: HttpErrorResponse): Observable<AuthenticationResponse> {
    let errorMessage = 'An unknown error occured';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      /**
       * SIGNUP
       */
      case `${ErrorResponse.EMAIL_EXISTS}`:
        errorMessage = `${ERROR_MESSAGE.EMAIL_EXISTS}`;
        break;
      case `${ErrorResponse.OPERATION_NOT_ALLOWED}`:
        errorMessage = `${ERROR_MESSAGE.OPERATION_NOT_ALLOWED}`;
        break;
      case `${ErrorResponse.TOO_MANY_ATTEMPTS_TRY_LATER}`:
        errorMessage = `${ERROR_MESSAGE.TOO_MANY_ATTEMPTS_TRY_LATER}`;
        break;
      /**
       * LOGIN
       */
      case `${ErrorResponse.EMAIL_NOT_FOUND}`:
      case `${ErrorResponse.INVALID_PASSWORD}`:
        errorMessage = `${ERROR_MESSAGE.EMAIL_OR_PASSWORD_NOT_FOUND}`;
        break;
      case `${ErrorResponse.USER_DISABLED}`:
        errorMessage = `${ERROR_MESSAGE.USER_DISABLED}`;
        break;
    }

    return throwError(errorMessage);
  }
}

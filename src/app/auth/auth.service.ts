import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {User} from "./user.model";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  signUp(userEmail: string, userPassword: string) {
      return this.http.post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvHlEALzVDt035oMbr76AAGmW55U2VBBM',
          {
              email: userEmail,
              password: userPassword,
              returnSecureToken: true
          }
      ).pipe(catchError(this.handleError),
          tap(resData => {
              this.handleAuthentication(
                  resData.email,
                  resData.localId,
                  resData.idToken,
                  +resData.expiresIn)
      }));
  }

    login(userEmail: string, userPassword: string) {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvHlEALzVDt035oMbr76AAGmW55U2VBBM',
          {
              email: userEmail,
              password: userPassword,
              returnSecureToken: true
          }).pipe(catchError(this.handleError),
          tap(resData => {
              this.handleAuthentication(
                  resData.email,
                  resData.localId,
                  resData.idToken,
                  +resData.expiresIn)
          })
      );
    }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number) {
      const expirationDate = new Date(
          new Date().getTime() + expiresIn * 1000
      );
      const user = new User(
          email,
          userId,
          token,
          expirationDate
      );
      this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error has occurred';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email is already associated with an account';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Username or password not found';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Username or password not found';
                break;
        }
        return throwError(errorMessage);
    }
}

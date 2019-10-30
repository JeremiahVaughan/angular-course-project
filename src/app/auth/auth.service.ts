import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(userEmail: string, userPassword: string) {
      return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvHlEALzVDt035oMbr76AAGmW55U2VBBM',
        {
            email: userEmail,
            password: userPassword,
            returnSecureToken: true
        }
      );
  }
}

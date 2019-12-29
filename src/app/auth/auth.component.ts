import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit{
  loginForm: FormGroup;
  isLoginMode = true;
  isLoading = false;
  error: string = null;


    constructor(private authService: AuthService, private router: Router) {

    }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
      if (!this.loginForm.valid) {
          return;
      }
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      let authObs: Observable<AuthResponseData>;

      this.isLoading = true;
      if (this.isLoginMode) {
          authObs = this.authService.login(email, password);
      } else {
          authObs = this.authService.signUp(email, password);
      }

      authObs.subscribe(
          resData => {
              console.log(resData);
              this.isLoading = false;
              this.router.navigate(['/recipes']);
          },
          errorMessage => {
              this.error = errorMessage;
              console.log(errorMessage);
              this.isLoading = false;
          }
      );
      this.loginForm.reset();


  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    let email = '';
    let password = '';

    this.loginForm = new FormGroup( {
            email: new FormControl(email, [Validators.required, Validators.email]),
            password: new FormControl(password,
                [Validators.required, Validators.minLength(6)])
        }
    );
  }
}

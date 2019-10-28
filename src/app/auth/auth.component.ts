import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit{
  loginForm: FormGroup;
  isLoginMode = true;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {

  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    let email = '';
    let password = '';

    this.loginForm = new FormGroup( {
            email: new FormControl(email, Validators.required),
            password: new FormControl(password, Validators.required)
        }
    );
  }
}

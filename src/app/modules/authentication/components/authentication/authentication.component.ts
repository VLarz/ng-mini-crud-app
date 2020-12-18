import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../../models/authentication-response.model';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  isLoginMode = true;
  error: string = null;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {

  }


  onCreate(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm): void {
    if (!authForm.valid){
      return;
    }

    const EMAIL = authForm.value.email;
    const PASSWORD = authForm.value.password;

    let authObservable: Observable<AuthenticationResponse>;

    if (this.isLoginMode) {
      authObservable = this.authService.login(EMAIL, PASSWORD);
    } else {
      authObservable = this.authService.signUp(EMAIL, PASSWORD);
    }

    authObservable.subscribe(
      responseData => {
        console.log(responseData);
      },
      errorMessage => {
        this.error = errorMessage;
        console.log(this.error);
      }
    );

    authForm.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

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
      authObservable = this.authenticationService.login(EMAIL, PASSWORD);
    } else {
      authObservable = this.authenticationService.signUp(EMAIL, PASSWORD);
    }

    authObservable.subscribe(() => {
      this.router.navigate(['/artist']);
    },
      errorMessage => {
        this.error = errorMessage;
        console.log(this.error);
      }
    );

    authForm.reset();
  }
}

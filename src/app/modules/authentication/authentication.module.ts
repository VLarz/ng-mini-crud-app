import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthenticationComponent } from './components/authentication/authentication.component';



@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AuthenticationComponent
  ]
})
export class AuthenticationModule { }

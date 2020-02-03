import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { CreateUser } from '../shared/createUser.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private authService: AuthService) {}

  isLoading = false;

  user = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  };

  errMessage = null;
  succMessage = null;

  onSubmit(form: NgForm) {
    this.errMessage = null;
    this.succMessage = null;
    if (form.invalid) {
      return;
    }
    this.user.firstName = form.value.firstName;
    this.user.lastName = form.value.lastName;
    this.user.username = form.value.username;
    this.user.email = form.value.email;
    this.user.password = form.value.password;
    this.isLoading = true;
    this.authService.createUser(this.user).subscribe(res => {
      console.log(res);
      this.succMessage = 'Registered Succesfully';
      this.isLoading = false;
    }, errorMessage => {
      console.log(errorMessage);
      this.errMessage = errorMessage;
      this.isLoading = false;
    });
  }

}

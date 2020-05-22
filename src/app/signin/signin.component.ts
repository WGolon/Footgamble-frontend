import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user = {
    username: '',
    password: '',
  };
  isLoading = false;
  errMessage = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.user.username = form.value.username;
    this.user.password = form.value.password;
    this.isLoading = true;
    this.authService.loginUser(this.user).subscribe(res => {
      this.isLoading = false;
      this.router.navigate(['user-panel']);
    }, errorMessage => {
      this.isLoading = false;
      this.errMessage = errorMessage;
    });
  }

}

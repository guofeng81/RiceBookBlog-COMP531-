import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public  url = 'https://calm-fjord-55334.herokuapp.com';
  public username = '';
  public password = '';
  public isLoading = false;

  constructor(private router: Router, private _service: UserService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this._service.loginUser(form.value.username, form.value.password);
    form.resetForm();
  }

  socialSignIn() {
    location.href = 'https://calm-fjord-55334.herokuapp.com/auth/facebook';
  }

}




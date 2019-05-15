import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoggedIn$: boolean;
  username: string;

  constructor(private user_service: UserService) {
  }

  ngOnInit() {

    this.user_service.isLoggedIn.subscribe(result => {
      this.isLoggedIn$ = result;
      console.log('is Logged In in Auth: ', this.isLoggedIn$);
    });

    this.username = localStorage.getItem('username');
    console.log('username', this.username);

  }

  onLogout() {
    this.user_service.logout();
  }

}

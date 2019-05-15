import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public isLoading = false;

  constructor(private http: HttpClient, private userService: UserService) {
  }

  ngOnInit() {
  }
  registerUser(form: NgForm) {
    this.userService.onCreateUser(
      form.value.username,
      form.value.displayName,
      form.value.password,
      form.value.email,
      form.value.dob,
      form.value.zip);

      console.log('usrname', form.value.username);
      console.log('displayname', form.value.displayName);

    form.resetForm();
  }
}

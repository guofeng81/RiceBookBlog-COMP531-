import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model: any = {};
  public userAvatar = '';
  public display_name = '';
  public userEmail = '';
  public userZip = '';
  public userDOB = '';
  public imagePreview;

  constructor(private _user_service: UserService, private router: Router) {
  }

  ngOnInit() {
    this.setUserInfo();
  }

  updateProfile(form: NgForm) {

    const json = JSON.stringify((this.model));
    const display_name = JSON.parse(json)['name'];
    const password = JSON.parse(json)['password'];
    const email = JSON.parse(json)['email'];
    const dob = JSON.parse(json)['dob'];
    const zip = JSON.parse(json)['zip'];

    if (display_name !== undefined && display_name !== null) {
      this.updateDisplayName(display_name);
    }

    if (password !== undefined && password !== null) {
      this.updatePassword(form.value.password);
    }

    if (email !== undefined && email !== null) {
      this.updateEmail(form.value.email);
    }
    if (dob !== undefined && dob !== null) {
      this.updateDOB(form.value.dob);
    }
    if (zip !== undefined && zip !== null) {
      this.updateZip(form.value.zip);
    }

    form.resetForm();

  }

  updateDisplayName(name: string) {
    this._user_service.putDisplayName(name).subscribe(response => {
      this.display_name = response.displayName;
      console.log('updated display name:', response.displayName);
    });
  }

  updateEmail(email: string) {
    this._user_service.putEmail(email).subscribe(response => {
      this.userEmail = response.email;
      console.log('updated email', response.email);
    });
  }

  updateZip(zip: string) {
    this._user_service.putZip(zip).subscribe(response => {
      this.userZip = response.zip;
      console.log('updated zip', response.zip);
    });
  }

  updatePassword(password: string) {
    this._user_service.putPassword(password).subscribe(response => {
      // this.userPassword = response.password;
      console.log('updated password', response);
    });
  }

  updateDOB(dob: string) {
    this._user_service.putDOB(dob).subscribe(response => {
      this.userDOB = response.dob;
      console.log('updated dob', response.dob);
    });
  }

  setUserDisplayName() {
    this._user_service.getDisplayName().subscribe(response => {
      this.display_name = response.displayName;
      console.log('Display Name: ', response.displayName);
    });
  }

  setUserEmail() {
    this._user_service.getUserEmail().subscribe(response => {
      this.userEmail = response.email;
      console.log('email', response.email);
    });
  }

  setUserDOB() {
    this._user_service.getUserDOB().subscribe(response => {
      this.userDOB = response.dob;
      console.log('dob', response.dob);
    });
  }

  setUserZip() {
    this._user_service.getUserZip().subscribe(response => {
      this.userZip = response.zip;
      console.log('zip', response.zip);
    });
  }

  getUserAvatar() {
    this._user_service.getUserAvatar().subscribe(response => {
      this.userAvatar = response.avatar;
      console.log('avatar:', response.avatar);
    });
  }

  setUserInfo() {
    this.setUserDisplayName();
    this.setUserDOB();
    this.setUserEmail();
    this.getUserAvatar();
    this.setUserZip();
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const formData = new FormData();
    formData.append('file', file);

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  uploadImage(image: any) {
    const file: File = image.files[0];

    this._user_service.putUserAvatar(file).subscribe(response => {
      this.setUserInfo();
      // this.getUserAvatar();
      console.log('image response: ', response);
    });
  }

  linkAccount(form: NgForm) {

    this._user_service.getUsername().subscribe(response => {

      const facebookUsername = response.username;
      this._user_service.linkAccount(form.value.linkUsername, form.value.linkPassword, facebookUsername)
        .subscribe(result => {
          alert(result.message);
          this.router.navigate(['/']);

        });
    });
  }

  unLinkAccount() {
    this._user_service.unLinkAccount().subscribe(response => {
      alert(response.message);
      this.router.navigate(['/']);
    });
  }

}

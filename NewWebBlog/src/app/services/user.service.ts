import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Profile} from '../models/Profile';
import {User} from '../models/User';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {withIdentifier} from 'codelyzer/util/astQuery';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   private server = 'http://localhost:3000/';
  // private server = 'https://calm-fjord-55334.herokuapp.com/';
  private username = '';

  constructor(private http: HttpClient, private router: Router) {
  }

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  onCreateUser(username: string, display_name: string, password: string, email: string, dob: string, zip: string) {

    console.log("in user service", username);
    console.log("in user service", display_name);
    console.log("in user service", password);
    console.log("in user service", email);
    console.log("in user service", dob);
    console.log("in user service", zip);

    const userProfile: Profile = {
      username: username, displayName: display_name, password: password, email: email, dob: dob, zip: zip
    };

    this.http.post<{ message: string }>(this.server + 'register', userProfile, {withCredentials: true})
      .subscribe(
        response => {
          alert(response.message);
        });
  }

  loginUser(username: string, password: string) {

    const user = {
      username: username, password: password
    };

    this.http.post<{ username: string, message: string }>(this.server + 'login', user, {withCredentials: true}).subscribe(
      response => {
        console.log('login response:', response.username);
        this.username = response.username;
        localStorage.setItem('username', response.username);
        this.loggedIn.next(true);
        this.router.navigate(['/main']);
      });
  }

  linkAccount(username: string, password: string, facebookUser: string) {
    return this.http.put<{ message: string }>(this.server + 'link', {
      'username': username,
      'password': password,
      'facebookUser': facebookUser
    }, {withCredentials: true});
  }

  unLinkAccount() {
    return this.http.put<{ message: string }>(this.server + 'unlink', {}, {withCredentials: true});
  }

  logout() {
    this.http.put<{ message: string }>(this.server + 'logout', {}, {withCredentials: true}).subscribe(
      response => {
        console.log('logout response:', response.message);
        this.loggedIn.next(false);
        this.router.navigate(['']);
        localStorage.clear();
      });
  }

  getUsername() {
    return this.http.get<{ message: string, username: string }>(this.server + 'username', {withCredentials: true});
  }

  putHeadline(newHeadline: string) {
    return this.http.put<{ message: string, headline: string }>(this.server + 'headline', {'headline': newHeadline}, {withCredentials: true});
  }

  getUserEmail() {
    return this.http.get<{ message: string, email: string }>(this.server + 'email', {withCredentials: true});
  }

  getUserZip() {
    return this.http.get<{ message: string, zip: string }>(this.server + 'zipcode', {withCredentials: true});
  }

  getUserDOB() {
    return this.http.get<{ message: string, dob: string }>(this.server + 'dob', {withCredentials: true});
  }

  getUserHeadline() {
    return this.http.get<{ message: string, headline: string }>(this.server + 'headlines', {withCredentials: true});
  }

  getDisplayName() {
    return this.http.get<{ message: string, displayName: string }>(this.server + 'displayname', {withCredentials: true});
  }

  putDisplayName(display_name: string) {
    return this.http.put<{ message: string, displayName: string }>(this.server + 'displayname',
      {'displayName': display_name},
      {withCredentials: true});
  }

  getUserAvatar() {
    return this.http.get<{ message: string, avatar: string }>(this.server + 'avatars', {withCredentials: true});
  }

  putUserAvatar(image: File) {
    const imageName = image.name;
    const postData = new FormData();
    postData.append('image', image, imageName);
    return this.http.put(this.server + 'avatars', postData, {withCredentials: true});
  }

  putEmail(email: string) {
    return this.http.put<{ message: string, email: string }>(this.server + 'email', {'email': email}, {withCredentials: true});
  }

  putZip(zip: string) {
    return this.http.put<{ message: string, zip: string }>(this.server + 'zipcode', {'zip': zip}, {withCredentials: true});
  }

  putPassword(password: string) {
    return this.http.put<{ message: string, password: string }>(this.server + 'password', {'password': password}, {withCredentials: true});
  }

  putDOB(dob: string) {
    return this.http.put<{ message: string, dob: string }>(this.server + 'dob', {'dob': dob}, {withCredentials: true});
  }

}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Follower} from '../models/Follower';
import {Article} from '../models/Article';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  private server = 'https://calm-fjord-55334.herokuapp.com/';
  // private server = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }

  getUserFollowers() {
    return this.http.get<{ message: string, followers: Follower[] }>(this.server + 'following', {withCredentials: true});
  }

  addFollower(name: string) {
    return this.http.put<{ message: string, updatedFollower: Follower }>(this.server + 'following', {name: name}, {withCredentials: true});
  }

  removeFollower(name: string) {
    return this.http.put<{ message: string }>(this.server + 'followings', {name: name}, {withCredentials: true});
  }

}

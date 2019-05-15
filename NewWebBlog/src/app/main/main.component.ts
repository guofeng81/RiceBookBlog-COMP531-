import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ArticleService} from '../services/article.service';
import {FollowerService} from '../services/follower.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public username = '';
  public userHeadline = '';
  public userAvatar = '';
  public followers = [];
  public filterArticles = [];
  public articles = [];

  constructor(private _user_service: UserService, private _follower_service: FollowerService, private _article_service: ArticleService) {
  }

  ngOnInit() {

    this._user_service.getUsername().subscribe(response => {
      this.username = response.username;
    });

    this._user_service.getUserHeadline().subscribe(response => {
      this.userHeadline = response.headline;
      console.log('Headline response: ', response);
    });

    this._follower_service.getUserFollowers().subscribe(transformedFollowers => {
      this.followers = transformedFollowers.followers;
      console.log('Followers: ', transformedFollowers.followers);
    });
    this.setUserAvatar();
  }

  addUserFollower(name: string) {

    this._follower_service.addFollower(name).subscribe(response => {
      this.followers.push(response.updatedFollower);
      this._article_service.getArticles().subscribe(responseArray => {
        console.log('filter articles:', this.filterArticles);
        this.filterArticles = responseArray.articles.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 10);
      });
    });
  }

  removeFollower(name, index) {
    if (this.followers.length >= 0) {
      this._follower_service.removeFollower(name).subscribe(response => {
        this.followers.splice(index, 1);
        this._article_service.getArticles().subscribe(responseArr => {
          console.log('filter articles:', this.filterArticles);
          this.filterArticles = responseArr.articles.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 10);
        });
        console.log(response);
      });
    }
  }

  setUserAvatar() {
    this._user_service.getUserAvatar().subscribe(response => {
      this.userAvatar = response.avatar;
      console.log('avatar', response.avatar);
    });
  }

  updateHeadline(newHeadline) {
    this._user_service.putHeadline(newHeadline).subscribe(response => {
      console.log('update status response', response);
      this.userHeadline = newHeadline;
      newHeadline = '';
    });
  }

  logout() {
    this._user_service.logout();
  }

}


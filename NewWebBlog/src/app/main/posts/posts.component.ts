import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FollowerService} from '../../services/follower.service';
import {ArticleService} from '../../services/article.service';
import {Article} from '../../models/Article';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() childFilterArticles;

  public articles: Article[] = [];
  public imagePreview;
  public author = '';
  public article = '';
  public comments = [];
  public username;

  constructor(private _user_service: UserService, private _follower_service: FollowerService, private _article_service: ArticleService ) { }

  ngOnInit() {

    this._user_service.getUsername().subscribe(
      response => {
        this.author = response.username;
      }
    );

    this.getArticles();
    this._user_service.getUsername().subscribe(response =>{
      this.username = response.username;
    });
  }

  getArticles() {
    this._article_service.getArticles().subscribe(response => {
      this.childFilterArticles = response.articles.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 10);
    });
  }

  getArticleId(index) {
    console.log('id ', this.childFilterArticles[index]._id);
    console.log('comments ', this.childFilterArticles[index].comments);
    return this.childFilterArticles[index]._id;
  }

  postComment(text: string, index) {
    const article_id = this.getArticleId(index);

    this._article_service.addComment(text, article_id).subscribe(response => {
      this.childFilterArticles[index].comments.push(response.comment);
      console.log(response.comment);
      console.log('Article Comments', this.childFilterArticles[index].comments);
    });
  }

  isButtonClickable(index) {
    let isButtonEnable = false;

    if (this.childFilterArticles[index].author === this.username) {
      isButtonEnable = true;
    }

    return isButtonEnable;
  }

  modifyArticle(text: string, index) {
    const article_id = this.getArticleId(index);

    this._article_service.putArticle(text, article_id).subscribe(response => {
      this.childFilterArticles[index].text = response.text;
      this.childFilterArticles[index].date = response.date;
      console.log('Filter Article Text: ', this.childFilterArticles[index].text);
      console.log('Update Text: ', response.text);
    });
  }

  addNewArticle(value, image?: any) {
    const file: File = image.files[0];
    console.log('File:::', file);
    this._article_service.addArticle(value, file).subscribe(response => {
      this.childFilterArticles.unshift(response.article).slice(0, 10);
    });
  }

  search(searchValue) {
    this._article_service.getArticles().subscribe(response => {
      this.childFilterArticles = response.articles
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
        .filter((item) => item.author.includes(searchValue) || item.text.includes(searchValue)).slice(0, 10);
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

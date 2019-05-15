import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Article} from '../models/Article';
import {Comment} from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private server = 'https://calm-fjord-55334.herokuapp.com/';

  constructor(private http: HttpClient) {
  }

  getArticles() {
    return this.http.get<{ message: string; articles: Article[] }>(this.server + 'articles', {withCredentials: true});
  }

  addComment(text: string, article_id: Number) {
    return this.http.put<{ message: string, comment: Comment }>(this.server + 'comment', {
      comment: text,
      id: article_id
    }, {withCredentials: true});
  }


  putArticle(text: string, article_id: Number) {
    return this.http.put<{ message: string, text: string, date: string }>(this.server + 'articles', {
      text: text,
      id: article_id
    }, {withCredentials: true});
  }

  addArticle(text: string, image: File) {

    const postData = new FormData();
    postData.append('text', text);
    image && postData.append('image', image, image.name);

    return this.http.post<{ message: string, article: Article }>(this.server + 'article', postData, {withCredentials: true});
  }

}

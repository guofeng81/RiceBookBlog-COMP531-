import { TestBed, inject } from '@angular/core/testing';

import { ArticleService } from './services/article.service';
import {HttpClientModule} from '@angular/common/http';

describe('ArticleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([ArticleService], (service: ArticleService) => {
    expect(service).toBeTruthy();
  }));

  it('should filter displayed articles by the search keyword CNN', inject([ArticleService], (service: ArticleService) => {
    const articles = service.getSearchValueFilterArticles(service.getArticles(), 'CNN');
    expect(articles.length).toBe(2);
  }));

  it('should filter displayed articles by the search keyword Tim', inject([ArticleService], (service: ArticleService) => {
    const articles = service.getSearchValueFilterArticles(service.getArticles(), 'Tim');
    expect(articles.length).toBe(1);
  }));

  it('should filter displayed articles by the search keyword ABC', inject([ArticleService], (service: ArticleService) => {
    const articles = service.getSearchValueFilterArticles(service.getArticles(), 'ABC');
    expect(articles.length).toBe(1);
  }));

  it('should fetch articles for current logged in user', inject([ArticleService], (service: ArticleService) => {
    const articles = service.getFilterArticles();
    expect(articles.length).toBe(4);
  }));



});

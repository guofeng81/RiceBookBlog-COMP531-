import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import {HttpClientModule} from '@angular/common/http';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsComponent ],
      imports :[HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter displayed articles by the search keyword ABC', () => {
    component.search( 'ABC');
    expect(component.childFilterArticles.length).toBe(1);

  });

  it('should filter displayed articles by the search keyword CNN', () => {
    component.search( 'CNN');
    expect(component.childFilterArticles.length).toBe(2);
  });

  it('should add article when add post called', () => {
    const previousArticlesLength = component.childFilterArticles.length;
    // component.addNewArticle( 'new article');
    expect(component.childFilterArticles.length - previousArticlesLength).toBe(1);
  });

});

import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { MainComponent } from './main.component';
import {PostsComponent} from './posts/posts.component';
import {HttpClientModule} from '@angular/common/http';
import {FollowerService} from '../services/follower.service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent, PostsComponent],
      imports: [HttpClientModule],
      providers : [FollowerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log out', () => {
    component.logout();
    const username = localStorage.getItem('username');
    expect(username).toBe(null);
  });

});

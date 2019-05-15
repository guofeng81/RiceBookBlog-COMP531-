import { TestBed, inject } from '@angular/core/testing';

import { FollowerService } from './services/follower.service';
import {HttpClientModule} from '@angular/common/http';

describe('FollowerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FollowerService],
      imports:[HttpClientModule]
    });
  });

  it('should be created', inject([FollowerService], (service: FollowerService) => {
    expect(service).toBeTruthy();
  }));
});

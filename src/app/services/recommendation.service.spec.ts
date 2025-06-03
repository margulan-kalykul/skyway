import { TestBed } from '@angular/core/testing';

import { RecommendationsService } from './recommendation.service';

describe('RecommendationService', () => {
  let service: RecommendationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommendationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

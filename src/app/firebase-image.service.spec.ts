import { TestBed } from '@angular/core/testing';

import { FirebaseImageService } from './firebase-image.service';

describe('FirebaseImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseImageService = TestBed.get(FirebaseImageService);
    expect(service).toBeTruthy();
  });
});

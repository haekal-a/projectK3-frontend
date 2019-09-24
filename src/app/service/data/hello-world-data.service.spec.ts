import { TestBed } from '@angular/core/testing';

import { HelloWorldDataService } from './hello-world-data.service';

describe('HelloWorldDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelloWorldDataService = TestBed.get(HelloWorldDataService);
    expect(service).toBeTruthy();
  });
});

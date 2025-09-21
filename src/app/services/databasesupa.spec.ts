import { TestBed } from '@angular/core/testing';

import { Databasesupa } from './databasesupa';

describe('Databasesupa', () => {
  let service: Databasesupa;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Databasesupa);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

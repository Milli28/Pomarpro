import { TestBed } from '@angular/core/testing';

import { EstoqueService } from './home.service';

describe('EstoqueService', () => {
  let service: EstoqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstoqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
